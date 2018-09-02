const $input = document.querySelector("input#numbers");
const $goButton = document.querySelector("button#goButton");
const $validationSpan = document.querySelector("span.validationError");
const $sumSpan = document.querySelector("span#sumSpan");
const $isPrimeSpan = document.querySelector("span#isPrimeSpan");

const trimInput = input => input.replace(/\s/, "");

const validateInput = (input = "") => {
  if (!input) {
    return "You must give at least one number";
  }

  const hasInvalidCharacters = input.match(/[^0-9,]/);
  if (hasInvalidCharacters) {
    return "Invalid characters found in the input, only natural numbers and comma are allowed";
  }

  return null;
};

const hasMultipleNumbers = input => input.includes(",");

const showPrettyResult = value => response => {
  const { isPrime, sum } = response;
  const hasSum = sum !== undefined;
  const visibleValue = hasSum ? response.sum : value;
  $sumSpan.innerHTML = hasSum
    ? `The sum of given numbers is ${response.sum} <br />`
    : "";

  $isPrimeSpan.innerHTML = `${visibleValue} is ${
    isPrime ? "" : "not "
  } a prime number`;
  $isPrimeSpan.className = isPrime ? "isPrime" : "isNotPrime";
};

const fetchResult = (route, value) => {
  $isPrimeSpan.innerHTML = "Loading ...";
  fetch(`${route}/${value}`)
    .then(res => res.json())
    .then(showPrettyResult(value));
};

const onEnterPress = fn => event => event.keyCode === 13 && fn(event);

const onGoButton = () => {
  const trimmedInput = trimInput($input.value);

  const validationIssues = validateInput(trimmedInput);
  if (validationIssues) {
    $validationSpan.innerHTML = validationIssues;
    return;
  } else {
    $validationSpan.innerHTML = "";
  }

  const route = hasMultipleNumbers(trimmedInput)
    ? "/api/checkSum"
    : "/api/checkPrime";

  fetchResult(route, trimmedInput);
};

$goButton.addEventListener("click", onGoButton);
$input.addEventListener("keyup", onEnterPress(onGoButton));
