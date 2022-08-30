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
    case '*':
      result = multiply([num1, num2]);
      break;
    case '/':
      result = divide([num1, num2]);
      break;
  }
  return result;
}

//console.log(operate(3,9,'/'));
//console.log(divide([3,9,9,2]));