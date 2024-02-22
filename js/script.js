const guessedLettersElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector("#letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again.hide");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  inProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const inputValue = textInput.value;
  const validInput = inputValidator(inputValue);
  if (validInput) {
  makeGuess(inputValue);
}
textInput.value = "";
});

const inputValidator = function (guess) {
  const acceptedLetter = /[a-zA-Z]/;
  if (guess === "") {
    message.innerText = "Please enter a letter";
  } else if (guess.length !== 1) {
    message.innerText = "Please enter only one letter";
  } else if (!guess.match(acceptedLetter)) {
    message.innerText = "Please enter a  valid letter";
  } else {
  return guess;
  }
};

const makeGuess = function (letter) {
  console.log("makeGuess called with letter", letter);
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You have already guessed that letter";
  } else {
    guessedLetters.push(letter);
    showGuess();
    updateWord(guessedLetters);
  }
  //console.log(guessedLetters);
};

const showGuess = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const goodGuessArray = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      goodGuessArray.push(letter.toUpperCase());
    } else {
      goodGuessArray.push("●");
    }
  }
  inProgress.innerText = goodGuessArray.join("");
  gameWon();
};

const gameWon = function() {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
  }
};
