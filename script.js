let firstOp = secondOp = operator = result = null;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "ERROR" : a / b;
}
function operate(a, b, c) {
    operators = [
        { operator: "+", calc: add(a, b) },
        { operator: "-", calc: subtract(a, b) },
        { operator: "*", calc: multiply(a, b) },
        { operator: "/", calc: divide(a, b) },
    ];
    return operators.find((v) => v.operator === c).calc;
}
// overflows and keyboardfunctionality
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.display');
    display.textContent = "0";

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonKey = event.target.textContent;
            if (buttonKey)

                if (result !== null && operator === null && firstOp === null && secondOp === null) {
                    if (/^[0-9.]$/.test(buttonKey)) {
                        display.textContent = buttonKey;
                        firstOp = buttonKey;
                        result = null;
                    } else if (["+", "-", "*", "/"].includes(buttonKey)) {
                        display.textContent += buttonKey;
                        operator = buttonKey;
                        firstOp = result;
                    }
                    else if (buttonKey === "%") {
                        display.textContent += buttonKey
                        firstOp = result
                        secondOp = "100"
                        operator = "/"
                    }
                } else if (operator === null && firstOp === null) {
                    if (/^[0-9.]$/.test(buttonKey)) {
                        if (firstOp === "0" && buttonKey === "0") { display.textContent = 0 }
                        else {
                            display.textContent = buttonKey
                            firstOp = buttonKey;
                        }

                    }
                } else if (operator === null && firstOp !== null) {
                    if (/^[0-9.]$/.test(buttonKey)) {
                        const dSplit = display.textContent.split("")
                        if (dSplit.includes(".") && buttonKey === ".") {
                            display.textContent = display.textContent
                        }
                        else {
                            display.textContent += buttonKey;
                            firstOp += buttonKey;
                        }
                    } else if (["+", "-", "*", "/"].includes(buttonKey)) {
                        display.textContent += buttonKey;
                        operator = buttonKey;
                    }
                    else if (buttonKey === "%") {
                        display.textContent += buttonKey
                        secondOp = "100"
                        operator = "/"
                    }
                    else if (buttonKey === "+/-") {
                        console.log(display.textContent)
                        display.textContent = "-" + display.textContent
                        firstOp *= -1
                    }
                } else if (operator !== null && secondOp === null) {
                    if (/^[1-9.]$/.test(buttonKey)) {
                        display.textContent = buttonKey;
                        secondOp = buttonKey;
                    }
                } else if (operator !== null && secondOp !== null) {
                    if (/^[0-9.]$/.test(buttonKey)) {
                        const dSplit = display.textContent.split("")
                        if (dSplit.includes(".") && buttonKey === ".") {
                            display.textContent = display.textContent
                        } else {
                            display.textContent += buttonKey;
                            secondOp += buttonKey;
                        }
                    } else if (buttonKey === "=") {
                        result = operate(parseFloat(firstOp), parseFloat(secondOp), operator);
                        if (result === "ERROR") {
                            display.textContent = "ERROR";
                        } else {
                            display.textContent = result;
                        }
                        firstOp = secondOp = operator = null;
                    } else if (buttonKey === "%") {
                        display.textContent += buttonKey
                        secondOp = secondOp / 100
                    }
                    else if (buttonKey === "+/-") {
                        display.textContent = "-" + display.textContent
                        secondOp *= -1
                    }
                }
            if (buttonKey === "AC") {
                firstOp = secondOp = operator = result = null;
                display.textContent = "0";
                console.clear()
            }
        });
    });
});