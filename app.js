// This is how you write a comment in JavaScript also /* */ also works.
console.log("app.js is connected!");
const input = document.getElementById('passwordInput');

//Parrametrs for score true
// Length is worth up to 2 points — one per range it falls in.
const LENGTH1_MIN = 8,  LENGTH1_MAX = 64;   // +1 point (decent length)
const LENGTH2_MIN = 12, LENGTH2_MAX = 64;   // +1 more point (long — length wins)
const LOWER_MIN  = 1,  LOWER_MAX  = 20;
const UPPER_MIN  = 1,  UPPER_MAX  = 20;
const NUMBER_MIN = 1,  NUMBER_MAX = 20;
const SYMBOL_MIN = 1,  SYMBOL_MAX = 20;

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

function updateScore() {
  let score = 0;

  // Length: shown as a number, worth up to 2 points.
  const length = input.value.length;
  document.getElementById('length').textContent = `Length: ${length}`;
  if (length >= LENGTH1_MIN && length <= LENGTH1_MAX) score++;
  if (length >= LENGTH2_MIN && length <= LENGTH2_MAX) score++;

  // The rest: shown as a tick/cross depending on whether the point was awarded.
  const LowerCase = (input.value.match(/[a-z]/g) || []).length;
  const lowerOk = LowerCase >= LOWER_MIN && LowerCase <= LOWER_MAX;
  if (lowerOk) score++;
  document.getElementById('LowerCase').textContent = `LowerCase: ${lowerOk ? '✓' : '✗'}`;

  const UpperCase = (input.value.match(/[A-Z]/g) || []).length;
  const upperOk = UpperCase >= UPPER_MIN && UpperCase <= UPPER_MAX;
  if (upperOk) score++;
  document.getElementById('UpperCase').textContent = `UpperCase: ${upperOk ? '✓' : '✗'}`;

  const Number = (input.value.match(/[0-9]/g) || []).length;
  const numberOk = Number >= NUMBER_MIN && Number <= NUMBER_MAX;
  if (numberOk) score++;
  document.getElementById('Number').textContent = `Number: ${numberOk ? '✓' : '✗'}`;

  const Symbol = (input.value.match(/[^a-zA-Z0-9]/g) || []).length;
  const symbolOk = Symbol >= SYMBOL_MIN && Symbol <= SYMBOL_MAX;
  if (symbolOk) score++;
  document.getElementById('Symbol').textContent = `Symbol: ${symbolOk ? '✓' : '✗'}`;

  // Common/worst passwords are always weak, no matter what else they contain.
  if (COMMON_PASSWORDS.includes(input.value.toLowerCase())) {
    score = 0;
  }

  document.getElementById('score').textContent = `Score: ${score} / 6`;

  // Show the 0–6 score as lit battery segments + a label.
  const segments = document.querySelectorAll('.segment');
  const label = document.getElementById('label');

  // Pick the colour and label from the overall strength level.
  let color;
  if (score <= 2) {
    color = '#e74c3c';   // red
    label.textContent = 'Weak';
  } else if (score <= 4) {
    color = '#f39c12';   // amber
    label.textContent = 'Medium';
  } else {
    color = '#2ecc71';   // green
    label.textContent = 'Strong';
  }

  // Light up one cell per point; leave the rest empty.
  segments.forEach((segment, i) => {
    segment.style.backgroundColor = i < score ? color : '';
  });

  // Warn about lazy patterns (this does NOT change the score — just cautions).
  const warning = document.getElementById('warning');
  if (input.value !== '' && hasLazyPattern(input.value)) {
    warning.textContent = '⚠️ Avoid simple patterns like 1234, abcd, or aaaa.';
  } else {
    warning.textContent = '';   // clear it when there's no pattern
  }
}
input.addEventListener('input', updateScore);