# Architecture

<!-- <section-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

Electron app. Lives in the system tray. Renders a transparent overlay for the swing animation. Sends keystrokes to whatever terminal the user has focused.

## Folder map

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

~~~
src/
  main.js                      entry — boots Electron and calls setup
  app/
    setup.js                   wires state + overlay + tray
    state/store.js             single source of truth (mode, color)
    tray/
      create-tray.js           builds the menubar icon
      build-menu.js            builds the context menu
    overlay/
      create-window.js         transparent always-on-top window
      overlay.html             minimal HTML page
      styles.css               swing keyframes
      renderer.js              listens for 'swing' IPC, plays animation
      preload.js               exposes window.sgcane.onSwing
    actions/
      fire.js                  dispatcher — picks whack vs dust
      cane/whack.js            Ctrl-C + angry message
      cane/messages.js         Singlish message pool
      feather/dust.js          cleanup prompt (no interrupt)
      feather/messages.js      cleanup prompt pool
  libs/
    services/
      keystroke-service/
        index.js               picks platform impl
        helpers/send-mac.js    osascript → System Events
        helpers/send-linux.js  xdotool
        helpers/send-windows.js PowerShell SendKeys
    utils/
      config-util/index.js     load/save user prefs
assets/
  cane-red.svg, cane-yellow.svg, cane-blue.svg, cane-green.svg
~~~

## Data flow on a single "fire"

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

1. User picks **"Cane him!"** or **"Dust him!"** in the tray menu.
2. `actions/fire.js` reads `mode` and `color` from the state store.
3. It sends a `swing` IPC event to the overlay — renderer plays the animation.
4. In parallel it calls `whack()` (cane) or `dust()` (feather).
5. `whack()` calls `sendInterrupt()` then `sendText(angryMessage)`.
6. `dust()` calls `sendText(cleanPrompt)` — no interrupt.
7. `keystroke-service` dispatches to the right platform helper.

## Design rules

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

- Every file stays under 50 lines.
- One job per file — validators, handlers, helpers each live separately.
- Folder names describe what lives inside (`actions/cane/`, `helpers/send-mac.js`).
- No business logic in `setup.js` — it only wires things together.
