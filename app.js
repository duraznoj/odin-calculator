//////// GLOBAL VARIABLES ////////
let currentNum = '';
let nextNum = '';
let currentOp = '';
let waitForOperator = true;
let firstStatementEvaluated = false;
//let digitBuffer = [];

const display = document.querySelector(".display");

//const digitButtons = document.querySelectorAll(".digit > button");
const buttons = document.querySelectorAll("button");


//////// FUNCTIONS ////////

const add = function(a, b) {
  return a + b;
};

const subtract = function(a,b) {
  return a - b;
};

const sum = function(arr) {
  
  if(!arr[0]) {
    return 0;
  };

  const output = arr.reduce( (outSum, item) => outSum + item, 0);
  return output;

};

const multiply = function(arr) {

  if(!arr[0]) {
    return 0;
  };

  const output = arr.reduce( (outSum, item) => outSum * item, 1);
  return output;

};

const divide = function(arr) {

  if(!arr[0]) {
    return 0;
  };
  
  const output = arr.reduce( (outSum, item) => item ? outSum / item: "Divide By Zero Error");
  return output;

};

const power = function(a,b) {
  return Math.pow(a,b);	
};

//const factorialDict = {};
const factorial = function(num) {
  if(num > 1) {
    return num * factorial(num - 1);
  } else {
    return 1;
  }
};

let result;
const operate = (num1, num2, operator) => {
  switch(operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case 'X':
      result = multiply([num1, num2]);
      break;
    case '÷':
      result = divide([num1, num2]);
      break;
  }
  
  display.textContent = result;
  return result;
}

//console.log(operate(3,9,'/'));
//console.log(divide([3,9,9,2]));



//////// MAIN ////////

//want to get input of numbers only to update display
//want to concatenate numbers together in string 
//then want to perform operation on the numbers we have stored when the execute button is called.....
//could have array of objects...
/*[
  {
    num1: 2,
    num2: 4,
    op: '+'
  },
]*/


function processInput() {

  const input = this.textContent;

  const inputType = this.parentElement.className;
  //console.log(inputType);

  //digitInput = Number(this.textContent).toFixed(2); //store input data
  if(inputType === "digit" && !firstStatementEvaluated) {

    if(waitForOperator) {
      console.log("currentNum update")
      currentNum += input; //add numbers to string
      display.textContent = currentNum; //update display

    } else {
      console.log("nextNum update")
      nextNum += input; //add numbers to a string
      display.textContent = nextNum; //update display

    }

    //display.textContent = input; //update display

  } else if(inputType === "operator"){

    switch(input) {
      case "=":
        console.log("equals operator")
        console.log(Number(currentNum), Number(nextNum), currentOp);
        currentNum = String(operate(Number(currentNum), Number(nextNum), currentOp)); //set output to currentNum
        nextNum = ''; //reset nextNum
        console.log(Number(currentNum), Number(nextNum), currentOp);
        waitForOperator = true;
        firstStatementEvaluated = true;
        break;

      case "C":
        if(!firstStatementEvaluated) {
          if(display.textContent.length === 1) {
            display.textContent = '0';
            waitForOperator ? currentNum = '': nextNum = '';
          } else {
            display.textContent = display.textContent.slice(0, -1) //remove from display
            currentNum = currentNum.slice(0, -1); //remove from currentNum;
          }

        }
        break;

      case "AC":
        display.textContent = '0';
        currentNum = '';
        nextNum = '';
        currentOp = '';
        firstStatementEvaluated = false;
        break;

      default:
        console.log("other operator");
        currentOp = input;
        waitForOperator = false;
        firstStatementEvaluated = false;

    } 
    
  }
  
}

buttons.forEach((elem) => {
  elem.addEventListener('click', processInput);
});