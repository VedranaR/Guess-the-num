window.addEventListener("DOMContentLoaded", () => {
  //Game values
  let min = 1,
    max = 20,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

  //UI elements
  const minNumber = document.getElementById("min-num"),
    maxNumber = document.getElementById("max-num"),
    guessButton = document.getElementById("guess-btn"),
    guessInput = document.getElementById("guess-input"),
    message = document.getElementById("message");

  //Assign UI min and max
  minNumber.textContent = min;
  maxNumber.textContent = max;

  //Listen for guess
  guessButton.addEventListener("click", () => {
    //Parsing the input value into an integer for use in the function
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}.`, "red");
    } else if (guess === winningNumber) {
      //Check if it's the winning number

      //Game over - you won
      gameOver(true, `${winningNumber} is correct, you win!`);
    } else {
      //Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        //Game over - you lost
        gameOver(
          false,
          `Game over, you lost. The correct number was ${winningNumber}.`
        );
      } else {
        //Game continues - answer is wrong

        //Clear input
        guessInput.value = "";

        //Tell user that his guess is incorrect
        setMessage(
          `${guess} is not the number you look for, ${guessesLeft} guesses left.`,
          "red"
        );
      }
    }
  });

  //Set message
  function setMessage(msg, color) {
    message.style.color = color;
    message.innerText = msg;
  }

  //Game over
  function gameOver(won, msg) {
    let color;
    won === true ? (color = "green") : (color = "red");

    //Disable the input
    guessInput.disabled = true;

    //Set message
    setMessage(msg, color);

    //Play again?
    guessButton.value = "Play Again";
    guessButton.classList.add("play-again");
  }

  //Get winning number
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  //Play again event listener
  document.getElementById("game").addEventListener("mousedown", e => {
    if (e.target.classList.contains("play-again")) {
      window.location.reload();
    }
  });
});
