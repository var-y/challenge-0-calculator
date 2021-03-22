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

    // if (this.inputQueue.length > 1)
    //   this.inputQueue.sort(this.compareExpressions.bind(this));
  }

  // compareExpressions(A, B) {
  //   const precedenceOfA = this.precedenceScore[A.operator];
  //   const precedenceOfB = this.precedenceScore[B.operator];
  //   if (precedenceOfA > precedenceOfB) return -1;
  //   if (precedenceOfA < precedenceOfB) return +1;
  //   return 0;
  // }

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

// console.log(calculator.inputQueue);

console.log(calculator.calculate(calculator.inputQueue));
