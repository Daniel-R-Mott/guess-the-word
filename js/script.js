const guessedLettersElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector("#letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again.hide");
const guessForm = document.querySelector(".letter");
const guessFormLabel = document.querySelector(".label");


// Initial game state
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Grabs words from text file and sets one at random as game word
const getWord = async function () {
  const request = await fetch(
    `https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`
  );
  const data = await request.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

// Hides letters until player guesses them
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  inProgress.innerText = placeholderLetters.join("");
};

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

// Checks that players input is a single letter
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

// Checks that players guess is novel and adds to guessed letters array
const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You have already guessed that letter";
  } else {
    guessedLetters.push(letter);
    showGuess();
    guessInput(letter);
    updateWord(guessedLetters);
  }
};

// Reveals letter of game word if player guesses correctly
const showGuess = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

// Messages player the results of guess
const guessInput = function (guess) {
  word = word.toUpperCase();
  if (word.includes(guess)) {
    message.innerText = `Nice! The word contains the letter ${guess}`;
  } else if (!word.includes(guess)) {
    message.innerText = `Sorry, there are no ${guess}'s in the word`;
    remainingGuesses -= 1;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
  if (remainingGuesses === 0) {
    message.innerText = `Game over! The word was ${word}`;
    startOver();
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

const gameWon = function () {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function() {
  button.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
  guessForm.classList.add("hide");
  guessFormLabel.classList.add("hide");
}
;

playAgainButton.addEventListener("click", function() {
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  playAgainButton.classList.add("hide");
  button.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  guessForm.classList.remove("hide");
  guessFormLabel.classList.remove("hide");
  getWord();
});