//////// GLOBAL VARIABLES ////////
let statementEvaluated = false;

const display = document.querySelector(".display");

//const digitButtons = document.querySelectorAll(".digit > button");
const buttons = document.querySelectorAll("button");

const operatorArr = ["+", "-", "*", "/", "^", "Backspace", "Enter"];


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
  
  const output = arr.reduce( (outSum, item) => item ? outSum / item : "DivideByZeroError");
  return output;

};

const power = function(a, b) {
  return Math.pow(a, b);	
};

//const factorialDict = {};
/*const factorial = function(num) {
  if(num > 1) {
    return num * factorial(num - 1);
  } else {
    return 1;
  }
};*/

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
    case "*":
      result = multiply([num1, num2]);
      break;
    case '÷':
    case "/":
      result = divide([num1, num2]);
      break;
    case '^':
      result = power(num1, num2);
      break;
  }

  if(result === "DivideByZeroError") {
    display.textContent = "Divide By Zero Error!"
    return '';
  }

  if(result % 1 !== 0) { //round number if it is a decimal
    result = Math.round((result + Number.EPSILON) * 100) / 100;
  }

  display.textContent = result;
  return result;
}

//object to store user input (numbers and operators) and evaluate expressions
let storedInput = {
  currentNum: '',
  nextNum: '',
  currentOp: '',
  runCalc() {
    this.currentNum = String(operate(Number(this.currentNum), Number(this.nextNum), this.currentOp)); //set output to currentNum
    this.nextNum = ''; //reset nextNum
    //return this.currentNum; //return output
  }
}

//////// MAIN ////////

function checkDecimal(inChar, objProp) {
  if(inChar !== ".") { //if the input digit is not "."
    storedInput[objProp] += inChar;
    display.textContent = storedInput[objProp]; //update display

  } else if(storedInput[objProp].indexOf(".") === -1) { //if the input digit is the first decimal point added to the number
    storedInput[objProp] ? storedInput[objProp] += inChar : storedInput[objProp] = "0."; //if the number doesn't have any digits, prefix the "." with a zero
    display.textContent = storedInput[objProp]; //update display
  }
}


function processInput(input, inputType) {

  //const input = this.textContent; //get user input
  //const inputType = this.parentElement.className; //get type of user input (from the html class name - either digit or operator)

  if(inputType === "digit") { //if user types a number and the first statement has not yet been evaluated...

    if(!storedInput.currentOp) { //if we have not yet entered an operator, store the input in the currentNum slot
      if(!statementEvaluated) { //if we have not evaluated the statement (or if we already started a new number)
        checkDecimal(input, "currentNum");
        
      } else { //if we just evaluated the statement, we need to clear the currentNum slot and add to the blank slot
        storedInput.currentNum = '';
        checkDecimal(input, "currentNum");
        statementEvaluated = false; //set flag to false so we can append digits to currentNum if we want to
      }

    } else { // if we have entered an operator then we store in the input in the next slot (nextNum)
      checkDecimal(input, "nextNum");
    }

  } else if(inputType === "operator"){

    switch(input) {
      case "=":
      case "Enter":
        if(storedInput.nextNum) { //if the user has entered a second number
          storedInput.runCalc();
        }
        storedInput.currentOp = '';
        statementEvaluated = true; //flag so we know whether or not to append user input to an existing number or start typing a new number
        break;


      case "C":
      case "Backspace":
        //if there is only one positive or negative digit left on the display we show '0'
        if(display.textContent.length === 1 || (display.textContent.length === 2 && display.textContent.indexOf("-") > -1)) {
          display.textContent = '0';
          //if the user has entered an operator then we need to update nextNum, otherwise we update currentNum
          storedInput.currentOp ? storedInput.nextNum = '': storedInput.currentNum = ''; 
        } else { //otherwise if there is more than one digit on the display we just remove one digit from the display and 
          display.textContent = display.textContent.slice(0, -1) //remove from display
          //if the user entered an operator we edit nextNum, otherwise we edit currentNum
          storedInput.currentOp ? storedInput.nextNum = storedInput.nextNum.slice(0, -1): storedInput.currentNum = storedInput.currentNum.slice(0, -1); 
        }
        break;

      case "AC": //if user wants to clear the whole display and memory we reset everything
        display.textContent = '0';
        storedInput.currentNum = '';
        storedInput.nextNum = '';
        storedInput.currentOp = '';
        break;

      case "+/-": //if the user wants to make the sign positive/negative
        //could add support for prefixing numbers with "-"

        if(storedInput.currentOp) {
          storedInput.nextNum *= -1;
          display.textContent = storedInput.nextNum;

        } else {
          storedInput.currentNum *= -1;
          display.textContent = storedInput.currentNum;
        }
        break;

      default: //for all other operators (eg +, X, - etc...)
        //if we already have stored two numbers we need to evaluate the previous operation and then store the output in one slot and empty the second slot
        if(storedInput.nextNum) {
          storedInput.runCalc();
        }

        storedInput.currentOp = input; //store operator that the user typed in (Eg +, /, etc...)
    } 
    
  }
  
}

//handle mouse click events
buttons.forEach((elem) => {
  elem.addEventListener('click', function(mouseDown) {
    const btnIn = this.textContent; //get user input
    const btnType = this.parentElement.className; //get type of user input (from the html class name - either digit or operator)
    processInput(btnIn, btnType);
  });
});

//add keyboard support
document.addEventListener('keydown', function(event) {
  if((event.key >= '0' && event.key <= '9') || event.key === ".") {
    processInput(event.key, "digit");
  } else if(operatorArr.indexOf(event.key) > -1) {
    //if(event.key === "-" && storedInput.currentOp)
    processInput(event.key, "operator");
  }
});