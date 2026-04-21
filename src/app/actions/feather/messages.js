// -------- Cleaning Prompts --------
// Cycled round-robin when the feather end dusts Claude's code.

const PROMPTS = [
  "Clean this code - remove dead code, simplify logic, keep behaviour identical.",
  "Tidy up: delete unused imports, dedupe helpers, shorten bloated functions.",
  "Dust this off - fix formatting, rename unclear variables, no new features.",
  "Sweep the repo: remove stale comments, tighten nesting, group related code.",
  "Refactor for clarity only. If a file is over 50 lines, split it sensibly.",
  "Polish: consistent naming, remove magic numbers, extract clear constants.",
  "Prune: drop unreachable branches, collapse redundant conditionals.",
  "Flatten deep nesting with early returns - keep behaviour identical.",
  "Normalise error handling - no empty catches, no silent failures.",
  "Final pass: remove debug logs, stray TODOs, and commented-out code.",
];

let cursor = 0;

function pickPrompt() {
  const p = PROMPTS[cursor];
  cursor = (cursor + 1) % PROMPTS.length;
  return p;
}

module.exports = { pickPrompt, PROMPTS };
