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
  }

  // Utilities

  isEmpty(arr) {
    return arr.length === 0;
  }
}

const calculator = new Calculator();

calculator.setNewExpressionNumber(2);
calculator.setNewExpressionOperator('+');
calculator.setNewExpressionNumber(9);

calculator.setNewExpressionOperator('×');
calculator.setNewExpressionNumber(1);

calculator.setNewExpressionOperator('÷');
calculator.setNewExpressionNumber(3);

console.log(calculator.inputQueue);
console.log(calculator.calculate(calculator.inputQueue));

// Initialling UI elements

// const display = document.getElementById('display');
// const buttons = document.querySelectorAll('button');

// Available buttons

// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const operators = ['+', '-', '×', '÷'];
// const equalSign = '=';
// const actions = [AC];
// const symbols = ['(', ')', '.']; // TODO: handle parenthesis

// const eventHandlers = {
//   NUMBER: handleNumber,
//   OPERATOR: handleOperator,
//   EQUAL: handleResult,
//   AC: handleClearAll,
//   DOT: handleDot,
// };

////////////// Event assignment

// buttons.forEach((button) => {
//   button.addEventListener('click', allButtons[button.textContent]);
// });
