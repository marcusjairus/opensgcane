# Contributing

<!-- <section-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

## Code style

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

- **One job per file.** If a file does two things, split it.
- **Under 50 lines per file.** Hard limit. Extract helpers into a `helpers/` folder.
- **Flat code, not nested.** No more than two levels of indentation inside a function body.
- **kebab-case** for all folders and files (`create-tray.js`, `actions/cane/`).
- **camelCase** for variables and functions.
- **Section-header comments** with the format `// -------- Title --------` at the top of each file.

## Adding a new action end

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

Say you want a third end called **broom**:

1. Make `src/app/actions/broom/` with `broom.js` and `messages.js`.
2. Wire it up in `src/app/actions/fire.js` under a new `mode === 'broom'` branch.
3. Add a new mode item in `src/app/tray/build-menu.js`.
4. Drop a `broom-<color>.svg` into `assets/` for each colour, or share the cane SVG.

## Adding a new cane colour

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

1. Copy one of `assets/cane-*.svg` and change the gradient stop colours.
2. Add the name (lowercase) to the `COLORS` array in `src/app/tray/build-menu.js`.

## Adding a new platform

<!-- <subsection-updated last-updated="2026-04-20T00:00:00Z" updated-by="Claude Opus 4.7" /> -->

Add a helper under `src/libs/services/keystroke-service/helpers/send-<platform>.js` that exports `sendInterrupt` and `sendText`, then register it in the `impls` map inside `src/libs/services/keystroke-service/index.js`.
