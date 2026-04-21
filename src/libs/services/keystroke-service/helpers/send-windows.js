// -------- Windows Keystroke Sender --------
// Uses PowerShell's SendKeys — no extra install needed.

const { execFile } = require('child_process');
const { promisify } = require('util');

const run = promisify(execFile);

// Escape interrupts Claude Code's current generation and is a no-op
// when idle. Ctrl-C triggers the "press again to exit" confirmation
// when idle, which swallows our follow-up keystrokes.
function sendInterrupt() {
  return ps("[System.Windows.Forms.SendKeys]::SendWait('{ESC}')");
}

async function sendText(text) {
  // SendKeys reserves + ^ % ~ ( ) { } — wrap each in braces to escape.
  const escaped = text
    .replace(/'/g, "''")
    .replace(/[+^%~(){}]/g, '{$&}');
  await ps(`[System.Windows.Forms.SendKeys]::SendWait('${escaped}{ENTER}')`);
}

function ps(command) {
  return run('powershell', [
    '-NoProfile', '-Command',
    `Add-Type -AssemblyName System.Windows.Forms; ${command}`,
  ]);
}

module.exports = { sendInterrupt, sendText };
