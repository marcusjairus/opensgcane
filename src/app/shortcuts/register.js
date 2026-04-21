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
const { noteFire, guardedHotkey } = require('./guards');

const MOD = process.platform === 'darwin' ? 'Ctrl+Alt' : 'Ctrl+Alt+Shift';
const FIRE_KEY  = `${MOD}+K`;
const SWAP_KEY  = `${MOD}+J`;
const COLOR_KEY = `${MOD}+H`;
const COLOR_ORDER = ['red', 'yellow', 'blue', 'green'];

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

function registerShortcuts() {
  tryRegister(FIRE_KEY, () => { noteFire(); fire(); });
  tryRegister(SWAP_KEY, guardedHotkey(swapTool));
  tryRegister(COLOR_KEY, guardedHotkey(cycleColor));
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
