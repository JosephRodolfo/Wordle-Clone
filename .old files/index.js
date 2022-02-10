


let scoreKeeper = {
  score: 0,
  row: -1,

};



var myArray = "";
let mainButton = document.getElementById("button-main");
//var theWord = "karen".split("");



fetch("sgb-words.txt")
  .then((res) => res.text())
  .then((res) => {
    var allWords = res.split("\n");

    var r = Math.floor(Math.random() * allWords.length);

    //Get random line
    var line = allWords[r];
    //console.log(typeof line.toString());
    testWord = line.toString();
    return testWord;
  })
  .then((res) => {
    mainButton.addEventListener("click", function () {
      console.log(res);
      var theWord = res.split("");

      scoreKeeper.row++;
      let wordGuess = document.getElementById("word-guess");
      //document.getElementById("demo").innerHTML = "Hello World";
      // let x = mainButton.value;
      let holder = wordGuess.value;
      myArray = holder.split("");
      updateMatchYellow(findIndexOfMatches(theWord));
      // console.log(myArray);
      placeLetters(myArray);
      checkForWin();
    });
  });

/*  Comparing arrays javascript*/

function findIndexOfMatches(theWordArg) {
  let indexHolder2 = [];

  theWordArg.forEach(function (element) {
    checkforExactMatch(myArray, element);

    function checkforExactMatch(arr, val) {
      for (i = 0; i < arr.length; i++) {
        if (arr[i] === val && arr[i] == theWordArg[i]) {
          updateMatchGreen(i);
          console.log(i);
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
  console.log(uniqueArray);
  return uniqueArray;
}

/* Updating html*/

function updateMatchYellow(indexHolderArray) {
  for (let i = 0; i < indexHolderArray.length; i++) {
    let squareId = "#a" + scoreKeeper.row + "" + indexHolderArray[i];

    let tempSquare = document.querySelector(squareId);

    tempSquare.style.backgroundColor = "yellow";
  }
}

function updateMatchGreen(number) {
  let squareId = "#a" + scoreKeeper.row + "" + number;

  let tempSquare = document.querySelector(squareId);

  tempSquare.style.backgroundColor = "green";
}

function placeLetters(inputWord) {
  for (let i = 0; i < inputWord.length; i++) {
    let squareId = "#a" + scoreKeeper.row + "" + i;
    //  console.log(squareId);
    let tempLetterSquare = document.querySelector(squareId);

    tempLetterSquare.innerHTML = inputWord[i];
  }
}

/*game functioning*/

function checkForWin() {
  let score = 0;

  for (let i = 0; i < 5; i++) {
    let squareId = "#a" + scoreKeeper.row + "" + i;

    let tempSquare = document.querySelector(squareId);

    if (tempSquare.style.backgroundColor === "green") {
      console.log("found green");
      score++;
    }
    if (score == 5) {
      let score = scoreKeeper.row + 1;
      alert("you win in " + score);
      resetGame();
    }
  }
}

function resetGame() {
  scoreKeeper.row = -1;
  let lettersList = document.querySelectorAll(".letters");
  lettersList.forEach((element) => {
    element.style.backgroundColor = "lightblue";
    element.innerHTML = "";
  });
}
