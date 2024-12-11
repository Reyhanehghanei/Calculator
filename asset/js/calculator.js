let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let historyDiv = document.getElementById("history");
let currentInput = "";  
let lastResult = null; 

const isOperator = (char) => {
    return ["+", "-", "*", "/"].includes(char);
};

const isNegativeSign = (char) => {
    return char === '-';
};

const display = (value) => {
    // Allow the first character to be a negative sign
    if (currentInput === "" && isNegativeSign(value)) {
        currentInput += value;  
    } else if (!isNaN(value) || value === ".") {
        if (value === ".") {
            if (currentInput === "" || isOperator(currentInput[currentInput.length - 1])) {
                currentInput += "0.";
            } else if (!currentInput.includes(".")) {
                currentInput += value;
            }
        } else {
            if (currentInput === "0" && value !== ".") {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
    } else if (isOperator(value)) {
        if (currentInput === "" || isOperator(currentInput[currentInput.length - 1])) {
            if (currentInput !== "" && isOperator(currentInput[currentInput.length - 1])) {
                currentInput = currentInput.slice(0, -1) + value;  
            } else {
                return; 
            }
        } else {
            currentInput += value;  
        }
    }
    
    // Update the display
    result.value = currentInput;  
    result2.value = currentInput;  
};

const solve = () => {
    if (currentInput === "") return;  
    try {
        if (lastResult !== null) {
            lastResult *= 2;  
        } else {
            lastResult = eval(currentInput);  
        }

        result.value = lastResult; 
        result2.value = currentInput + " = " + lastResult;      

        let history = JSON.parse(localStorage.getItem("text")) || [];

        if (history.length >= 5) {
            history.shift();
        }

        history.push(currentInput + " = " + lastResult);     
        localStorage.setItem("text", JSON.stringify(history));

        currentInput = lastResult.toString(); 
        displayHistory();
    } catch (error) {
        result.value = "Error";
        result2.value = "Error";
        currentInput = "";
        lastResult = null;  
    }
};

const clearScreen = () => {
    result.value = "";
    result2.value = "";
    currentInput = "";
    lastResult = null;  
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

document.querySelector(".equal-sign").addEventListener("click", function () {
    solve();  
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", function () {
        display(button.value);  
    });
});