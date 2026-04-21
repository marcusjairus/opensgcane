// -------- Fire Dispatcher --------
// Plays the swing animation and runs the action for the current mode.

const { getState } = require('../state/store');
const { sendSwing } = require('../../libs/utils/overlay-util');
const { whack } = require('./cane/whack');
const { dust } = require('./feather/dust');

// macOS auto-repeats the global hotkey while held, and each whack takes
// ~150-250ms (one osascript spawn). Rather than dropping presses during
// that window — which made the app feel laggy / unresponsive — we keep
// a 1-deep queue: the current whack runs to completion, then one more
// fires if any presses arrived while it was busy. Depth is capped at 1
// so holding the key doesn't build up an infinite backlog.
let firing = false;
let queued = false;

async function fire() {
  if (firing) {
    queued = true;
    return;
  }
  firing = true;
  try {
    do {
      queued = false;
      await runOnce();
    } while (queued);
  } finally {
    firing = false;
  }
}

async function runOnce() {
  const t0 = Date.now();
  try {
    const { mode, color } = getState();
    console.error(`[opensgcane] fire start mode=${mode} color=${color}`);
    sendSwing(mode, color);
    if (mode === 'cane') await whack();
    else await dust();
    console.error(`[opensgcane] fire ok (${Date.now() - t0}ms)`);
  } catch (err) {
    if (err && err.frontApp) {
      console.error(`[opensgcane] fire skipped — front app "${err.frontApp}" is not a terminal/editor`);
      return;
    }
    if (err && err.modifierMask !== undefined) {
      console.error(`[opensgcane] fire skipped — release the hotkey before next shot (mask=0x${err.modifierMask.toString(16)})`);
      return;
    }
    console.error('[opensgcane] fire FAILED:', err && err.message ? err.message : err);
    if (err && err.stderr) console.error('[opensgcane] stderr:', err.stderr.toString());
  }
}

module.exports = { fire };
