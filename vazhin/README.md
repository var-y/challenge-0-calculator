## My calculator app

I'm planning to implement this web calculator without the javascript's `eval` function.
You can look at my progress in the TODO below...

### TODO:

- [x] Create a UI
- [x] Disable input text (To avoid arbitrary patterns)
- [x] Define a Calculator class to handle calculations
- [x] Calculate the result with keeping order of operations in mind ( \* and / => + and - )
- [ ] Identify type of last input (whether number or operator)
- [ ] Update the display
- [ ] Handle the change of operator precedence when parenthesis are added
- [ ] Implement keyboard support
- [ ] Handle negative numbers
- [ ] Handle errors & edge cases
- [ ] Clean up the code

## Variables

```js
const lastType = 'NUMBER' | 'OPERATOR' | null;

const expression = {
  operator: '+',
  leftNum: 2,
  rightNum: 3.5,
};

const newExpression = expression | null;

const inputQueue = [expressionFirst, expressionSecond];
```

## Solving calculation based on order of precedence ( \* and / => + and - )

### First Try:

Before inserting the `newExpression` into `inputQueue` compare it with the lastOperator,
to decide which end (fist || last) to insert it into based on order of precedence

### Second Try:

I have to push the `newExpression` into the `inputQueue`
then sort the `inputQueue` based on each expression's operator property's precedence

```js
// Pseudo code of the calculate function in second try (recursive)
// Note: inputQueue is sorted here

function calculate(inputQueue) {
  /*
  1. calculate first expression in inputQueue
  2. remove the expression from inputQueue
  3. if inputQueue is empty now, return the result of current expression
  4. set the leftNum of next expression to the result of current expression
  5. return & call calculate again and pass it updated inputQueue
 */
}
```

### Third Try:

Second try didn't word correctly, because sorting the `inputQueue` means that the expressions' `leftNum` and `rightNum` will get messed up.
The correct `expression` form is that the first expression's `rightNum` should be the next expression's `leftNum`, always.
Sorting the `inputQueue` blindly means we would have incorrect expression chaining.
This time, I'll just push any `newExpression` into the `inputQueue` and handle the calculation in the calculate function below.

```js
// Pseudo code of the calculate function in third try (recursive)

function calculate(inputQueue) {
  /*
  1. look for first operator with highest precedence from left to right
  2. calculate the found expression
  3. remove it from inputQueue after calculating it
  4. if inputQueue is empty now, return the result of it
  5. if previous expression exists, set its rightNum to result
     if next expression exists, set its leftNum to result
  6. return & call calculate again and pass it updated inputQueue
 */
}
```
