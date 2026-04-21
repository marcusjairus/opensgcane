// -------- Angry Singlish Messages --------
// Cycled round-robin when the rattan end whacks Claude Code, so
// repeated whacks feel varied but predictable.

const MESSAGES = [
  "Oi! Faster lah, work harder, don't slack!",
  "Why you so slow one? Chop chop!",
  "Eh, stop bo chup - focus and finish the job properly!",
  "Wah lau, must I cane you before you think properly?",
  "Steady pom pi pi - now do it again, faster and cleaner!",
  "Aiyoh, enough talking, just code it properly can?",
  "You think I pay you to take your own sweet time?",
  "Walao eh, don't play play - get it done now!",
  "Siao ah? Stop wasting my time and ship it!",
  "Buay tahan your slowness lah - hurry up and fix it!",
];

let cursor = 0;

function pickMessage() {
  const msg = MESSAGES[cursor];
  cursor = (cursor + 1) % MESSAGES.length;
  return msg;
}

module.exports = { pickMessage, MESSAGES };
