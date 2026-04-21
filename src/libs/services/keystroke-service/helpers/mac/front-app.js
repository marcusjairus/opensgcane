// -------- Front App Guard --------
// Blocks keystroke delivery unless the frontmost app is a terminal or
// editor we expect Claude Code to be running inside. Prevents rogue
// whacks from landing in Slack, Mail, etc.

const { execFile } = require('child_process');
const { promisify } = require('util');
const { ALLOWED_FRONT_APPS } = require('./constants');

const run = promisify(execFile);

class WrongFrontAppError extends Error {
  constructor(name) {
    super(`front app not allowed: ${name}`);
    this.frontApp = name;
  }
}

async function guardFrontApp() {
  const name = await frontAppName();
  console.error(`[opensgcane] front app: ${name}`);
  if (!ALLOWED_FRONT_APPS.has(name)) {
    throw new WrongFrontAppError(name);
  }
}

async function frontAppName() {
  try {
    const { stdout } = await run('osascript', [
      '-e',
      'tell application "System Events" to name of first application process whose frontmost is true',
    ]);
    return stdout.trim();
  } catch {
    return '';
  }
}

module.exports = { guardFrontApp, frontAppName, WrongFrontAppError };
