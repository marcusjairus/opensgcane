// -------- Global Shortcuts --------
// System-wide hotkeys that work from any focused app. Modifier stack is
// chosen to be effectively unbound across OS, editors, and terminals.
//   macOS:          Ctrl+Alt+<letter>       (Alt == Option)
//   Windows/Linux:  Ctrl+Alt+Shift+<letter>
//   Fire:          +K
//   Swap tool:     +J   (cane ↔ feather)
//   Cycle colour:  +H   (red → yellow → blue → green → red)

const { app, globalShortcut } = require('electron');
const { fire } = require('../actions/fire');
const { getState, setState } = require('../state/store');
const { saveConfig } = require('../../libs/utils/config-util');

const MOD = process.platform === 'darwin' ? 'Ctrl+Alt' : 'Ctrl+Alt+Shift';
const FIRE_KEY  = `${MOD}+K`;
const SWAP_KEY  = `${MOD}+J`;
const COLOR_KEY = `${MOD}+H`;
const COLOR_ORDER = ['red', 'yellow', 'blue', 'green'];

// How long swap/colour hotkeys are ignored after a fire. When the user
// mashes Ctrl+Shift+K, their hand often glances J or H — without this
// guard, the tool or colour flips mid-session and the next whack goes
// out as the wrong mode.
const FIRE_LOCKOUT_MS = 1000;

// Per-hotkey throttle for swap/colour. macOS auto-repeats held
// shortcuts; without this, one long press flips mode several times.
const HOTKEY_THROTTLE_MS = 400;

let lastFireAt = 0;

function apply(patch) {
  setState(patch);
  saveConfig(patch);
}

function swapTool() {
  apply({ mode: getState().mode === 'cane' ? 'feather' : 'cane' });
}

function cycleColor() {
  const i = COLOR_ORDER.indexOf(getState().color);
  apply({ color: COLOR_ORDER[(i + 1) % COLOR_ORDER.length] });
}

// Called by the fire dispatcher so we can lock out swap/colour briefly.
function noteFire() {
  lastFireAt = Date.now();
}

// Throttles a hotkey AND drops it if fire was recently pressed — macOS
// auto-repeats held shortcuts, and fat-fingered neighbouring keys were
// silently swapping mode/colour mid-mash.
function guardedHotkey(fn, ms) {
  let last = 0;
  return () => {
    const now = Date.now();
    if (now - lastFireAt < FIRE_LOCKOUT_MS) return;
    if (now - last < ms) return;
    last = now;
    fn();
  };
}

function registerShortcuts() {
  tryRegister(FIRE_KEY, () => { noteFire(); fire(); });
  tryRegister(SWAP_KEY, guardedHotkey(swapTool, HOTKEY_THROTTLE_MS));
  tryRegister(COLOR_KEY, guardedHotkey(cycleColor, HOTKEY_THROTTLE_MS));
  app.on('will-quit', () => globalShortcut.unregisterAll());
}

function tryRegister(accel, handler) {
  if (!globalShortcut.register(accel, handler)) {
    console.warn(`[opensgcane] could not register ${accel} — already in use?`);
  }
}

module.exports = {
  registerShortcuts, swapTool, cycleColor,
  FIRE_KEY, SWAP_KEY, COLOR_KEY, COLOR_ORDER,
};
