//import { validateGuess } from '/js/validation.js';

const container = document.getElementById("grid-board");
let numberOfLetters = document.getElementById("number-of-letters");
let drawBoardButton = document.getElementById("button-draw-board");
const once = {
  once: true,
};
let mainButton = document.getElementById("button-guess");
//drawBoardButton.addEventListener("click", startGame, once);
//Scorekeeper Object: keeps track of score, current row, guess word and the word you need
// to figure out.

let resetButtonArray = document.querySelectorAll(".reset");




resetButtonArray[0].addEventListener('click', resetGame);
resetButtonArray[1].addEventListener('click', resetGame);



let scoreKeeper = {
  score: 0,
  row: 0,
  theWordleWord: "",
  theGuess: "",
  numberOfLettersInWord: 0,
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
    console.log(tempSquare);
    if (updaterInputArray[i].toString().slice(-1) == 6) {
      tempSquare.style.setProperty('background-color', 'var(--lightThemeRed)');
    } else if (updaterInputArray[i].toString().slice(-1) == 5) {
      tempSquare.style.setProperty('background-color', "var(--lightThemeBlue)");
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

    for (let i = 0; i < missLetters.length; i++) {
      let tempSquare = document.querySelectorAll(
        ".key-" + missLetters[i] + ", .key-" + missLetters[i] + ">*"
      );

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

    mainButton.addEventListener("click", myFunction);

    if (resetHelper === 1) {
      mainButton.removeEventListener("click", myFunction); //{ signal: controller.signal });
    }

    function myFunction() {
      var theWord = scoreKeeper.theWordleWord.split("");
      scoreKeeper.row++;
      let wordGuess = document.getElementById("word-guess");
      let holder = wordGuess.value;
      scoreKeeper.theGuess = holder.split("");
      updateBoard(findIndex(theWord, scoreKeeper.theGuess), scoreKeeper.row);
      updateKeyboard(
        findIndex(theWord, scoreKeeper.theGuess),
        scoreKeeper.theGuess,
        theWord
      );
      placeLetters(scoreKeeper.theGuess);
      if (checkForWin(theWord.length)) {
        resetGame();
      }
      if (checkForLoss(scoreKeeper.row)) {
        resetGame();
      }
    }
  }
}

/*game functioning*/

function checkForWin(wordLength) {
  let score = 0;

  for (let i = 0; i < wordLength; i++) {
    let squareId = "#b" + scoreKeeper.row.toString() + "" + (i + 1);
    let tempSquare = document.querySelector(squareId);
    if (tempSquare.style.backgroundColor === "green") {
      score++;
    }
    if (score === wordLength) {
      let displayScore = scoreKeeper.row;
      alert("you win in " + displayScore);

      return true;
    }
  }
}

function checkForLoss(row) {
  if (row == 6) {
    alert("You lost");
    return true;
  }
}

//Resets game. Turns row back to 0, clears css on board and letters from guesses
//resets scorekeepers data. Passes 1 to mainGame() which indicates to remove event listener

function resetGame() {
  scoreKeeper.row = 0;

  resetBoardHtml();
  function resetBoardHtml() {
    let lettersList = document.querySelectorAll(".grid-item");
    lettersList.forEach((element) => {
      element.style.backgroundColor = "var(--lightThemeGray)";
      element.innerText = "";
    });
  }
  scoreKeeper.theWordleWord = "";
  resetKeyboard();
  mainGame(1);

  function resetKeyboard() {
    let keyElements = document.querySelectorAll(".keyboard-letters");

    keyElements.forEach((element) => {
      element.style.backgroundColor = "var(--lightThemeGray)";
    });
  }
}
//Resizes grid-items font-size to be responsive. 
//Need to update with ability to change column/letter changes

function getResponsiveFontSize() {
  let gridBoardWidthVar = document.querySelector("#grid-board");
  let width = gridBoardWidthVar.clientWidth;

  let value = (width / scoreKeeper.theWordleWord.length) * 0.65;

  let gridItems = document.querySelectorAll("#grid-board > *");

  gridItems.forEach((element) =>
    element.style.setProperty("font-size", value + "px")
  );
}

getResponsiveFontSize();
window.addEventListener("resize", getResponsiveFontSize);

mobileNavControl();
function mobileNavControl () {
  let mobileMenuButton = document.querySelector("nav>ul>li:nth-child(5)");
  mobileMenuButton.addEventListener('click', openMobileNav);

  let closeMobileMenuButton = document.querySelector(".close-overlay");
  closeMobileMenuButton.addEventListener('click', closeMobileNav);

  function openMobileNav() {
let overlay = document.querySelector(".overlay");

overlay.style.setProperty('width', "100%");



  }

  function closeMobileNav() {
    
    let overlay = document.querySelector(".overlay");
    overlay.style.setProperty('width', "0%");

  }
}
