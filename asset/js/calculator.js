let result = document.getElementById("result");
let result2 = document.getElementById("result2");
let historyDiv = document.getElementById("history");
let currentInput = "";

const isOperator = (char) => {
  return ["+", "-", "*", "/", "."].includes(char);
};
23;

const display = (value) => {
  console.log(currentInput);

  if (currentInput.length === 1 && currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    if (
      currentInput === "" ||
      isOperator(currentInput[currentInput.length - 1])
    ) {
      if (value === "0") {
        return;
      }
      if (value == ".") {
        return;
      }
      currentInput += value;
    } else if (
      !isOperator(currentInput[currentInput.length - 1]) ||
      !isOperator(value)
    ) {
      currentInput += value;
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
