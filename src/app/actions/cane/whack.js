// -------- Whack --------
// Interrupts Claude (Escape), then types an angry Singlish message.
// Fused into a single keystroke call so held hotkeys feel instant.

const { sendInterruptAndText } = require('../../../libs/services/keystroke-service');
const { pickMessage } = require('./messages');

async function whack() {
  await sendInterruptAndText(pickMessage());
}

module.exports = { whack };
