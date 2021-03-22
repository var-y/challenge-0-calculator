## My calculator app

I'm planning to implement this web calculator without the javascript's `eval` function.
You can look at my progress in the TODO below...

### TODO:

- [x] Create a UI
- [x] Disable input text (To avoid arbitrary patterns)
- [ ] Define a Calculator class to handle calculations & updating the display
- [ ] Handle the change of operator precedence when parenthesis are added
- [ ] Implement keyboard support
- [ ] Calculate the result with keeping order of operations in mind
- [ ] Handle negative numbers
- [ ] Get the order of operations right ( \* and / => + and - )
- [ ] Identify type of last input (whether number or operator)
- [ ] Handle errors & edge cases
- [ ] Clean up the code

4 primary entities: operations (string), numbers (float), expressions (2 numbers & 1 operator, inputQueue (sorted-expressions based on operator precedence))

```js
const lastType = 'NUMBER' | 'OPERATOR' | null;

const expression = {
  operator: '+',
  leftNum: 2,
  rightNum: 3.5,
};

const newExpression = expression | null;

/*
I thought:
Before inserting the newExpression into inputQueue compare it with the lastOperator,
to decide which end (fist || last) to insert it into based on order of precedence

But conclusion:
I have to push the newExpression into the inputQueue
then sort the inputQueue based on each expression's operator property

*/

const inputQueue = [expressionFirst, expressionSecond];

// some pseudo code of the calculate function

function calculate(inputQueue) {
  // calculate fist expression in inputQueue
  // remove the expression from inputQueue
  //
  // if inputQueue is empty now, return the result of current expression
  //
  // set the leftNum of next expression to the result of current expression
  // call calculate again and pass it updated inputQueue
}
```
