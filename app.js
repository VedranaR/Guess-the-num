//Game values
let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener("click", function() {
  //Parsing the input value into an integer for use in the function
  let guess = parseInt(guessInput.value);

  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, "red");
  }

  //Check if it's winning number
  if (guess === winningNum) {
    //Game over - you won
    gameOver(true, `${winningNum} is correct, you win!`);
  } else {
    //Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over - you lost
      gameOver(
        false,
        `Game over, you lost.The correct number was ${winningNum}.`
      );
    } else {
      //Game continues - answer is wrong

      //Change border color
      guessInput.style.borderColor = "red";

      //Clear input
      guessInput.value = "";

      //Tell user that his guess is incorrect
      setMessage(
        `Your ${guess} is not correct, ${guessesLeft} guesses left.`,
        "red"
      );
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //Disable the input
  guessInput.disabled = true;
  guessBtn.disabled = true;

  //Change the border color
  guessInput.style.borderColor = color;
  message.style.color = color;

  //Set message
  setMessage(msg);
}

//Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
