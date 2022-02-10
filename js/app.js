const container = document.getElementById("container");

//Draws board, lets you choose size

function drawBoard(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows; c++) {
    for (i = 0; i < cols; i++) {
      let cell = document.createElement("div");
      cell.id = "b" + (c + 1) + "" + (i + 1);
      //     cell.innerText = "b" + (c + 1) + "" + (i + 1);

      container.appendChild(cell).className = "grid-item";
    }
  }
}

let numberOfLetters = document.getElementById("number-of-letters");
let drawBoardButton = document.getElementById("button-draw-board");

//startGame begins when you click submit on number of columns (letters),
//draws board and kicks off main game flow;
function startGame() {
  drawBoard(6, numberOfLetters.value);
  scoreKeeper.numberOfLettersInWord = numberOfLetters.value;

  mainGame();
}
const once = {
  once: true,
};
drawBoardButton.addEventListener("click", startGame, once);

//Takes an array that looks like this [1, 2, 3, 4, 5], where each number in array represents a grid cell to change colors
//two digit ones, as in [10, 20, 30, 40, 50] turn green, single digit turn yellow.
function updateBoard(updaterInputArray, row) {
  for (let i = 0; i < updaterInputArray.length; i++) {
    //let firstChar = updaterInputArray[i].toString().charAt(0);
    let firstChar = updaterInputArray[i].toString().slice(0, -1);
    let squareId = "#b" + row.toString() + "" + firstChar;
    let tempSquare = document.querySelector(squareId);
    if (updaterInputArray[i].toString().slice(-1) == 6) {
      tempSquare.style.backgroundColor = "yellow";
    } else if (updaterInputArray[i].toString().slice(-1) == 5) {
      tempSquare.style.backgroundColor = "green";
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
    //  console.log(squareId);
    let tempLetterSquare = document.querySelector(squareId);

    tempLetterSquare.innerText = inputWord[i];
  }
}

//Scorekeeper Object: keeps track of score, current row, guess word and the word you need
// to figure out.

let scoreKeeper = {
  score: 0,
  row: 0,
  theWordleWord: "",
  theGuess: "",
  numberOfLettersInWord: 0
};

let mainButton = document.getElementById("button-main");

//Retrieves random word from txt file, in the future will add code to select how many letters, i.e.
//which doc to choose from

function getWord(numberLetters) {
 // let url = "word-list-files/15-letters.txt";
  let url = "word-list-files/" + numberLetters.toString() + "-letters.txt";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => {
      var allWords = res.split("\n");

      var r = Math.floor(Math.random() * allWords.length);

      var line = allWords[r];
      var testWord = line.toString();
      console.log(testWord);
      return testWord;
    });
}

//mainGame();

function mainGame(resetHelper) {
  asynFunction();

  async function asynFunction() {
    scoreKeeper.theWordleWord = await getWord(scoreKeeper.numberOfLettersInWord);

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
      placeLetters(scoreKeeper.theGuess);
      if (checkForWin(theWord.length)) {
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

//Resets game. Turns row back to 0, clears css on board and letters from guesses
//resets scorekeepers data. Passes 1 to mainGame() which indicates to remove event listener

function resetGame() {
  scoreKeeper.row = 0;

  resetBoardHtml();
  function resetBoardHtml() {
    let lettersList = document.querySelectorAll(".grid-item");
    lettersList.forEach((element) => {
      element.style.backgroundColor = "lightblue";
      element.innerText = "";
    });
  }
  scoreKeeper.theWordleWord = "";

  mainGame(1);
}
