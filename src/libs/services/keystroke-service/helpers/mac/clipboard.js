// -------- Clipboard Preserve/Restore --------
// Paste-based send stomps the clipboard. We snapshot the previous text,
// write our payload, paste, then restore — with a small delay so Cmd+V
// has actually consumed the clipboard before we overwrite it again.

const { clipboard } = require('electron');
const { CLIPBOARD_RESTORE_DELAY_MS } = require('./constants');

function snapshotClipboard() {
  return clipboard.readText();
}

function writeClipboard(text) {
  clipboard.writeText(text);
}

async function restoreClipboard(previous) {
  await new Promise((r) => setTimeout(r, CLIPBOARD_RESTORE_DELAY_MS));
  try {
    if (previous !== null && previous !== undefined) {
      clipboard.writeText(previous);
    }
  } catch (err) {
    console.error('[opensgcane] clipboard restore failed:', err && err.message);
  }
}

module.exports = { snapshotClipboard, writeClipboard, restoreClipboard };
