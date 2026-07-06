// If you are reading this 
// Ive given up on understanding the code written here
// so just leave it be and pretend it works
// if it doesnt have fun
// please leave a an entery to the diary
//hours spent suffering 26 errors 3


// This is how you write a comment in JavaScript also /* */ also works.
console.log("app.js is connected!");
const input = document.getElementById('passwordInput');

//Parrametrs for score true
// Length is worth up to 4 points — one per tier it reaches (length wins).
const LENGTH1_MIN = 8;    // +1 point (decent length)
const LENGTH2_MIN = 12;   // +1 more point
const LENGTH3_MIN = 16;   // +1 more point
const LENGTH4_MIN = 20;   //+1 more point
const LENGTH5_MIN = 24;   // +1 more point (long passphrases can be Strong on length alone)
const LOWER_MIN  = 1;
const UPPER_MIN  = 1;
const NUMBER_MIN = 1;
const SYMBOL_MIN = 1;

//  it's Weak no matter what else it contains. Add more to this list any time.
const COMMON_PASSWORDS = [
  'password',
  '123456',
  '12345678',
  '123456789',
  'qwerty',
  'letmein',
  'admin',
  'dragon',
  'abc123',
  '111111',
];

// Spot lazy patterns: the same char repeated (aaaa) or a run of consecutive chars (1234, abcd).
function hasLazyPattern(text) {
  const lower = text.toLowerCase();

  // 3+ of the same character in a row: aaa, 1111
  if (/(.)\1{2,}/.test(lower)) return true;

  // 4+ characters that each step up or down by one: 1234, abcd, 4321, dcba
  let runUp = 1;
  let runDown = 1;
  for (let i = 1; i < lower.length; i++) {
    const step = lower.charCodeAt(i) - lower.charCodeAt(i - 1);
    if (step === 1) { runUp++; runDown = 1; }        // next char is one higher
    else if (step === -1) { runDown++; runUp = 1; }  // next char is one lower
    else { runUp = 1; runDown = 1; }                 // streak broken
    if (runUp >= 4 || runDown >= 4) return true;
  }

  return false;
}

// Turn "leet speak" back into plain letters so tricks like P@ssw0rd1 are
// recognised as the common word "password". Add more swaps here any time.
function deLeet(text) {
  return text
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/\$/g, 's')
    .replace(/!/g, 'i');
}

// Update one checklist row: plain-English text + green/grey styling.
// Shows passText when the rule is met, failText when it isn't.
function setCheck(id, ok, passText, failText) {
  const el = document.getElementById(id);
  el.textContent = `${ok ? '✓' : '✗'} ${ok ? passText : failText}`;
  el.className = ok ? 'check pass' : 'check fail';
}

function updateScore() {
  let score = 0;

  // Length: worth up to 5 points; the checklist calls 12+ a "good" length.
  const length = input.value.length;
  setCheck('length', length >= LENGTH2_MIN,
    `Good length (${length} characters)`,
    `Too short (${length}) — aim for 12+`);
  if (length >= LENGTH1_MIN) score++;
  if (length >= LENGTH2_MIN) score++;
  if (length >= LENGTH3_MIN) score++;
  if (length >= LENGTH4_MIN) score++;
  if (length >= LENGTH5_MIN) score++;

  // The rest: shown as a tick/cross depending on whether the point was awarded.
  const LowerCase = (input.value.match(/[a-z]/g) || []).length;
  const lowerOk = LowerCase >= LOWER_MIN;
  if (lowerOk) score++;
  setCheck('LowerCase', lowerOk, 'Has lowercase letters', 'No lowercase letters');

  const UpperCase = (input.value.match(/[A-Z]/g) || []).length;
  const upperOk = UpperCase >= UPPER_MIN;
  if (upperOk) score++;
  setCheck('UpperCase', upperOk, 'Has uppercase letters', 'No uppercase letters');

  const Number = (input.value.match(/[0-9]/g) || []).length;
  const numberOk = Number >= NUMBER_MIN;
  if (numberOk) score++;
  setCheck('Number', numberOk, 'Has numbers', 'No numbers');

  const Symbol = (input.value.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const symbolOk = Symbol >= SYMBOL_MIN;
  if (symbolOk) score++;
  setCheck('Symbol', symbolOk, 'Has symbols', 'No symbols');

  // Common/worst passwords are always weak. Check the raw text AND a de-leeted
  // version, so P@ssw0rd1 is caught as "password" no matter how it's disguised.
  const normalised = deLeet(input.value);
  const isCommon = COMMON_PASSWORDS.some(
    (word) => input.value.toLowerCase() === word || normalised.includes(word)
  );
  if (isCommon) {
    score = 0;
  }
  setCheck('commonCheck', !isCommon,
    'Not a common password',
    'Contains a common word — change it');

  // Lazy patterns (1234, aaaa, …) warn AND dock a point — do this before showing the score.
  const warning = document.getElementById('warning');
  if (input.value !== '' && hasLazyPattern(input.value)) {
    warning.textContent = '⚠️ Avoid simple patterns like 1234, abcd, or aaaa.';
    score = Math.max(0, score - 2);
  } else {
    warning.textContent = '';   // clear it when there's no pattern
  }

  document.getElementById('score').textContent = `Score: ${score} / 9`;

  // Show the 0–9 score as lit battery segments + a label.
  const segments = document.querySelectorAll('.segment');
  const label = document.getElementById('label');

  // Pick the colour and label from the overall strength level.
  let color;
  if (score <= 3) {
    color = '#e74c3c';   // red
    label.textContent = 'Weak';
    label.className = 'badge weak';
  } else if (score <= 5) {
    color = '#f39c12';   // amber
    label.textContent = 'Medium';
    label.className = 'badge medium';
  } else {
    color = '#2ecc71';   // green
    label.textContent = 'Strong';
    label.className = 'badge strong';
  }

  // Light up one cell per point; leave the rest empty.
  segments.forEach((segment, i) => {
    segment.style.backgroundColor = i < score ? color : '';
  });

}
input.addEventListener('input', updateScore);

// "Show password" toggle: switch the input between hidden dots and plain text.
const showPassword = document.getElementById('showPassword');
showPassword.addEventListener('change', () => {
  input.type = showPassword.checked ? 'text' : 'password';
});

// Dark mode toggle — flips a class on <body> and remembers the choice.
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.body.classList.remove('dark', 'purple');
  if (theme === 'dark' || theme === 'purple') {
    document.body.classList.add(theme);
  }
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';   // show the icon for the OTHER mode
}

// On load: use the saved choice if there is one.
applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const next = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Hidden easter-egg button (bottom-right): toggle the purple theme.
const purpleToggle = document.getElementById('purpleToggle');
purpleToggle.addEventListener('click', () => {
  const next = document.body.classList.contains('purple') ? 'light' : 'purple';
  localStorage.setItem('theme', next);
  applyTheme(next);
});