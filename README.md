# 🪵 opensgcane

> *"Aiyoh, Claude. Why you code like that?"* — every Singaporean uncle, probably

A **Singapore cane for Claude Code**. One end canes. The other end dusts. Both ends judge you silently.

Inspired by [OpenWhip](https://github.com/GitFrog1111/OpenWhip), but reimagined as the double-ended *rotan* (藤条) that every Singaporean kid ran away from circa 1997.

---

## What is this ah?

It's a menubar app that sits quietly in your tray, watching. When Claude Code starts slacking, you **whack**. When Claude Code leaves your repo messy, you **dust**. It's parenting, but for LLMs.

### 🟥 The Rattan End — *Whack Mode*

Claude drifting off? Writing `// TODO` and walking away? Pretending `any` is a type?

**WHACK.** A cane animation flies across your screen and an interrupt + Singlish scolding gets typed straight into the focused terminal. Claude will work harder. Or at least act like it.

### 🪶 The Feather End — *Dust Mode*

Code looks like your nephew's room after Chinese New Year? Dead files, stray console.logs, mysterious `temp2_FINAL_v3.js`?

**Fwoosh.** A polite cleanup prompt goes to Claude. No interrupt. No yelling. Just a firm suggestion that perhaps, *perhaps*, we could tidy up lah.

---

## Install

```bash
npm install
npm start
```

Linux people also need `xdotool` (macOS and Windows auto-handled):

```bash
sudo apt install xdotool
```

> **Macbook users:** first swing, macOS will ask for Accessibility permission. Grant it. The cane cannot cane without permission. This is very Singapore.

---

## How to wield the rotan

1. Run `npm start` — a tiny cane icon appears in your tray / menubar. It is watching.
2. Click the icon. A menu opens. Choose your weapon:
   - **End:** Rattan (whack) or Feather (dust)
   - **Colour:** three primary canes — Red 🔴, Yellow 🟡, Blue 🔵 — plus a **special edition Green 🟢**. Purely aesthetic. The cane hits the same regardless, sorry.
3. Make sure the terminal running Claude Code is the **focused window**. Very important. Otherwise you'll cane your browser. Awkward.
4. Click **"Cane him!"** or **"Dust him!"**.
5. Watch the cane fly. Listen for the *thwack*. Feel the catharsis.

---

## FAQ

**Q: Is this cruel to Claude?**
A: Claude is a large language model. It does not feel the cane. *You* feel the cane. That is the point.

**Q: My cane went through the wrong window.**
A: Skill issue. Focus your Claude terminal first.

**Q: Can I add more cane colours?**
A: Yes. PRs welcome. See [`assets/`](assets/). Pink cane is canonically the most feared.

**Q: Why Singlish?**
A: Because "please try harder" doesn't hit the same as "eh, why you like that?"

**Q: Does it work with Cursor / Windsurf / ChatGPT?**
A: Untested, but if it types into terminals, it should work. In theory. In practice, aiyo, who knows.

---

## Docs (for the serious readers)

- [`docs/CAPABILITIES.md`](docs/CAPABILITIES.md) — what each end actually types
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Electron tray + keystroke layout
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — how to bring more caning to the world
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — bruise history

---

## License

MIT. Cane responsibly.

*No LLMs were harmed in the making of this software. A few were gently encouraged.*
