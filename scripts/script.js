let GetForm = document.forms.calculator;

let resultValue = GetForm.elements.result;
let calculationsValue = GetForm.elements.calculations;
function windowUpdate() {
  resultValue.value = InputString.inputValue;
  calculationsValue.value = InputString.outputValue;
  if (InputString.outputValue === "error: division by zero") InputString = new CalculationClass("");
}

let formNumButtons = GetForm.elements.number;
formNumButtons.forEach((e) => {
  e.addEventListener("click", (e) => {
    let value = e.path[0].value;
    InputString.inputSet = value;
    windowUpdate();
  });
});

let formExpressionButtons = GetForm.elements.expression;
formExpressionButtons.forEach((e) => {
  e.addEventListener("click", () => {
    let expression = e.value;
    InputString.expressionSwitcher(expression);
    windowUpdate();
  });
});

class CalculationClass {
  constructor() {
    this.input = "0";
    this.output = "0";
  }
  get inputValue() {
    return this.input;
  }
  get outputValue() {
    if (this.output.includes("/0")) this.output = "error: division by zero"
    return this.output;
  }
  set inputSet(val) {
    if (this.input === "0") {
      this.input = val;
    } else this.input = this.input + val;
  }

  expressionSwitcher(expression) {
    switch (expression) {
      case "1 /":
        if (this.input != 0) this.input = 1 / this.input;
        break;
      case "^ 2":
        if (this.input != "0") this.input = this.input * this.input;
        break;
      case "√":
        if (this.input != "0") this.input = Math.sqrt(this.input);
        break;
      case "+/-":
        if (this.input != "0") this.input = `${this.input * -1}`;
        break;
      case "CE":
        this.input = "0";
        break;
      case "⌫":
        if (this.input.length !== 1) {
          this.input = this.input.slice(0, -1);
        } else this.input = "0";
        break;
      case "C":
        this.input = "0";
        this.output = "0";
        break;
      case ".":
        if (!this.input.includes(".")) {
          this.input = this.input + ".";
        }
        break;
      case "=":
        this.output =
          this.output + this.input + " = " + eval(this.output + this.input);
        this.input = "0";
        break;
      default:
        if (this.output === "0") {
          this.output = this.input + expression;
          this.input = "0";
        } else if (this.output.includes("=")) {
          let tempIndex = this.output.indexOf("=", 1);
          this.output = this.output.slice(tempIndex + 1) + expression;
        } else {
          this.output = this.output + this.input + expression;
          this.input = "0";
        }
        break;
    }
  }
}
let InputString = new CalculationClass("");
