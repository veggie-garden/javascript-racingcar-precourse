import Car from "./car.js";
import { getWinner, printResultOneTurn, printWinner } from "./utils.js";
import { isCarNameValid, isRacingCountValid } from "./validation.js";

const racingCarGame = {
  cars: [],
  turnOfGame: 0,
  race() {
    for (let i = 0; i < this.cars.length; i += 1) {
      this.cars[i] = Car.forwardCar(this.cars[i]);
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

const preventSubmitByEnterKey = () => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
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

  racingCountForm.style.display = "block";
  racingCountText.style.display = "block";
};

const showResultHeading = () => {
  const resultHeading = document.getElementById("result");
  resultHeading.style.display = "block";
};

const createCarObjectIfNamesValid = (e) => {
  const game = e.currentTarget.currentGame;
  const button = e.currentTarget;
  const carNamesInput = document.getElementById("car-names-input");
  const validCarNames = isCarNameValid(carNamesInput.value);
  e.preventDefault();

  if (validCarNames) {
    game.cars = validCarNames.map((carName) => new Car(carName));
    button.disabled = true;
    showRacingCountForm();
  }
};

const startGameIfRacingCountValid = (e) => {
  const game = e.currentTarget.currentGame;
  const button = e.currentTarget;
  const racingCountInput = document.getElementById("racing-count-input");
  e.preventDefault();

  if (isRacingCountValid(racingCountInput.value)) {
    game.turnOfGame = Number(racingCountInput.value);
    button.disabled = true;
    showResultHeading();
    racingCarGame.startGame(game);
  }
};

const init = (gameSetting) => {
  const carNamesButton = document.getElementById("car-names-submit");
  const racingCountButton = document.getElementById("racing-count-submit");

  preventSubmitByEnterKey();
  hideRacingCountForm();

  carNamesButton.addEventListener("click", createCarObjectIfNamesValid);
  racingCountButton.addEventListener("click", startGameIfRacingCountValid);

  carNamesButton.currentGame = gameSetting;
  racingCountButton.currentGame = gameSetting;
};

const game = racingCarGame;
init(game);
