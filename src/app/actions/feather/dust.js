// -------- Dust --------
// Types a cleaning prompt into the focused terminal. No interrupt:
// if Claude is mid-task, the prompt queues for the next turn.

const { sendText } = require('../../../libs/services/keystroke-service');
const { pickPrompt } = require('./messages');

async function dust() {
  await sendText(pickPrompt());
}

module.exports = { dust };
