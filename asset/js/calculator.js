let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let historyDiv = document.getElementById("history");
let currentInput = "";

const isOperator = (char) => {
    return ["+", "-", "*", "/", "."].includes(char);
};

const isNegativeSign = (char) => {
    return char === '-';
};

const display = (value) => {
    console.log(currentInput);

    if (value === ".") {
        if (currentInput === "" || isOperator(currentInput[currentInput.length - 1])) {
            currentInput += "0.";
        } else if (!currentInput.includes(".")) {
            currentInput += value;
        }

        result.value = currentInput;
        result2.value = currentInput;
        return;
    }

    if (currentInput.length === 1 && currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        if (currentInput === "" || isOperator(currentInput[currentInput.length - 1])) {
            if (isNegativeSign(value) && currentInput === "") {
                currentInput += value;
                result.value = currentInput;
                result2.value = currentInput;
                return;
            }

            if (isOperator(value) || value === "0") {
                return;
            }
            currentInput += value;
        } else {
            if (isOperator(value) && isOperator(currentInput[currentInput.length - 1])) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
        }
    }

    result.value = currentInput;
    result2.value = currentInput;
};

const solve = () => {
    if (currentInput === "") return;
    try {
        const evaluatedResult = eval(currentInput);
        result.value = evaluatedResult;
        result2.value = currentInput + " = " + evaluatedResult;

        let history = JSON.parse(localStorage.getItem("text")) || [];

        if (history.length >= 5) {
            history.shift();
        }

        history.push(currentInput + " = " + evaluatedResult);
        localStorage.setItem("text", JSON.stringify(history));

        currentInput = evaluatedResult;
        displayHistory();
    } catch (error) {
        result.value = "Error";
        result2.value = "Error";
        currentInput = "";
    }
};

const clearScreen = () => {
    result.value = "";
    result2.value = "";
    currentInput = "";
};

const displayHistory = () => {
    let history = JSON.parse(localStorage.getItem("text")) || [];
    historyDiv.innerHTML = "";

    history.forEach((item) => {
        const historyItem = document.createElement("div");
        historyItem.textContent = item;
        historyDiv.appendChild(historyItem);
    });
};

const backspace = () => {
    // Remove the last character from currentInput
    currentInput = currentInput.slice(0, -1);

    // Update the display
    result.value = currentInput;
    result2.value = currentInput;
};

window.onload = displayHistory;

document.querySelector("#clear").addEventListener("click", function () {
    localStorage.removeItem("text");
    displayHistory();
});