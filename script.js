const divideZeroError = "NO DIVDE 0";

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
      let b = stk.pop();
      let a = stk.pop();
      if (!(isNumber(a) && isNumber(b))) return "ERROR"; // Operands should be numbers
      stk.push(operate(a, b, str));
    }
  });

  return stk.length == 1 ? Math.round(stk[0] * 10) / 10 : "ERROR"; // Stack should only have 1 element
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

const numbersContainer = document.querySelector(".numbers-container");

const createNumberButtons = () => {
  let num = 1;
  while (num <= 9) {
    let row = document.createElement("div");
    row.classList.toggle("buttons-row");
    for (let i = 0; i < 3; i++) {
      let button = document.createElement("button");
      button.addEventListener("click", (e) => onNumClick(e));
      button.textContent = num++;
      row.appendChild(button);
    }
    numbersContainer.appendChild(row);
  }

  let lastRow = document.createElement("div");

  lastRow.classList.toggle("buttons-row");
  let zero = document.createElement("button");
  zero.style.setProperty("flex", 2.34);
  zero.addEventListener("click", (e) => onNumClick(e));
  zero.textContent = "0";
  lastRow.appendChild(zero);

  let decimal = document.createElement("button");
  decimal.style.setProperty("flex", 1);
  decimal.addEventListener("click", (e) => onNumClick(e));
  decimal.textContent = ".";
  lastRow.appendChild(decimal);

  numbersContainer.appendChild(lastRow);
};

createNumberButtons();

const output = document.querySelector("#output");

const onNumClick = (e) => {
  if (output.textContent == divideZeroError) {
    output.textContent = "";
  }
  output.textContent += e.target.textContent;
};

const onOperatorClick = (e) => {
  if (output.textContent == divideZeroError) {
    output.textContent = "";
  }
  switch (e.target.textContent) {
    case "A/C":
      output.textContent = "";
      return;
    case "=":
      let res = evaluatePostfix(convertInfixToPostfix(output.textContent));
      output.textContent = res == "Infinity" ? divideZeroError : res;
      return;
    default:
      output.textContent += ` ${e.target.textContent} `;
  }
};
