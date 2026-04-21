// -------- Linux Keystroke Sender --------
// Uses xdotool. Install first: `sudo apt install xdotool`

const { execFile } = require('child_process');
const { promisify } = require('util');

const run = promisify(execFile);

// Escape interrupts Claude Code's current generation and is a no-op
// when idle. Ctrl-C triggers the "press again to exit" confirmation
// when idle, which swallows our follow-up keystrokes.
function sendInterrupt() {
  return run('xdotool', ['key', 'Escape']);
}

async function sendText(text) {
  await run('xdotool', ['type', '--', text]);
  await run('xdotool', ['key', 'Return']);
}

module.exports = { sendInterrupt, sendText };
