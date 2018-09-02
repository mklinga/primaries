const $input = document.querySelector("input#numbers");
const $goButton = document.querySelector("button#goButton");
const $validationSpan = document.querySelector("span.validationError");
const $sumSpan = document.querySelector("span#sumSpan");
const $isPrimeSpan = document.querySelector("span#isPrimeSpan");

const trimInput = input => input.replace(/\s/g, "");

const validateInput = (input = "") => {
  if (!input) {
    return "You must give at least one number";
  }

  const hasInvalidCharacters = input.match(/[^0-9,]/);
  if (hasInvalidCharacters) {
    return "Only natural numbers and comma are allowed";
  }

  return null;
};

const hasMultipleNumbers = input => input.includes(",");

const resetResult = () => {
  $sumSpan.innerHTML = "";
  $isPrimeSpan.innerHTML = "";
  $isPrimeSpan.classList.remove("isPrime");
};

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
    .then(showPrettyResult(value))
    .catch(e => console.error("Fetching from api failed", e));
};

const onEnterPress = fn => event => {
  if (event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
    fn(event);
  }
};

const onGoButton = () => {
  resetResult();

  const trimmedInput = trimInput($input.value);
  const validationIssues = validateInput(trimmedInput);

  if (validationIssues) {
    $validationSpan.classList.remove("hidden");
    $validationSpan.innerHTML = validationIssues;
    return;
  }

  $validationSpan.classList.add("hidden");
  $validationSpan.innerHTML = "";

  const route = hasMultipleNumbers(trimmedInput)
    ? "/api/checkSum"
    : "/api/checkPrime";

  fetchResult(route, trimmedInput);
};

$goButton.addEventListener("click", onGoButton);
$input.addEventListener("keyup", onEnterPress(onGoButton));
