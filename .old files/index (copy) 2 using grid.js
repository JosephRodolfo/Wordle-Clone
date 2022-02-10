const container = document.getElementById("container");

//Draws board, lets you choose size

function drawBoard(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < cols; c++) {
    for (i = 0; i < cols; i++) {
      let cell = document.createElement("div");
      cell.id = "b" + (c + 1) + "" + (i + 1);
    //  cell.innerText = "b" + (c + 1) + "" + (i + 1);

      container.appendChild(cell).className = "grid-item";
    }
  }
}

drawBoard(5, 5);

//Takes an array that looks like this [1, 2, 3, 4, 5], where each number in array represents a grid cell to change colors
//two digit ones, as in [10, 20, 30, 40, 50] turn green, single digit turn yellow.
function updateBoard(updaterInputArray, row) {
  for (let i = 0; i < updaterInputArray.length; i++) {
    let firstChar = updaterInputArray[i].toString().charAt(0);
    let squareId = "#b" + row.toString() + "" + firstChar;
    let tempSquare = document.querySelector(squareId);
    if (updaterInputArray[i].toString().length == 1) {
      tempSquare.style.backgroundColor = "yellow";
    } else {
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
        matchesArray.push(i + 1);
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



//Scorekeeper Object

let scoreKeeper = {
  score: 0,
  row: 0,
};

var myArray = "";
let mainButton = document.getElementById("button-main");
//var theWord = "karen".split("");


//Retrieves random word from txt file, in the future will add code to select how many letters, i.e.
//which doc to choose from


function getWord() {
  let url = "sgb-words.txt";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => {
      var allWords = res.split("\n");

      var r = Math.floor(Math.random() * allWords.length);

      //Get random line
      var line = allWords[r];
      //console.log(typeof line.toString());
      var testWord = line.toString();
      //console.log(testWord);
      console.log(testWord);
      return testWord;
    });
}


//asynFunction();

var x = "";


mainGame();



const controller = new AbortController();


function mainGame(){
asynFunction();
async function asynFunction() {
  x = await getWord();
  console.log("asyn fired");


  mainButton.addEventListener("click", function () {
    console.log("event listener added");

    var theWord = x.split("");
    scoreKeeper.row++;
    let wordGuess = document.getElementById("word-guess");
    let holder = wordGuess.value;
    myArray = holder.split("");
    updateBoard(findIndex(theWord, myArray), scoreKeeper.row);
   placeLetters(myArray);
   if(checkForWin(theWord.length)) {

    resetGame();
   };
  }, { signal: controller.signal });
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
   //   mainButton.removeEventListener("click", resetGame());

return true;    }
  }
}

function resetGame() {
  scoreKeeper.row = 0;

  resetBoardHtml();
  function resetBoardHtml() {
    let lettersList = document.querySelectorAll(".grid-item");
    lettersList.forEach((element) => {
      element.style.backgroundColor = "lightblue";
      element.innerText = "blank";
    });
  }
  x = "";
//  controller.abort(); // remove listener after value 
//  asynFunction();
mainGame();

}
