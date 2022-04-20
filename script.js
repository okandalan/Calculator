function add (x, y) {
    return x + y;
}
function substract (x, y) {
    return x - y;
}
function divide (x, y) {
    
    return x / y;
}
function multiply (x, y) {
    return x * y;
}
function mod (x, y) {
    return x % y;
}

function operate (operator, x, y) {
    x = Number(x);
    y = Number(y);
    let result;

    if (operator === "+")
        result = add(x,y);
    if (operator === "−")
        result = substract(x,y);
    if (operator === "÷")
        result = divide(x,y);
    if (operator === "×")
        result = multiply(x,y);
    if (operator === "%")    
        result = mod(x, y);
    
    return Math.round((result + Number.EPSILON) * 1000) / 1000; /* round to 3 decimal place */
}

function clear () {
    operand1 = null;
    operand2 = null;
    op = "";
    result = null;

    expression.textContent = "0";
    prevExpression.textContent = "";
}

function backspace() {
    if (expression.textContent.length <= 1)
        expression.textContent = "0";
    else 
        expression.textContent = expression.textContent.slice(0, expression.textContent.length - 1);
}

function changeSign() {
    if (expression.textContent.charAt(0) === "-")
        expression.textContent = expression.textContent.slice(1);
    else
        expression.textContent = "-" + expression.textContent;
}

const prevExpression = document.getElementById("prev-expression");
const expression = document.getElementById("expression");
const operands = document.querySelectorAll(".number");
const dotBtn = document.getElementById("btn-decimal");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.getElementById("btn-equal");
const clearBtn = document.getElementById("btn-clear");
const backspaceBtn = document.getElementById("btn-backspace");
const signBtn = document.getElementById("btn-sign");

let operand1 = null;
let operand2 = null;
let op = "";
let result = null;


operands.forEach((operand) => {
    operand.addEventListener("click", () => {
        if (expression.textContent === "0") {
            expression.textContent = operand.textContent;
        }
        else {
            expression.textContent += operand.textContent;
        }
    })
})

dotBtn.addEventListener("click", () => {    
    if (!expression.textContent.includes("."))
        expression.textContent += ".";
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {

        if (!prevExpression.textContent || prevExpression.textContent.slice(-2, -1) === "="){
            operand1 = expression.textContent;
        }

        else if (prevExpression.textContent) {
            operand2 = expression.textContent;
            operand1 = operate(op, operand1, operand2);
        }        

        op = operator.textContent; 
        prevExpression.textContent = `${operand1} ${op} `;
        expression.textContent = "0";
    })
})

equalBtn.addEventListener("click", () => {
    operand2 = expression.textContent;
    result = operate(op, operand1, operand2);
    prevExpression.textContent += operand2 + " = ";
    expression.textContent = result;
})

clearBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", backspace);
signBtn.addEventListener("click", changeSign);