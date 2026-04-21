// -------- Modifier Release Gate --------
// globalShortcut fires on keydown while the user still has Ctrl+Option
// physically held. Sending Cmd+V/Return in that window produces garbled
// paste + newline instead of submit. We poll NSEvent.modifierFlags via
// JXA and block until Control, Option, and Command are all released.

const { runJxa, safeParse } = require('./osa');
const {
  MOD_MASK_BLOCKING,
  MOD_WAIT_CAP_MS,
  MOD_POLL_INTERVAL_SEC,
} = require('./constants');

class ModifiersStillHeldError extends Error {
  constructor(mask) {
    super(`modifiers still held (mask=0x${mask.toString(16)})`);
    this.modifierMask = mask;
  }
}

async function requireModifierRelease() {
  const info = await waitForModifierRelease();
  if (info && info.heldMask) {
    throw new ModifiersStillHeldError(info.heldMask);
  }
}

async function waitForModifierRelease(capMs = MOD_WAIT_CAP_MS) {
  const script = `
    ObjC.import('AppKit');
    const MASK = ${MOD_MASK_BLOCKING};
    const capMs = ${capMs};
    const start = Date.now();
    while ((Date.now() - start) < capMs) {
      const flags = $.NSEvent.modifierFlags;
      if ((flags & MASK) === 0) break;
      delay(${MOD_POLL_INTERVAL_SEC});
    }
    const flags = $.NSEvent.modifierFlags;
    JSON.stringify({ elapsed: Date.now() - start, heldMask: flags & MASK });
  `;
  try {
    const { stdout } = await runJxa(script);
    const info = safeParse(stdout);
    if (info && info.heldMask) {
      console.error(
        `[opensgcane] modifiers still held after ${info.elapsed}ms (mask=0x${info.heldMask.toString(16)}) — aborting shot`
      );
    }
    return info;
  } catch (err) {
    console.error('[opensgcane] modifier wait failed:', err && err.message);
    return null;
  }
}

module.exports = { requireModifierRelease, ModifiersStillHeldError };
