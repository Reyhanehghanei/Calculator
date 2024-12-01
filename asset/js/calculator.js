let result = document.getElementById("result");
let btnPoints = document.querySelector("#btn-point");
const historyDiv = document.getElementById("history");

let currentInput = 0;
let setPoint = false;

const isOperator = (char) => {
  return ["+", "-", "*", "/", "."].includes(char);
};

const display = (value) => {
  console.log(value);
  if (
    currentInput === 0 ||
    !isOperator(currentInput[currentInput.length - 1]) ||
    !isOperator(value)
  ) {
    currentInput += value;
    result.value = currentInput;
  }
};
const solve = () => {
  if (eval(currentInput) === 0) return;
  try {
    result.value = eval(currentInput);
    let x = result.value;
    let history = JSON.parse(localStorage.getItem("text")) || [];
    if (history.length < 5) {
      history.push(currentInput + " = " + result.value);
      localStorage.setItem("text", JSON.stringify(history));
    } else {
      console.log("شما نمی‌توانید بیشتر از 5 عدد ذخیره کنید.");
    }
    // پاک کردن مقدار ورودی ازinput
    currentInput = 0;
    result.value = 0;
    // وارد شدن هیستوری و به روز شدنش
    displayHistory();
    console.log(currentInput);
  } catch (error) {
    result.value = "Error";
    currentInput = 0;
  }
};

const clearScreen = () => {
  result.value = "";
  currentInput = "";
};

btnPoints.addEventListener("click", (e) => {
  if (setPoint == false) {
    display.textContent += ".";
    setPoint = true;
    console.log(setPoints);
  }
});

const displayHistory = () => {
  let history = JSON.parse(localStorage.getItem("text")) || [];
  historyDiv.innerHTML = "";

  history.forEach((item) => {
    const historyItem = document.createElement("div"); // ایجاد یک div جدید برای هر ورودی
    historyItem.textContent = item;
    historyDiv.appendChild(historyItem);
  });
};
window.onload = displayHistory;

// پاک کردن داده های هستوری
document.querySelector("#clear").addEventListener("click", function () {
  localStorage.removeItem("text");
  displayHistory();
  //   localStorage.clear();
});
