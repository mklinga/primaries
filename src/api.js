const express = require("express");

const apiRouter = express.Router();

// A number is a prime number if it is only divisible with 1 and itself
const checkPrime = number => {
  if (number <= 3) {
    return true;
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

const checkPrimeRoute = (req, res, next) => {
  const numberToCheck = req.params.number;
  const isPrime = checkPrime(numberToCheck);
  return res.json({ isPrime });
};

const checkSumRoute = (req, res, next) => {
  const numbers = req.params.numberList
    .split(",")
    .filter(Boolean)
    .map(Number);
  const sum = numbers.reduce((sum, num) => sum + num, 0);
  const isPrime = checkPrime(sum);
  return res.json({ sum, isPrime });
};

apiRouter.get("/checkPrime/:number", checkPrimeRoute);
apiRouter.get("/checkSum/:numberList", checkSumRoute);

module.exports = apiRouter;
