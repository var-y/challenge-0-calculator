const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function getDisplayedText() {
  return display.value;
}

function getDisplayedLength() {
  return getDisplayedText().length;
}

function setDisplayedText(updatedText) {
  display.value = updatedText;
}

function write(output) {
  setDisplayedText(getDisplayedText() + output);
}

let stack = [];

// TODO: calculate the statement
function calculate(stack) {
  stack.forEach((elem) => console.log(elem));
}

function handleNumber(event) {
  write(event.target.textContent);
}

function handleOperator(event) {
  // check if there's no numbers
  if (getDisplayedText() === '') return;
  stack.push(getLastNumber(), event.target.textContent);
  write(event.target.textContent);
}

function handleClearAll(event) {
  setDisplayedText('');
  stack = [];
}

function getLastNumber() {
  let lastOperatorIndex;

  for (let i = getDisplayedLength() - 1; i >= 0; i--) {
    if (operations[getDisplayedText()[i]]) {
      lastOperatorIndex = i;
      break;
    }
  }

  const lastNumber = getDisplayedText().slice(
    lastOperatorIndex + 1,
    getDisplayedLength()
  );

  return lastNumber;
}

function handleResult(event) {
  // TODO: check if there's no operators

  // check if there's no numbers
  if (getDisplayedText() === '') return;
  // check if the last element is an operator
  if (operations[getDisplayedText()[getDisplayedLength() - 1]]) return;

  stack.push(getLastNumber());
  calculate(stack);
}

function handleClosingParenthesis() {}
function handleOpeningParenthesis() {}

const numbers = {
  0: handleNumber,
  1: handleNumber,
  2: handleNumber,
  3: handleNumber,
  4: handleNumber,
  5: handleNumber,
  6: handleNumber,
  7: handleNumber,
  8: handleNumber,
  9: handleNumber,
};

const operations = {
  '+': handleOperator,
  '-': handleOperator,
  '×': handleOperator,
  '÷': handleOperator,
  '=': handleResult,
};

const parenthesis = {
  ')': handleClosingParenthesis,
  '(': handleOpeningParenthesis,
};

const actions = {
  AC: handleClearAll,
};

const allButtons = {
  ...operations,
  ...actions,
  ...numbers,
  ...parenthesis,
};

buttons.forEach((button) => {
  button.addEventListener('click', allButtons[button.textContent]);
});
