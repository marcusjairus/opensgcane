// -------- Overlay Renderer --------
// rest  — silently update src + mode for the resting tool.
// swing — play the strike, impact effect, and smack sound.
//         Cane hits show a warm flash; duster hits show a dust poof.

const tool = document.getElementById('tool');
const flash = document.getElementById('flash');
const poof = document.getElementById('dust-poof');

// Swing timings (ms). Impact is when the flash/poof lands + sound plays;
// total is when the overlay fully resets. Dust is slightly slower to
// match its softer whoosh.
const TIMINGS = {
  cane:    { impactMs: 380, totalMs: 840 },
  feather: { impactMs: 480, totalMs: 980 },
};

const IMPACT_CLASS = { cane: 'hit', feather: 'puff' };

function applyState({ src, mode }) {
  tool.src = `${src}?t=${Date.now()}`;
  tool.dataset.mode = mode;
}

function resetEffects() {
  tool.classList.remove('swing');
  flash.classList.remove('hit');
  poof.classList.remove('puff');
}

window.sgcane.onRest(applyState);

window.sgcane.onSwing((payload) => {
  applyState(payload);
  resetEffects();
  void tool.offsetWidth;

  const isDust = payload.mode === 'feather';
  const { impactMs, totalMs } = isDust ? TIMINGS.feather : TIMINGS.cane;
  const impactEffect = isDust ? poof : flash;
  const impactClass  = isDust ? IMPACT_CLASS.feather : IMPACT_CLASS.cane;

  requestAnimationFrame(() => tool.classList.add('swing'));
  setTimeout(() => impactEffect.classList.add(impactClass), impactMs);
  setTimeout(() => window.playSmack(isDust), impactMs);
  setTimeout(resetEffects, totalMs);
});
