class Calculator {
  constructor() {
    this.lastType = null;
    this.newExpression = {
      rightNum: null,
      operator: null,
      leftNum: null,
    };
    this.inputQueue = [];
    this.precedenceScore = { '×': 2, '÷': 2, '+': 1, '-': 1 };
    this.operations = {
      '+': (num1, num2) => num1 + num2,
      '-': (num1, num2) => num1 - num2,
      '×': (num1, num2) => num1 * num2,
      '÷': (num1, num2) => num1 / num2,
    };
    this.hasOperator = false;
  }

  calculate(inputQueue) {
    // 1. look for first operator with highest precedence from left to right
    const currentOperation = {
      expression: null,
      precedence: 0,
      index: null,
    };
    inputQueue.forEach((expression, index) => {
      const precedence = this.precedenceScore[expression.operator];
      if (precedence > currentOperation.precedence) {
        currentOperation.expression = expression;
        currentOperation.precedence = precedence;
        currentOperation.index = index;
      }
    });
    // 2. calculate the found expression
    const result = this.calculateExpression(currentOperation.expression);
    // 3. remove it from inputQueue after calculating it
    inputQueue.splice(currentOperation.index, 1);
    // 4. if inputQueue is empty now, return the result of it
    if (this.isEmpty(inputQueue)) {
      this.clearAll();
      return result;
    }
    // 5. if previous expression exists, set its rightNum to result
    //    if next expression exists, set its leftNum to result
    if (inputQueue[currentOperation.index - 1])
      inputQueue[currentOperation.index - 1].rightNum = result;
    if (inputQueue[currentOperation.index])
      // because the expression has been removed, the next is in its place now
      inputQueue[currentOperation.index].leftNum = result;
    // 6. return & call calculate again and pass it updated inputQueue
    return this.calculate(inputQueue);
  }

  addExpression() {
    if (!this.newExpression || !this.isValidExpression(this.newExpression))
      return;

    const newExpression = { ...this.newExpression };
    this.inputQueue.push(newExpression);
  }

  isValidExpression(expression) {
    /*
      TODO: check if it's these patterns:
      num operator num
      openParenthesis num operator num closedParenthesis
    */

    const isValid =
      expression.leftNum && expression.operator && expression.rightNum;
    return isValid;
  }

  calculateExpression(expression) {
    return this.operations[expression.operator](
      expression.leftNum,
      expression.rightNum
    );
  }

  setNewExpressionNumber(number) {
    if (this.lastType === 'OPERATOR') {
      this.newExpression.rightNum = number;
      this.addExpression();
    } else if (this.lastType === null) this.newExpression.leftNum = number;
    this.setLastType('NUMBER');
  }

  setNewExpressionOperator(operator) {
    if (!this.isEmpty(this.inputQueue))
      this.newExpression.leftNum = this.newExpression.rightNum;
    this.newExpression.operator = operator;
    this.hasOperator = true; // TODO: this is to avoid an edge case in the UI, find a better way to handle it
    this.setLastType('OPERATOR');
  }

  setLastType(type) {
    this.lastType = type;
  }

  clearAll() {
    this.lastType = null;
    this.newExpression = {
      rightNum: null,
      operator: null,
      leftNum: null,
    };
    this.inputQueue = [];
    this.hasOperator = false;
  }

  // Utilities

  isEmpty(arr) {
    return arr.length === 0;
  }
}

// Calculator instance

const calculator = new Calculator();

// UI elements

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Display field methods

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

function isLastCharOperator() {
  return calculator.operations[getDisplayedText()[getDisplayedLength() - 1]];
}

function getLastNumber() {
  let lastOperatorIndex;

  for (let i = getDisplayedLength() - 1; i >= 0; i--) {
    if (calculator.operations[getDisplayedText()[i]]) {
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

// Event Handler methods

function handleNumber(event) {
  write(event.target.textContent);
}

function handleOperator(event) {
  // check if there's no numbers
  if (getDisplayedText() === '') return;
  // check if last character is operator
  if (isLastCharOperator()) return;
  calculator.setNewExpressionNumber(parseFloat(getLastNumber()));
  calculator.setNewExpressionOperator(event.target.textContent);
  write(event.target.textContent);
}

function handleResult() {
  // check if there's no operators
  if (!calculator.hasOperator) return;
  // check if there's no numbers
  if (getDisplayedText() === '') return;
  // check if last character is operator
  if (isLastCharOperator()) return;

  calculator.setNewExpressionNumber(parseFloat(getLastNumber()));
  setDisplayedText(calculator.calculate(calculator.inputQueue));
}

function handleClearAll() {
  setDisplayedText('');
  calculator.clearAll();
}

function handleDot() {}
function handleClosingParenthesis() {}
function handleOpeningParenthesis() {}

// Available buttons

const eventHandlers = {
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
  '.': handleDot,
  '+': handleOperator,
  '-': handleOperator,
  '×': handleOperator,
  '÷': handleOperator,
  '=': handleResult,
  AC: handleClearAll,
  ')': handleClosingParenthesis,
  '(': handleOpeningParenthesis,
};

// Adding event handlers to elements

buttons.forEach((button) => {
  button.addEventListener('click', eventHandlers[button.textContent]);
});
