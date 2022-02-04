console.log("hello");
let GetForm = document.forms.calculator;

let resultValue = GetForm.elements.result;
let calculationsValue = GetForm.elements.calculations;

let formNumButtons = GetForm.elements.number;
formNumButtons.forEach((e) => {
  e.addEventListener("click", (e) => {
    let value = e.path[0].value;
    LiveNum = setResult(value);
  });
});

let formExpressionButtons = GetForm.elements.expression;
formExpressionButtons.forEach((e) => {
  e.addEventListener("click", () => {
    let expression = e.value;
    setCalculations(expression);
  });
});

let AccessExpression = false;

function setResult(value) {
  if (resultValue.value === "0") resultValue.value = value;
  else resultValue.value = resultValue.value + value;
  AccessExpression = true;
  return resultValue.value;
}
function resetResult() {
  resultValue.value = "0";
}
function resetAll() {
  resetResult();
  LiveNum = resultValue.value;
  calculationsValue.value = "0";
  TempNum = undefined;
  TempExpression = undefined;
  AccessExpression = false;
}
let LiveNum = resultValue.value;
let TempNum;
let TempExpression;

function setCalculations(expression) {
  TempNum = LiveNum;
  switch (expression) {
    case "1 /":
      if (LiveNum != "0") {
        LiveNum = 1 / LiveNum;
        resetResult();
        LiveNum = setResult(LiveNum);
      }
      break;
    case "^ 2":
      if (LiveNum != "0") {
        LiveNum = LiveNum * LiveNum;
        resetResult();
        LiveNum = setResult(LiveNum);
      }
      break;
    case "√":
      if (LiveNum != "0") {
        LiveNum = Math.sqrt(LiveNum);
        resetResult();
        LiveNum = setResult(LiveNum);
      }
      break;
    case "+/-":
      if (LiveNum != "0") {
        LiveNum = `(${LiveNum * -1})`;
        resetResult();
        LiveNum = setResult(LiveNum);
      }
      break;
    case ".":
      if (!LiveNum.includes(".")) {
        resetResult();
        LiveNum = setResult(`${LiveNum}.`);
      }
      break;
    case "CE":
      resetResult();
      break;
    case "⌫":
      if (LiveNum != "0" && LiveNum.length !== 1) {
        resetResult();
        LiveNum = setResult(LiveNum.slice(0, -1));
      } else {
        resetResult();
        LiveNum = "0";
      }
      break;
    case "C":
      resetAll();
      break;
    case "=":
      console.log("=");
      if (calculationsValue.value == "0") {
        calculationsValue.value = LiveNum;
      } else if (AccessExpression) {
        calculationsValue.value = calculationsValue.value + LiveNum;
      }
      getExpressionResult();
      break;
    default:
      if (AccessExpression) {
        if (calculationsValue.value != "0")
          calculationsValue.value =
            calculationsValue.value + expression + LiveNum;
        else calculationsValue.value = LiveNum + expression;
        LiveNum = "0";
        TempExpression = expression;
        AccessExpression = false;
        resetResult();
      }
      break;
  }
}

function getExpressionResult() {
  console.log(calculationsValue.value + LiveNum);

  console.log(eval(calculationsValue.value));

  let temp = eval(calculationsValue.value);
  resetAll();
  LiveNum = "0";
  calculationsValue.value = temp;
}
