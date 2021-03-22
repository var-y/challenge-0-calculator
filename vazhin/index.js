class Calculator {
  constructor() {
    this.lastType = null;
    this.lastOperator = null;
    this.newExpression = null;
    this.inputQueue = [];
    this.precedenceScore = { '×': 2, '÷': 2, '+': 1, '-': 1 };
  }

  calculate() {}

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
}
