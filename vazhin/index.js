class Calculator {
  constructor() {
    this.lastType = null;
    this.newExpression = null;
    this.inputQueue = [];
    this.precedenceScore = { '×': 2, '÷': 2, '+': 1, '-': 1 };
    this.operations = {
      '+': (num1, num2) => num1 + num2,
      '-': (num1, num2) => num1 - num2,
      '×': (num1, num2) => num1 * num2,
      '÷': (num1, num2) => num1 / num2,
    };
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
    if (this.isEmpty(inputQueue)) return result;
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

    this.inputQueue.push(this.newExpression);
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

  // TODO: simplify this method, I don't think I need the lastIndex method
  setNewExpressionNumber(number) {
    if (this.lastType === 'OPERATOR') {
      this.newExpression.rightNum = number;
      // automatically set the leftNum
      if (this.lastIndex()) {
        this.newExpression.leftNum = this.inputQueue[this.lastIndex()].rightNum;
        this.addExpression();
      }
    } else if (this.lastType === null) this.newExpression.leftNum = number;
    this.setLastType('NUMBER');
  }

  setNewExpressionOperator(operator) {
    this.newExpression.operator = operator;
    this.setLastType('OPERATOR');
  }

  setLastType(type) {
    this.lastType = type;
  }

  clearAll() {
    this.lastType = null;
    this.newExpression = null;
    this.inputQueue = [];
  }

  // Utilities

  isEmpty(arr) {
    return arr.length === 0;
  }

  lastIndex() {
    const lastIndex = this.inputQueue.length - 1;
    if (lastIndex >= 0) return lastIndex;
    return null;
  }
}

const calculator = new Calculator();

calculator.newExpression = {
  operator: '+',
  leftNum: 2,
  rightNum: 9,
};
calculator.addExpression();

calculator.newExpression = {
  operator: '×',
  leftNum: 9,
  rightNum: 1,
};
calculator.addExpression();

calculator.newExpression = {
  operator: '÷',
  leftNum: 1,
  rightNum: 3,
};
calculator.addExpression();

console.log(calculator.inputQueue);
console.log(calculator.calculate(calculator.inputQueue));

// Initialling UI elements

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Available buttons

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ['+', '-', '×', '÷'];
const equalSign = '=';
const actions = [AC];
const symbols = ['(', ')', '.']; // TODO: handle parenthesis

const eventHandlers = {
  NUMBER: handleNumber,
  OPERATOR: handleOperator,
  EQUAL: handleResult,
  AC: handleClearAll,
  DOT: handleDot,
};

////////////// Event assignment

buttons.forEach((button) => {
  button.addEventListener('click', allButtons[button.textContent]);
});
