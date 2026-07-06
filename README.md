# Password-meter 🔐

A browser-based **password strength meter** built with plain HTML, CSS, and
JavaScript — no frameworks, no build tools, no dependencies. You type a password
and it tells you how strong it is (and *why*), live as you type.

Everything runs entirely in your browser: the password never leaves your machine.

## Features

- **Live feedback** as you type, with a **plain-English checklist** that explains
  what's good and what's missing (e.g. `✓ Good length (14 characters)`,
  `✗ No numbers`, `✗ Contains a common word — change it`)
- **Point-based score out of 9**, where **length is weighted most** (up to 5 points
  across tiers at 8/12/16/20/24 characters — long passphrases win)
- **Leet-aware common-password check** — catches disguised words like `P@ssw0rd1`
  by converting `@→a`, `0→o`, `1→i`, etc. before checking
- **Lazy-pattern penalty** — sequences (`1234`, `abcd`) and repeats (`aaaa`) warn
  *and* dock points
- **Battery-style strength meter** + Weak / Medium / Strong badge
- **Show-password toggle** and **light / dark themes** (remembered across visits)
- A little something extra hidden in the bottom-right corner 👀

## How to run

No installing anything. Just **double-click `index.html`** and it opens in your
web browser. Edit any file, save, and refresh to see the change.

## Project structure

| File | Job |
|------|-----|
| `index.html` | The structure — input box, meter, and checklist |
| `style.css` | The look — layout, colours, battery, themes |
| `app.js` | The behaviour — scoring logic and live updates |

---

## Project review

This project follows a step-by-step brief. Here's how it measures up.

### Scope coverage

| Step | Status | Notes |
|------|--------|-------|
| 1. Set up & wiring | ✅ Done | Files linked, console confirms connection |
| 2. Live length readout | ✅ Done | Updates on every keystroke |
| 3. Simple scoring + bar + label | ✅ Done | Battery + Weak/Medium/Strong |
| 4. Explain it (checklist) | ✅ Done | Plain-English rows incl. a common-password line |
| 5. Make it smart | ✅ Done | Weighted length, leet-aware common check, pattern penalty |
| 6. Make it yours (visuals) | ✅ Done | Battery, card, light/dark + hidden purple theme |

### The honest test

The brief's own test passwords, through the current logic — **5 of 5**:

| Password | Should be | Result |
|----------|-----------|--------|
| `123456` | Very weak | Weak (0/9) ✅ |
| `P@ssw0rd1` | Weak (looks complex, isn't) | Weak (0/9) ✅ |
| `aaaaaaaaaaaa` | Weak (repetition ≠ strength) | Weak (1/9) ✅ |
| `correct horse battery staple` | Strong (length wins) | Strong (6/9) ✅ |
| `x7$Kp2!mQ9vL` | Strong | Strong (6/9) ✅ |

### Possible next steps (optional)

- A rough "time to crack" estimate
- A random passphrase generator with a copy button
- A larger common-password list loaded from a file
- Screen-reader / accessibility polish

### What works well

- Clean separation of structure (HTML), style (CSS), and behaviour (JS)
- Tunable scoring constants and small helper functions (`deLeet`, `hasLazyPattern`,
  `setCheck`)
- Smart scoring that sees through `P@ssw0rd1` and rewards long passphrases
- Runs fully client-side — privacy by design
