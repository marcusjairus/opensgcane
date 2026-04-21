// -------- Smack Sound --------
// Cane = hard slap (band-passed noise + low thump). Dust = soft whoosh.

(function () {
  let ctx;
  window.playSmack = (isDust) => {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (isDust) return chain(makeNoise(0.22), { lp: 1200, vol: 0.14, dur: 0.22 });
    chain(makeNoise(0.09), { hp: 700, lp: 3500, vol: 0.95, dur: 0.09 });
    thump();
  };

  function thump() {
    const t = ctx.currentTime, osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    g.gain.setValueAtTime(0.45, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    osc.connect(g).connect(ctx.destination);
    osc.start(); osc.stop(t + 0.12);
  }

  function makeNoise(dur) {
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-8 * i / n);
    return buf;
  }

  function chain(buf, { hp, lp, vol, dur }) {
    const src = ctx.createBufferSource(); src.buffer = buf;
    let node = src;
    [['highpass', hp], ['lowpass', lp]].forEach(([type, freq]) => {
      if (!freq) return;
      const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
      node.connect(f); node = f;
    });
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
    node.connect(g).connect(ctx.destination);
    src.start();
  }
})();
