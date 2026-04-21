// -------- macOS Keystroke Constants --------
// Centralised magic numbers for the macOS sender so the orchestration
// code reads as intent, not as raw bit twiddling.

// AppleScript key codes (System Events).
const KEY_CODE_ESCAPE = 53;
const KEY_CODE_RETURN = 36;

// NSEvent.modifierFlags bits. We only care about Control/Option/Command;
// Shift is excluded because the Win/Linux fallback hotkey includes it.
const MOD_SHIFT   = 0x020000;
const MOD_CONTROL = 0x040000;
const MOD_OPTION  = 0x080000;
const MOD_COMMAND = 0x100000;
const MOD_MASK_BLOCKING = MOD_CONTROL | MOD_OPTION | MOD_COMMAND; // 0x1C0000

// Paste pacing. AppleScript delays are in seconds.
const PASTE_KEYSTROKE_GAP_SEC = 0.08;  // Cmd+V → Return
const INTERRUPT_TO_PASTE_GAP_SEC = 0.08;  // Esc → Cmd+V

// Clipboard restore must wait for Cmd+V to consume the clipboard first;
// overwriting too fast races the paste and loses the keystroke.
const CLIPBOARD_RESTORE_DELAY_MS = 250;

// Modifier-release polling. Poll rate in JXA is in seconds.
const MOD_WAIT_CAP_MS = 1500;
const MOD_POLL_INTERVAL_SEC = 0.015;

// Allowed front apps — terminals and editors that host Claude Code.
const ALLOWED_FRONT_APPS = new Set([
  'Terminal',
  'iTerm2',
  'iTerm',
  'Warp',
  'WarpPreview',
  'Ghostty',
  'Alacritty',
  'kitty',
  'Hyper',
  'Tabby',
  'Code',
  'Code - Insiders',
  'Cursor',
  'Windsurf',
  'Zed',
  'Electron',
]);

module.exports = {
  KEY_CODE_ESCAPE,
  KEY_CODE_RETURN,
  MOD_SHIFT,
  MOD_CONTROL,
  MOD_OPTION,
  MOD_COMMAND,
  MOD_MASK_BLOCKING,
  PASTE_KEYSTROKE_GAP_SEC,
  INTERRUPT_TO_PASTE_GAP_SEC,
  CLIPBOARD_RESTORE_DELAY_MS,
  MOD_WAIT_CAP_MS,
  MOD_POLL_INTERVAL_SEC,
  ALLOWED_FRONT_APPS,
};
