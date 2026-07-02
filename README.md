# Password-meter 🔐

A browser-based **password strength meter** built with plain HTML, CSS, and
JavaScript — no frameworks, no build tools, no dependencies. You type a password
and it tells you how strong it is (and why), live as you type.

Everything runs entirely in your browser: the password never leaves your machine.

## Features

- **Live feedback** as you type — length, and a ✓/✗ for lowercase, uppercase,
  numbers, and symbols
- **Point-based score** (out of 6) where **length is weighted most**
- **Common-password check** — instantly weak if it matches a known bad password
- **Lazy-pattern warning** — flags things like `1234`, `abcd`, or `aaaa`
- **Battery-style strength meter** that fills up and shifts red → amber → green

## How to run

No installing anything. Just **double-click `index.html`** and it opens in your
web browser. Edit any file, save, and refresh to see the change.

## Project structure

| File | Job |
|------|-----|
| `index.html` | The structure — input box, meter, and result lines |
| `style.css` | The look — layout, colours, the battery meter |
| `app.js` | The behaviour — scoring logic and live updates |

---

## Project review

This project follows a step-by-step brief. Here's an honest assessment of how far
it's got and what could still be improved.

### Scope coverage

| Step | Status | Notes |
|------|--------|-------|
| 1. Set up & wiring | ✅ Done | Files linked, console confirms `app.js` connected |
| 2. Live length readout | ✅ Done | Updates on every keystroke |
| 3. Simple scoring + bar + label | ✅ Done | Length/lower/upper/number/symbol → Weak/Medium/Strong |
| 4. Explain it (checklist) | ⚠️ Partial | ✓/✗ per category, but not yet in plain English |
| 5. Make it smart | ⚠️ Partial | Length weighting, common-password list, and pattern warning all present |
| 6. Make it yours (visuals) | ✅ Done | Battery-style segmented meter |

### The honest test

Tracing the brief's own test passwords through the current logic:

| Password | Should be | Currently gives | ✓/✗ |
|----------|-----------|-----------------|-----|
| `123456` | Very weak | Weak (0/6) | ✅ |
| `x7$Kp2!mQ9vL` | Strong | Strong (6/6) | ✅ |
| `P@ssw0rd1` | Weak (looks complex, isn't) | Strong (5/6) | ❌ |
| `aaaaaaaaaaaa` | Weak (repetition ≠ strength) | Medium (3/6) + warning | ❌ |
| `correct horse battery staple` | Strong (length wins) | Medium (3/6) | ❌ |

### Suggested improvements

1. **Catch `P@ssw0rd1`.** The common-password check is exact-match only, so a
   "leet-speak" version of a common word slips through. Detect common words
   *inside* the password after undoing substitutions (`@→a`, `0→o`, `1→i`, `$→s`).
2. **Let long passphrases win.** Length caps at 2 of 6 points, and the upper
   limits on each character type actually strip points from very long passwords.
   Remove the caps and weight length more heavily.
3. **Penalise patterns, don't just warn.** Repetition like `aaaa…` shows a warning
   but still scores Medium — feed the pattern check into the score.
4. **Plain-English checklist.** Reword `LowerCase: ✓` to friendlier lines like
   `✓ Has lowercase letters`, and add lines for common words / patterns.

### What works well

- Clean separation of structure (HTML), style (CSS), and behaviour (JS)
- Tunable scoring constants grouped at the top of `app.js`
- Smooth, custom battery visual
- Runs fully client-side — privacy by design
