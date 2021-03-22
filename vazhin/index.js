const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let stack = [];

////////////// Utilities

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

const orderOfOperations = {
  '×': 0,
  '÷': 1,
  '+': 2,
  '-': 3,
};

function isGreater(operation1, operation2) {
  return orderOfOperations[operation1] > orderOfOperations[operation2];
}

const calculator = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '×': (num1, num2) => num1 * num2,
  '÷': (num1, num2) => num1 / num2,
};

function calculate(stack, queue = []) {
  for (let i = 1; i < stack.length; i += 2) {
    for (let j = i + 2; j < stack.length; j += 2) {
      if (isGreater(stack[i], stack[j])) {
        let temp = stack[i];
        stack[i] = stack[j];
        stack[j] = temp;
      }
    }
  }

  // To be continued...

  console.log(stack);

  // queue.sort(compareOrderOfOperations);

  // if (queue.length === 0) {
  //   return stack[stack.length - 1];
  // }

  // const currentOperator = queue.shift();

  // const index = stack.indexOf(currentOperator);

  // const result = calculator[currentOperator](
  //   stack[index - 1],
  //   stack[index + 1]
  // );
}

////////////// Event handlers

function handleNumber(event) {
  write(event.target.textContent);
}

function handleOperator(event) {
  // check if there's no numbers
  if (getDisplayedText() === '') return;
  stack.push(parseInt(getLastNumber()), event.target.textContent);
  write(event.target.textContent);
}

function handleClearAll(event) {
  setDisplayedText('');
  stack = [];
}

function handleResult(event) {
  // TODO: check if there's no operators

  // check if there's no numbers
  if (getDisplayedText() === '') return;
  // check if the last element is an operator
  if (operations[getDisplayedText()[getDisplayedLength() - 1]]) return;

  stack.push(parseInt(getLastNumber()));
  setDisplayedText(calculate(stack));
}

function handleClosingParenthesis() {}
function handleOpeningParenthesis() {}

////////////// The available buttons

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

////////////// Event assignment

buttons.forEach((button) => {
  button.addEventListener('click', allButtons[button.textContent]);
});
