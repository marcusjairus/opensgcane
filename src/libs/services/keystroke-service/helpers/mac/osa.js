// -------- osascript Runner --------
// Wraps `osascript -e … -e …` invocations with timing + stderr logging
// so every AppleScript/JXA call gets a consistent trace line.

const { execFile } = require('child_process');
const { promisify } = require('util');

const run = promisify(execFile);

async function runOsa(lines, label) {
  const args = [];
  for (const line of lines) args.push('-e', line);
  const t0 = Date.now();
  try {
    const { stdout, stderr } = await run('osascript', args);
    const dt = Date.now() - t0;
    if (stderr && stderr.trim()) {
      console.error(`[osa ${label}] ${dt}ms stderr: ${stderr.trim()}`);
    } else {
      console.error(`[osa ${label}] ${dt}ms ok`);
    }
    return stdout;
  } catch (err) {
    const dt = Date.now() - t0;
    const stderr = err.stderr ? err.stderr.toString().trim() : '';
    console.error(`[osa ${label}] ${dt}ms FAILED code=${err.code} stderr=${stderr}`);
    throw err;
  }
}

function runJxa(script) {
  return run('osascript', ['-l', 'JavaScript', '-e', script]);
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

module.exports = { runOsa, runJxa, safeParse };
