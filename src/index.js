import {
  generateRandomNumber,
  getWinner,
  printResultOneTurn,
  printWinner,
} from "./utils.js";
import {
  checkCarNameValidation,
  checkRacingCountValidation,
} from "./validation.js";

function Car(name) {
  this.carName = name;
  this.forwardCount = 0;
}

const racingCarGame = {
  cars: [],
  turnOfGame: 0,
  race() {
    for (let i = 0; i < this.cars.length; i += 1) {
      const randomNumber = generateRandomNumber();
      if (randomNumber > 3) {
        this.cars[i].forwardCount += 1;
      }
    }
  },
  startGame() {
    while (this.turnOfGame > 0) {
      this.race();
      this.turnOfGame -= 1;
      printResultOneTurn(this.cars);
    }
    printWinner(getWinner(this.cars));
  },
};

const hideRacingCountForm = () => {
  const racingCountForm = document.getElementById("racing-count-form");
  const racingCountText = document.getElementById("racing-count-text");
  const resultHeading = document.getElementById("result");

  racingCountForm.style.display = "none";
  racingCountText.style.display = "none";
  resultHeading.style.display = "none";
};

const showRacingCountForm = () => {
  const racingCountForm = document.getElementById("racing-count-form");
  const racingCountText = document.getElementById("racing-count-text");
  const carNamesSubmit = document.getElementById("car-names-submit");

  racingCountForm.style.display = "block";
  racingCountText.style.display = "block";
  carNamesSubmit.disabled = true;
};

const showResultHeading = () => {
  const resultHeading = document.getElementById("result");
  const racingCountSubmit = document.getElementById("racing-count-submit");

  resultHeading.style.display = "block";
  racingCountSubmit.disabled = true;
};

const getValidCarNames = () => {
  const carNamesInput = document.getElementById("car-names-input");

  return checkCarNameValidation(carNamesInput.value);
};

const createCarObjectIfNamesValid = (e) => {
  const validCarNames = getValidCarNames();
  e.preventDefault();

  if (validCarNames) {
    racingCarGame.cars = validCarNames.map((carName) => new Car(carName));
    showRacingCountForm();
  }
};

const getValidRacingCount = () => {
  const racingCountInput = document.getElementById("racing-count-input");

  return checkRacingCountValidation(racingCountInput.value);
};

const startGameIfRacingCountValid = (e) => {
  const validRacingCount = getValidRacingCount();
  e.preventDefault();

  if (validRacingCount !== null) {
    racingCarGame.turnOfGame = Number(validRacingCount);
    showResultHeading();
    racingCarGame.startGame();
  }
};

const init = () => {
  const carNamesButton = document.getElementById("car-names-submit");
  const racingCountButton = document.getElementById("racing-count-submit");

  hideRacingCountForm();

  carNamesButton.addEventListener("click", createCarObjectIfNamesValid);
  racingCountButton.addEventListener("click", startGameIfRacingCountValid);
};

init();
