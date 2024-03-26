'use strict';

/*------------------------------------*/
/*------------UTILITY FUNCTIONS-------*/
/*-------------------------------------*/


function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */


const hintGenerator = select('.hint-generator');
const guessInput = select('.guess-input');
const guessesRemaining = select('.guesses-remaining');
const restartButton = select('.restart-button');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Play Game                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */


guessInput.focus();


let randomNumber = Math.floor(Math.random() * 50) + 1;
let guessCount = 5;

function handleGuess() {
  let inputValue = parseFloat(guessInput.value.trim());
  if (inputValue >= 1 && inputValue <= 50 && !isNaN(inputValue)) {
    if (inputValue === randomNumber) {
      hintGenerator.innerHTML = 'Well done! You guessed the right number!';
      guessInput.disabled = true;
    } else if (inputValue > randomNumber) {
      hintGenerator.innerHTML = 'My number is lower.';
      guessCount--; // Corrected variable name
      guessesRemaining.innerText = guessCount; // Corrected variable name
    } else {
      hintGenerator.innerHTML = 'My number is higher.';
      guessCount--; // Corrected variable name
      guessesRemaining.innerText = guessCount; // Corrected variable name
    }
    if (guessCount === 0) { // Corrected variable name
      hintGenerator.innerHTML = `No guesses remaining. My number was ${randomNumber}.`;
      guessInput.disabled = true;
    }
  }
  else {
    hintGenerator.innerHTML = 'Please enter a valid number between 1 and 50';
  }
}

  
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Restart Game                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function restartGame() {
  randomNumber = Math.floor(Math.random() * 50) + 1; // Corrected random number generation
  guessCount = 5; // Corrected variable name
  guessesRemaining.innerHTML = guessCount; // Corrected variable name
  guessInput.value = '';
  guessInput.disabled = false;
  hintGenerator.innerHTML = 'Guess the number between 1 and 50';
}


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

listen('keydown', guessInput, event => {
    if (event.key === 'Enter') {
      handleGuess();
      guessInput.value = '';
    }
  });
  
listen('click', restartButton, restartGame);