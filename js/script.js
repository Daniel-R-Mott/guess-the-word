const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector("#letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = ".remaining";
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector("play-again hide");

const word = "magnolia";

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
  const inputValue = textInput.value;
  console.log(inputValue);
  textInput.value = "";
});
