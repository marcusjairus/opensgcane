# Capabilities

<!-- <section-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

What each end of the cane actually does, and what you can tweak.

## Rattan end — "Cane him!"

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

1. Sends **Escape** to the focused window (interrupts Claude's current generation; a no-op if Claude is already idle).
2. Waits ~150 ms so the terminal reaches a fresh prompt.
3. Types one of several Singlish motivational lines, followed by Enter.

Sample lines (see `src/app/actions/cane/messages.js` to edit):

- *"Oi! Faster lah, work harder, don't slack!"*
- *"Why you so slow one? Chop chop!"*
- *"Wah lau, must I cane you before you think properly?"*

## Feather end — "Dust him!"

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

1. **No interrupt.** If Claude is mid-turn, the prompt queues for the next one.
2. Types one of several cleanup prompts, followed by Enter.

Sample lines (see `src/app/actions/feather/messages.js` to edit):

- *"Clean this code — remove dead code, simplify logic, keep behaviour identical."*
- *"Tidy up: delete unused imports, dedupe helpers, shorten bloated functions."*
- *"Refactor for clarity only. If a file is over 50 lines, split it sensibly."*

## Cane colours

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

Three primary colours — **red**, **yellow**, **blue** — plus a **special edition green**. Pick from the tray menu under **Cane colour**, or cycle with `Ctrl+Alt+H` (macOS) / `Ctrl+Alt+Shift+H` (Windows/Linux) (red → yellow → blue → green → red). The selection is saved between runs and swaps the SVG used in the swing animation.

Add more colours by dropping `cane-<name>.svg` into `assets/` and adding the name to the `COLORS` array in `src/app/tray/build-menu.js`.

## Persistence

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

Mode and colour are saved in `config.json` inside Electron's `userData` folder:

- macOS: `~/Library/Application Support/opensgcane/config.json`
- Linux: `~/.config/opensgcane/config.json`
- Windows: `%APPDATA%/opensgcane/config.json`

## Platform notes

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

| Platform | How keystrokes are sent | Extra setup |
|----------|------------------------|-------------|
| macOS    | `osascript` → System Events | Grant Accessibility permission on first run |
| Linux    | `xdotool` | `sudo apt install xdotool` |
| Windows  | PowerShell `SendKeys` | None |
