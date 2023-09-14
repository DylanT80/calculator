const convertInfixToPostfix = (exp) => {
  exp = exp.split(" ");
  let stk = [];
  let res = [];

  exp.forEach((str) => {
    // Operand
    if (isNumber(str)) {
      res.push(str);
    }
    // Open (
    else if (str == "(") stk.push(str);
    // Close )
    else if (str == ")") {
      while (stk[stk.length - 1] != "(") {
        res.push(stk.pop());
      }
      stk.pop();
    }
    // Operator
    else {
      let currPrec = precedence(str);
      while (stk.length > 0 && currPrec <= precedence(stk[stk.length - 1])) {
        res.push(stk.pop());
      }
      stk.push(str);
    }
  });

  // Empty stack
  while (stk.length > 0) {
    res.push(stk.pop());
  }
  return res;
};

const isNumber = (str) => !isNaN(str);
const precedence = (operator) => {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return -1;
  }
};

const evaluatePostfix = (exp) => {
  let stk = [];
  exp.forEach((str) => {
    if (isNumber(str)) stk.push(Number(str));
    else {
      let a = stk.pop();
      let b = stk.pop();
      if (!(isNumber(a) && isNumber(b))) return "ERROR"; // Operands should be numbers
      stk.push(operate(a, b, str));
    }
  });

  return stk.length == 1 ? stk[0] : "ERROR"; // Stack should only have 1 element
};

const operate = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      return a / b;
  }
};

console.log(evaluatePostfix(convertInfixToPostfix("4")));
