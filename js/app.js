//import { validateGuess } from '/js/validation.js';
//import { validateNumberInput } from '/js/validation.js';

const container = document.getElementById("grid-board");
let numberOfLetters = document.getElementById("number-of-letters");
let drawBoardButton = document.getElementById("button-draw-board");
const once = {
  once: true,
};
let mainButton = document.getElementById("button-guess");
//let wordGuessInput = document.getElementById("word-guess");
//drawBoardButton.addEventListener("click", startGame, once);
//Scorekeeper Object: keeps track of score, current row, guess word and the word you need
// to figure out.
//lockoutFocus prevents key enter from firing when you win/you lose overlay is on. resets to zero when overlay
//opens and closes. 

let scoreKeeper = {
  lockoutFocus: 0,
  row: 0,
  theWordleWord: "",
  theGuess: "",
  numberOfLettersInWord: 0
};

startGame();

//Draws board, lets you choose size

function drawBoard(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (let c = 0; c < rows; c++) {
    for (let i = 0; i < cols; i++) {
      let cell = document.createElement("div");
      cell.id = "b" + (c + 1) + "" + (i + 1);
      //     cell.innerText = "b" + (c + 1) + "" + (i + 1);

      container.appendChild(cell).className = "grid-item";
    }
  }
}

//startGame begins when you click submit on number of columns (letters),
//draws board and kicks off main game flow;
function startGame() {
  drawBoard(6, 5); // numberOfLetters.value); //
  scoreKeeper.numberOfLettersInWord = 5; //numberOfLetters.value;
  mainGame();
}

//Takes an array that looks like this [1, 2, 3, 4, 5], where each number in array represents a grid cell to change colors
//two digit ones, as in [10, 20, 30, 40, 50] turn green, single digit turn yellow.
function updateBoard(updaterInputArray, row) {
  for (let i = 0; i < updaterInputArray.length; i++) {
    //let firstChar = updaterInputArray[i].toString().charAt(0);
    let firstChar = updaterInputArray[i].toString().slice(0, -1);
    let squareId = "#b" + row.toString() + "" + firstChar;
    let tempSquare = document.querySelector(squareId);
    if (updaterInputArray[i].toString().slice(-1) == 6) {
      tempSquare.style.setProperty("background-color", "var(--lightThemeRed)");
    } else if (updaterInputArray[i].toString().slice(-1) == 5) {
      tempSquare.style.setProperty("background-color", "var(--lightThemeBlue)");
    }
  }
}
//updates keyboards with hits, yellow or green. Still need to gray out unmatches;
function updateKeyboard(updaterInputArray, theGuessWord, theWordleWord) {
  grayOutMisses();

  //get produces array of guess misses, missLetters

  function grayOutMisses() {
    const output = theGuessWord.filter(function (obj) {
      return theWordleWord.indexOf(obj) == -1;
    });
    let missLetters = [...new Set(output)];
console.log(missLetters);
    for (let i = 0; i < missLetters.length; i++) {
      let tempSquare = document.querySelectorAll(
        `.key-${missLetters[i]}, .key-${missLetters[i]}>*`
      );
console.log(document.querySelector(".key-b"));
      tempSquare[0].style.setProperty(
        "background-color",
        "var(--lightThemeGray)"
      );
      tempSquare[1].style.setProperty(
        "background-color",
        "var(--lightThemeGray)"
      );
      tempSquare[2].style.setProperty(
        "background-color",
        "var(--lightThemeGray)"
      );
    }
  }

  for (let i = 0; i < updaterInputArray.length; i++) {
    let allButLast = updaterInputArray[i].slice(0, -1);

    allButLast--;

    let keyLight = ".key-" + theGuessWord[allButLast];

    let tempSquare = document.querySelectorAll(keyLight);
    if (updaterInputArray[i].toString().slice(-1) == 6) {
      if (tempSquare[0].style.backgroundColor == "--lightThemeBlue") {
        tempSquare[0].style.setProperty(
          "background-color",
          "var(--lightThemeBlue)"
        );
        tempSquare[1].style.setProperty(
          "background-color",
          "var(--lightThemeBlue)"
        );
        tempSquare[2].style.setProperty(
          "background-color",
          "var(--lightThemeBlue)"
        );
      } else {
        tempSquare[0].style.setProperty(
          "background-color",
          "var(--lightThemeRed)"
        );
        tempSquare[1].style.setProperty(
          "background-color",
          "var(--lightThemeRed)"
        );
        tempSquare[2].style.setProperty(
          "background-color",
          "var(--lightThemeRed)"
        );
      }
    } else if (updaterInputArray[i].toString().slice(-1) == 5) {
      tempSquare[0].style.setProperty(
        "background-color",
        "var(--lightThemeBlue)"
      );
      tempSquare[1].style.setProperty(
        "background-color",
        "var(--lightThemeBlue)"
      );
      tempSquare[2].style.setProperty(
        "background-color",
        "var(--lightThemeBlue)"
      );
    }
  }
}

//produces the information array to input into updateBoard

function findIndex(theWordleWord, theGuessWord) {
  let matchesArray = [];

  const output = theWordleWord.filter(function (obj) {
    return theGuessWord.indexOf(obj) !== -1;
  });

  function indexOfAll(array, searchItem) {
    var i = array.indexOf(searchItem);
    while (i !== -1) {
      if (theWordleWord[i] === theGuessWord[i]) {
        matchesArray.push(i + 1 + "" + 5);
      } else {
        matchesArray.push(i + 1 + "" + 6);
      }
      i = array.indexOf(searchItem, ++i);
    }
    return matchesArray;
  }

  for (let i = 0; i < output.length; i++) {
    indexOfAll(theGuessWord, output[i]);
  }
  return matchesArray;
}

//Inserts guess letters into the HTML, takes input word array.
function placeLetters(inputWord) {
  getResponsiveFontSize();
  for (let i = 0; i < inputWord.length; i++) {
    let squareId = "#b" + scoreKeeper.row + "" + (i + 1);
    let tempLetterSquare = document.querySelector(squareId);
    tempLetterSquare.innerText = inputWord[i];
  }
}

//Retrieves random word from txt file, in the future will add code to select how many letters, i.e.
//which doc to choose from

function getWord(numberLetters) {
  // let url = "word-list-files/15-letters.txt";
  let url = "word-list-files/" + numberLetters.toString() + "-letters.txt";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => {
      let allWords = res.split("\n");

      let r = Math.floor(Math.random() * allWords.length);

      let line = allWords[r];
      let testWord = line.toString();
      return testWord;
    });
}

//mainGame();

function mainGame(resetHelper) {
  asynFunction();


  async function asynFunction() {
    scoreKeeper.theWordleWord = await getWord(
      scoreKeeper.numberOfLettersInWord
    );
//Creates event listeners for text input (enter button only) and submit button
  /*  if (resetHelper !==1) {

  //  mainButton.addEventListener("click", myFunction);
  wordGuessInput.addEventListener("keydown", function(e){
      if(e.key == 'Enter' && scoreKeeper.lockoutFocus==0) {myFunction()}}
 )}*/

    /*if (resetHelper === 1) {
      mainButton.removeEventListener("click", myFunction);
      wordGuessInput.removeEventListener(("keyup", function(e){
        console.log("test");
        if(e.key == 'Enter') {myFunction()}}, false
   ))
    }*/


  }
}

/*game functioning*/

function checkForWin(wordLength) {
  let score = 0;

  for (let i = 0; i < wordLength; i++) {
    let squareId = "#b" + scoreKeeper.row.toString() + "" + (i + 1);
    let tempSquare = document.querySelector(squareId);
    if (tempSquare.style.backgroundColor === "var(--lightThemeBlue)") {
      score++;
    }
    if (score === wordLength) {
      let displayScore = scoreKeeper.row;

      overlayAlert("you win in " + displayScore);
      return true;
    }
  }
}

function checkForLoss(row) {
  if (row == 6) {
    //  alert("You lost. The answer was " + scoreKeeper.theWordleWord + ".");
    return true;
  }
}

//Resets game. Turns row back to 0, deletes grid-board html and redraws board. If statement
//determines whether or not you've entered a new number of letters, if not keeps old number.
//resets scorekeepers data. Passes 1 to mainGame() which indicates to remove event listener

function resetGame(columns) {
  container.innerHTML = "";
  if (typeof columns == "undefined") {
    drawBoard(6, scoreKeeper.numberOfLettersInWord);
  } else {
    scoreKeeper.numberOfLettersInWord = columns;
    drawBoard(6, columns);
  }
  scoreKeeper.row = 0;
  scoreKeeper.theWordleWord = "";
  resetKeyboard();
  mainGame(1);

  function resetKeyboard() {
    let keyElements = document.querySelectorAll(
      ".keyboard-letters, #all-letters-container >.flex-circle, #all-letters-container >.flex-circle>*"
    );

    keyElements.forEach((element) => {
      element.style.backgroundColor = "var(--lightThemeBlack)";
    });
  }
}
//Resizes grid-items font-size to be responsive.
//Need to update with ability to change column/letter changes

function getResponsiveFontSize() {
  let gridBoardWidthVar = document.querySelector("#grid-board");
  let width = gridBoardWidthVar.clientWidth;

  let value = (width / scoreKeeper.numberOfLettersInWord) * 0.65;

  let gridItems = document.querySelectorAll("#grid-board > *");

  gridItems.forEach((element) =>
    element.style.setProperty("font-size", value + "px")
  );
}

window.addEventListener("resize", getResponsiveFontSize);

mobileNavControl();
function mobileNavControl() {
  let mobileMenuButton = document.querySelector("nav>ul>li:nth-child(5)");
  mobileMenuButton.addEventListener("click", openMobileNav);

  let closeMobileMenuButton = document.querySelector(".close-overlay");
  closeMobileMenuButton.addEventListener("click", closeMobileNav);

  function openMobileNav() {
    let overlay = document.querySelector(".overlay");

    overlay.style.setProperty("width", "100%");
  }

  function closeMobileNav() {
    let overlay = document.querySelector(".overlay");
    overlay.style.setProperty("width", "0%");
  }
}

mobileInstructionsToggle();
function mobileInstructionsToggle() {
  let instructionsButton = document.querySelector(".instructions-mobile");

  instructionsButton.addEventListener("click", revealInstructions);
  let closeInstructions = document.querySelector(".close-instructions");

  closeInstructions.addEventListener("click", closeInstructionsFunc);
  let aside = document.querySelector("#instructions");

  function revealInstructions() {
    let gridBodyWrapper = document.getElementById("grid-body-wrapper");
    aside.style.setProperty("display", "flex");
    aside.style.setProperty("z-index", "99");
    aside.style.setProperty("position", "absolute");
    aside.style.setProperty("height", "100vh");
    aside.style.setProperty("width", "100%");
  }

  function closeInstructionsFunc() {
    aside.style.setProperty("display", "initial");
    aside.style.setProperty("z-index", "auto");

    aside.style.setProperty("position", "relative");
  }
}

function validateNumberInput1() {
  let inpObj = document.querySelector(".change-number-input1");
  if (!inpObj.checkValidity()) {
    alert("Enter a number 3 to 15!");
  } else {
    resetGame(inpObj.value);
  }
}

function validateNumberInput2() {
  let inpObj = document.querySelector(".change-number-input2");
  if (!inpObj.checkValidity()) {
    alert("Enter a number 3 to 15!");
  } else {
    resetGame(inpObj.value);
  }
}

darkThemeToggle();

function darkThemeToggle() {
  var root = document.querySelector(":root");

  let toggleSwitches = document.querySelectorAll(".dark-mode-toggle");
  toggleSwitches.forEach((element) =>
    element.addEventListener("change", turnOnOrOffDarkMode)
  );
  function turnOnOrOffDarkMode() {
    if (this.id == "toggle1") {
      toggleSwitches[1].checked = toggleSwitches[0].checked;
    } else if (this.id == "toggle2") {
      toggleSwitches[0].checked = toggleSwitches[1].checked;
    }

    if (toggleSwitches[0].checked) {
      root.style.setProperty("--lightThemeBlue", "#245262");
      root.style.setProperty("--lightThemeGray", "rgb(94, 94, 94)");
      root.style.setProperty("--lightThemeRed", "#6600ff");
      root.style.setProperty("--lightThemeBlack", "white");
      root.style.setProperty("--lightThemeBackground", "#18191A");
      root.style.setProperty("--lightThemeDropDown", "#f2f2f2");
      root.style.setProperty("--svgFilterSettings", 'invert(100%) sepia(0%) saturate(6%) hue-rotate(182deg) brightness(115%) contrast(94%)')
    } else {
      root.style.setProperty("--lightThemeBlue", "rgb(57, 126, 135)");
      root.style.setProperty("--lightThemeGray", "rgb(94, 94, 94)");
      root.style.setProperty("--lightThemeRed", "rgb(231, 150, 150)");
      root.style.setProperty("--lightThemeBlack", "black");
      root.style.setProperty("--lightThemeBackground", "#f7f7f7");
      root.style.setProperty("--lightThemeDropDown", "#f2f2f2");
      root.style.setProperty("--svgFilterSettings", 'none')

    }
  }
  //From left to right: background, card, hover color, primary text, secondary text
}

/*--lightThemeBlue: rgb(57, 126, 135);
--lightThemeGray: rgb(94, 94, 94)
--lightThemeRed: rgb(231, 150, 150)
--lightThemeBlack: black
--lightThemeBackground: #f7f7f7
--lightThemeDropDown: #f2f2f2
*/

function overlayAlert(alertMessage, callbackFunction) {
  scoreKeeper.lockoutFocus=1;

  let overlayMessageHolder = document.querySelector(".overlay-alert-card>span");

  overlayMessageHolder.innerText = alertMessage;
  let overlay = document.querySelector(".overlay-alert-wrapper");

  overlay.style.setProperty("opacity", "100%");
  overlay.style.setProperty("z-index", "99");
  const once = {
    once: true,
  };

  function resetGameAndResetOverlay() {
    scoreKeeper.lockoutFocus=0;

    let overlay = document.querySelector(".overlay-alert-wrapper");

    overlay.style.setProperty("opacity", "0");
    overlay.style.setProperty("z-index", "-2");
    callbackFunction;
  }

  let overlayResetButton = document.querySelector("#close-alert-button");

  
  overlayResetButton.addEventListener("click", resetGameAndResetOverlay, once);



}

function validateGuess(guessWord, numberOfLetters) {


 



  if (alphaOnly(guessWord) && checkLength(guessWord, numberOfLetters)) {
    return true;
  } else {
    alert("Please ensure your guess comprises only the correct amount of letters and no numbers!");

    return false;
  }

  function alphaOnly(input) {
    let temp = input.toLowerCase();

    for (let i = 0; i < input.length; i++) {
      let key = temp.charCodeAt(i);
      if (key >= 97 && key <= 122) {
        if (i == input.length - 1) {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  function checkLength(input, lengthOfWord) {
    return input.length === lengthOfWord;
  }
}



