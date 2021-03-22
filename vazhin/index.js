const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

class Calculator {
  constructor() {
    this.lastType = null;
    this.lastOperator = null;
    this.newExpression = null;
    this.inputQueue = [];
    // this.insert = {
    //   FIRST: (newExpression) => this.inputQueue.unshift(newExpression),
    //   LAST: (newExpression) => this.inputQueue.push(newExpression),
    // };
    this.precedenceScore = { '×': 2, '÷': 2, '+': 1, '-': 1 };
  }

  calculate() {}

  addExpression() {
    if (!this.newExpression || !isValidExpression(this.newExpression)) return;
    // const insertEnd = this.getInsertEnd(
    //   this.newExpression.operator,
    //   this.lastOperator
    // );

    // this.insert[insertEnd];

    this.inputQueue.push(this.newExpression);
    this.inputQueue.sort(this.compareExpressions);
  }

  // Got rid of getInsertEnd method because we might want to insert in the middle of inputQueue not just the ends, based on operation order
  // getInsertEnd(newOperator, lastOperator) {
  //   const resultOfComparison = compareExpressions(newOperator, lastOperator);
  //   if ([0, -1].includes(resultOfComparison)) return '';
  // }

  compareExpressions(A, B) {
    const precedenceOfA = this.precedenceScore[A.operator];
    const precedenceOfB = this.precedenceScore[B.operator];
    if (precedenceOfA > precedenceOfB) return +1;
    if (precedenceOfA < precedenceOfB) return -1;
    return 0;
  }

  isValidExpression(expression) {
    /*
      TODO: check if it's these patterns:
      num operator num
      openParenthesis num operator num closedParenthesis
    */
  }
}
