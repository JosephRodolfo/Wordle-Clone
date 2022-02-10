const container = document.getElementById("container");

//Draws board, lets you choose size

function drawBoard(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < cols; c++) {
    for (i = 0; i < cols; i++) {
      let cell = document.createElement("div");
      cell.id = "b" + (c + 1) + "" + (i + 1);
      cell.innerText = "b" + (c + 1) + "" + (i + 1);

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
    //  console.log(firstChar);
    let squareId = "#b" + row.toString() + "" + firstChar;
    //console.log(squareId);
    let tempSquare = document.querySelector(squareId);
    // console.log(updaterInputArray[i].toString().length);
    if (updaterInputArray[i].toString().length == 1) {
      //     console.log(updaterInputArray[i].toString().length);
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
  //console.log(output);

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



  //console.log(matchesArray);
  return matchesArray;
}



//updateBoard(findIndex(["k", "k", "k", "k", "k"], ["n", "e", "r", "a", "k"]), 4);
//updateBoard(findIndex( ["n", "e", "r", "a", "k"], ["k", "k", "k", "k", "k"],), 4);


let scoreKeeper = {
  score: 0,
  row: 0,
};

var myArray = "";
let mainButton = document.getElementById("button-main");
//var theWord = "karen".split("");

function testFunction() {
  let arr = ["two", "three", "four"];

  return arr[0];
}

console.log(testFunction());

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
asynFunction();

var x = "";

async function asynFunction() {
  // let x = await getWord();
  // console.log(x);

  //console.log(x);
  //console.log(getWord());

  x = await getWord();
  //console.log(x + " before");

  mainButton.addEventListener("click", function () {
    //  let x = await getWord();
    // console.log(x + " after");

    //  console.log(res);
    var theWord = x.split("");

    scoreKeeper.row++;





    let wordGuess = document.getElementById("word-guess");
    //document.getElementById("demo").innerHTML = "Hello World";
    // let x = mainButton.value;
    let holder = wordGuess.value;


    myArray = holder.split("");


console.log(theWord);

console.log(myArray);
    updateBoard(findIndex(theWord, myArray), scoreKeeper.row);


    updateMatchYellow(findIndexOfMatches(theWord));
    // console.log(myArray);
    placeLetters(myArray);
    checkForWin();
  });
}

/*  Comparing arrays javascript*/

function findIndexOfMatches(theWordArg) {
  let indexHolder2 = [];

  theWordArg.forEach(function (element) {
    checkforExactMatch(myArray, element);

    function checkforExactMatch(arr, val) {
      for (i = 0; i < arr.length; i++) {
        if (arr[i] === val && arr[i] == theWordArg[i]) {
          updateMatchGreen(i);
          //  console.log(i);
        } else if (arr[i] === val) {
          /*   if (arr[i] == theWord[i]){
                console.log("green");
                updateMatchGreen(i);
            } */

          indexHolder2.push(i);
        }
      }
    }
  });
  uniqueArray = indexHolder2.filter(function (item, pos) {
    return indexHolder2.indexOf(item) == pos;
  });
  // console.log(uniqueArray);
  return uniqueArray;
}

/* Updating html*/

function updateMatchYellow(indexHolderArray) {
  for (let i = 0; i < indexHolderArray.length; i++) {
    let squareId = "#a" + scoreKeeper.row.toString() + "" + indexHolderArray[i];

    let tempSquare = document.querySelector(squareId);

    tempSquare.style.backgroundColor = "yellow";
  }
}

function updateMatchGreen(number) {
  let squareId = "#a" + scoreKeeper.row.toString() + "" + number;

  let tempSquare = document.querySelector(squareId);

  tempSquare.style.backgroundColor = "green";
}

function placeLetters(inputWord) {
  for (let i = 0; i < inputWord.length; i++) {
    let squareId = "#a" + scoreKeeper.row.toString() + "" + i;
    //  console.log(squareId);
    let tempLetterSquare = document.querySelector(squareId);

    tempLetterSquare.innerHTML = inputWord[i];
  }
}

/*game functioning*/

function checkForWin() {
  let score = 0;

  for (let i = 0; i < 5; i++) {
    let squareId = "#a" + scoreKeeper.row.toString() + "" + i;

    let tempSquare = document.querySelector(squareId);

    if (tempSquare.style.backgroundColor === "green") {
      //   console.log("found green");
      score++;
    }
    if (score == 5) {
      let score = scoreKeeper.row + 1;
      alert("you win in " + score);
      mainButton.removeEventListener("click", resetGame());

      //  resetGame();
    }
  }
}

function resetGame() {
  // console.log("reset");
  scoreKeeper.row = -1;

  resetBoardHtml();
  function resetBoardHtml() {
    let lettersList = document.querySelectorAll(".letters");
    lettersList.forEach((element) => {
      element.style.backgroundColor = "lightblue";
      element.innerText = "fuck";
    });
  }
  x = "";
  // mainButton.removeEventListener();
  asynFunction();
}
