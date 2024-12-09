let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let historyDiv = document.getElementById("history");
let currentInput = "";

const isOperator = (char) => {
  return ["+", "-", "*", "/", "."].includes(char);
};

const display = (value) => {
  console.log(currentInput);

  // If the current input is "0" and the value is not a decimal, replace it
  if (currentInput.length === 1 && currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    // Check if the last character is an operator
    if (currentInput === "" || isOperator(currentInput[currentInput.length - 1])) {
      // Prevent adding another operator or a leading zero
      if (isOperator(value) || value === "0") {
        return;
      }
      currentInput += value; // Add number
    } else {
      // If the last character is a number, we can add an operator or another number
      if (isOperator(value) && isOperator(currentInput[currentInput.length - 1])) {
        // If the last character is also an operator, replace it with the new one
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value; // Add number or operator
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
    if (history.length < 5) {
      history.push(currentInput + " = " + evaluatedResult);
      localStorage.setItem("text", JSON.stringify(history));
    } else {
      console.log("شما نمی‌توانید بیشتر از 5 عدد ذخیره کنید.");
    }

    currentInput = "";
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

window.onload = displayHistory;

document.querySelector("#clear").addEventListener("click", function () {
  localStorage.removeItem("text");
  displayHistory();
});