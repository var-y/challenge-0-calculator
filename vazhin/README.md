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
- [ ] Get the order of operations right ( \* => / => + => - )
- [ ] Handle errors & edge cases
- [ ] Clean up the code

4 primary entities: operations (string), numbers (float), expressions (2 numbers & 1 operator, inputStack (sorted-expressions based on operator precedence))
