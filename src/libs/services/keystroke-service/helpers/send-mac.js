// -------- macOS Keystroke Sender --------
// Delivers via clipboard + Cmd+V (atomic, layout-independent) rather
// than AppleScript `keystroke`, which drops characters mid-string in
// Electron-based terminals. See ./mac/modifier-wait for why we block on
// modifier release before every send.

const { runOsa } = require('./mac/osa');
const { guardFrontApp, WrongFrontAppError } = require('./mac/front-app');
const { requireModifierRelease } = require('./mac/modifier-wait');
const {
  snapshotClipboard, writeClipboard, restoreClipboard,
} = require('./mac/clipboard');
const {
  KEY_CODE_ESCAPE,
  KEY_CODE_RETURN,
  PASTE_KEYSTROKE_GAP_SEC,
  INTERRUPT_TO_PASTE_GAP_SEC,
} = require('./mac/constants');

async function sendInterrupt() {
  await requireModifierRelease();
  await runOsa(
    [`tell application "System Events" to key code ${KEY_CODE_ESCAPE}`],
    'interrupt'
  );
}

async function sendText(text) {
  await guardFrontApp();
  await requireModifierRelease();
  await withClipboardPayload(text, () =>
    runOsa(
      ['tell application "System Events"', ...pasteLines(), 'end tell'],
      'text'
    )
  );
}

async function sendInterruptAndText(text) {
  await guardFrontApp();
  await requireModifierRelease();
  await withClipboardPayload(text, () =>
    runOsa(
      [
        'tell application "System Events"',
        `  key code ${KEY_CODE_ESCAPE}`,
        `  delay ${INTERRUPT_TO_PASTE_GAP_SEC}`,
        ...pasteLines(),
        'end tell',
      ],
      'whack'
    )
  );
}

function pasteLines() {
  return [
    '  keystroke "v" using {command down}',
    `  delay ${PASTE_KEYSTROKE_GAP_SEC}`,
    `  key code ${KEY_CODE_RETURN}`,
  ];
}

async function withClipboardPayload(text, action) {
  const previous = snapshotClipboard();
  writeClipboard(text);
  try {
    await action();
  } finally {
    await restoreClipboard(previous);
  }
}

module.exports = { sendInterrupt, sendText, sendInterruptAndText, WrongFrontAppError };
