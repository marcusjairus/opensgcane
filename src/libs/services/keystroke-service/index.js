// -------- Keystroke Service --------
// Platform dispatcher. Each helper exports sendInterrupt + sendText,
// and optionally sendInterruptAndText (a fused, single-process variant
// used to cut per-whack latency on macOS).

const mac = require('./helpers/send-mac');
const linux = require('./helpers/send-linux');
const win = require('./helpers/send-windows');

const impls = { darwin: mac, win32: win, linux };
const impl = impls[process.platform] ?? linux;

// Gap between the Escape and the typed text on platforms without a
// fused path — gives the target terminal time to leave its current
// input state before we start typing the next line.
const INTERRUPT_TO_TEXT_GAP_MS = 100;

async function fallbackInterruptAndText(text) {
  await impl.sendInterrupt();
  await new Promise((r) => setTimeout(r, INTERRUPT_TO_TEXT_GAP_MS));
  await impl.sendText(text);
}

module.exports = {
  sendInterrupt: () => impl.sendInterrupt(),
  sendText: (text) => impl.sendText(text),
  sendInterruptAndText: (text) =>
    impl.sendInterruptAndText
      ? impl.sendInterruptAndText(text)
      : fallbackInterruptAndText(text),
};
