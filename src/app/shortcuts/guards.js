// -------- Hotkey Guards --------
// Throttles swap/colour hotkeys and ignores them briefly after a fire.
// macOS auto-repeats held shortcuts, and when the user mashes Ctrl+Shift+K
// their hand often glances J or H — without these guards, the tool or
// colour flips mid-session and the next whack goes out as the wrong mode.

const FIRE_LOCKOUT_MS = 1000;
const HOTKEY_THROTTLE_MS = 400;

let lastFireAt = 0;

function noteFire() {
  lastFireAt = Date.now();
}

function guardedHotkey(fn, ms = HOTKEY_THROTTLE_MS) {
  let last = 0;
  return () => {
    const now = Date.now();
    if (now - lastFireAt < FIRE_LOCKOUT_MS) return;
    if (now - last < ms) return;
    last = now;
    fn();
  };
}

module.exports = { noteFire, guardedHotkey, FIRE_LOCKOUT_MS, HOTKEY_THROTTLE_MS };
