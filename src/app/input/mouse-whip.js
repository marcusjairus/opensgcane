// -------- Mouse Whip Input --------
// Polls the global cursor position and fires a whack when the user
// flicks the mouse hard enough — inspired by ai-whipper-string's
// velocity-based crack detection. Uses Electron's screen API so the
// overlay stays click-through and Claude Code keeps keyboard focus.
//
// The crack trigger is intentionally coarse: we care about a single
// decisive flick, not smooth tracking. One flick → one whack, with a
// cooldown so a long sweep doesn't fire repeatedly.

const { screen } = require('electron');
const { fire } = require('../actions/fire');

// Pixels/second at which a cursor motion counts as a "crack". Tuned by
// feel: normal pointing / drag is well under 3000 px/s; a deliberate
// wrist-flick easily clears 6000 px/s.
const CRACK_SPEED = 5000;

// After a crack fires, ignore further cracks for this long. Prevents a
// single flourish from triggering several whacks back to back.
const COOLDOWN_MS = 450;

// Cursor sample interval. 16ms ≈ 60Hz — enough to catch a flick.
const SAMPLE_MS = 16;

let timer = null;
let last = null;
let lastCrackAt = 0;

function start() {
  if (timer) return;
  last = sample();
  timer = setInterval(tick, SAMPLE_MS);
  if (timer.unref) timer.unref();
}

function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}

function tick() {
  const now = sample();
  if (!last) { last = now; return; }
  const dt = (now.t - last.t) / 1000;
  if (dt > 0) {
    const dx = now.x - last.x;
    const dy = now.y - last.y;
    const speed = Math.hypot(dx, dy) / dt;
    if (speed >= CRACK_SPEED && now.t - lastCrackAt >= COOLDOWN_MS) {
      lastCrackAt = now.t;
      console.error(`[opensgcane] crack detected speed=${Math.round(speed)} px/s`);
      fire();
    }
  }
  last = now;
}

function sample() {
  const p = screen.getCursorScreenPoint();
  return { x: p.x, y: p.y, t: Date.now() };
}

module.exports = { start, stop };
