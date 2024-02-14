const letters = document.querySelector(".guessed-letters");
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
  textInput.value = "";
    const validInput = inputValidator(inputValue);
  makeGuess(validInput);
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
    message.innerText = "Great! Enter another letter";
  }
  return guess;
};

const makeGuess = function (letter) {
  letter.toUppercase;
  if (guessedLetters.includes(letter)) {
    message.innerText = "You have already guessed that letter";
  } else {
    guessedLetters.push(letter);
  }
  console.log(guessedLetters);
};
