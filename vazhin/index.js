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
    const result = this.calculateExpression(inputQueue[0]);
    inputQueue.shift();
    if (this.isEmpty(inputQueue)) return result;
    inputQueue[0].leftNum = result;
    return this.calculate(inputQueue);
  }

  addExpression() {
    if (!this.newExpression || !this.isValidExpression(this.newExpression))
      return;

    this.inputQueue.push(this.newExpression);

    if (this.inputQueue.length > 1)
      this.inputQueue.sort(this.compareExpressions.bind(this));
  }

  compareExpressions(A, B) {
    const precedenceOfA = this.precedenceScore[A.operator];
    const precedenceOfB = this.precedenceScore[B.operator];
    if (precedenceOfA > precedenceOfB) return -1;
    if (precedenceOfA < precedenceOfB) return +1;
    return 0;
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

  // Utilities

  calculateExpression(expression) {
    return this.operations[expression.operator](
      expression.leftNum,
      expression.rightNum
    );
  }

  isEmpty(arr) {
    return arr.length === 0;
  }
}

const calculator = new Calculator();

calculator.newExpression = {
  operator: '+',
  leftNum: 2,
  rightNum: 3.5,
};
calculator.addExpression();

calculator.newExpression = {
  operator: '×',
  leftNum: 3.5,
  rightNum: 3.5,
};
calculator.addExpression();

console.log(calculator.inputQueue);

console.log(calculator.calculate(calculator.inputQueue));
