

class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.logLetters = this.logLetters.bind(this);
    this.renderLetters = this.renderLetters.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.wipeLetters = this.wipeLetters.bind(this);
    this.state = {
      array: [],
  };
  }

  wipeLetters() {
    let t = [];
    this.setState({ array: t}, this.renderLetters);

  }

  logLetters(e) {
    getResponsiveFontSize();

    let t = e.target.value.split("");
    this.setState({ array: t }, this.renderLetters);
  }

  submitFunction(e) {

    e.preventDefault();

    const inputValueTemp = this.inputValue.value;
    if(inputValueTemp.length > 0){

        this.inputValue.value = '';     //here

    } 
   // let wordGuess = document.getElementById("word-guess");
    let holder = this.state.array.join("");
//    wordGuess.value = "";

    if (validateGuess(holder, scoreKeeper.numberOfLettersInWord)) {
      var theWord = scoreKeeper.theWordleWord.split("");
      scoreKeeper.row++;

      scoreKeeper.theGuess = holder.split("");
      updateBoard(findIndex(theWord, scoreKeeper.theGuess), scoreKeeper.row);
      updateKeyboard(
        findIndex(theWord, scoreKeeper.theGuess),
        scoreKeeper.theGuess,
        theWord
      );
      placeLetters(scoreKeeper.theGuess);
      if (checkForWin(theWord.length)) {
        //resetGame();
        overlayAlert("You won in " + scoreKeeper.row, resetGame());
      }
      if (checkForLoss(scoreKeeper.row)) {
        //  resetGame();
        overlayAlert(
          "You lost! The word was " + scoreKeeper.theWordleWord,
          resetGame()
        );
      }
    } else {
      this.wipeLetters();

      return;
    }
  }

  renderLetters() {
    for (let i = 0; i < scoreKeeper.theWordleWord.length; i++) {
      let squareId = "#b" + (scoreKeeper.row + 1) + "" + (i + 1);
      ReactDOM.render(
        <LetterGuesses letterToShow={this.state["array"][i]} />,
        document.querySelector(squareId)
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.submitFunction}>
      

        <input type="text"  ref= {el => this.inputValue = el}  id="word-guess" onChange={this.logLetters} />
        <button type="submit" className="button" id="button-guess">
          Submit
        </button>
      </form>
    );
  }
}

class LetterGuesses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.letterToShow} </div>;
  }
}
class KeyBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentKey = this.getCurrentKey.bind(this);
    this.renderLetters = this.renderLetters.bind(this);
    this.wipeLetters = this.wipeLetters.bind(this);


    this.state = {
      array: [],
    };
  }

  renderLetters() {
    for (let i = 0; i < scoreKeeper.theWordleWord.length; i++) {
      let squareId = "#b" + (scoreKeeper.row + 1) + "" + (i + 1);
      ReactDOM.render(
        <LetterGuesses letterToShow={this.state["array"][i]} />,
        document.querySelector(squareId)
      );
    }
  }

  wipeLetters() {
    let t = [];
    this.setState({ array: t }, this.renderLetters);
  }

  getCurrentKey(e) {
    if (e.target.innerText.length === 1) {
      getResponsiveFontSize();

      let t = e.target.innerText;

      /* this.setState((prevState)=>{

      return {array: prevState.array.concat(t)}
    })*/
      //this.setState({ array: t }, this.renderLetters);

      this.setState((prevState) => {
        return {
          array: prevState.array.concat(t),
        };
      }, this.renderLetters);
    } else if (e.target.innerText== "Back"){
      this.setState((prevState) => {
        return {
          array: prevState.array.slice(0, -1),
        };
      }, this.renderLetters);


    } 
    
    else if(e.target.innerText=== "Enter")  {
      

    /*  let wordGuess = document.getElementById("word-guess");
      let holder = wordGuess.value;
      wordGuess.value = "";*/
      let holder = this.state.array.join("").toLowerCase();
  
      if (validateGuess(holder, scoreKeeper.numberOfLettersInWord)) {
        var theWord = scoreKeeper.theWordleWord.split("");
        scoreKeeper.row++;
      this.wipeLetters();
        scoreKeeper.theGuess = holder.split("");
      
        updateBoard(findIndex(theWord, scoreKeeper.theGuess), scoreKeeper.row);
       updateKeyboard(
          findIndex(theWord, scoreKeeper.theGuess),
          scoreKeeper.theGuess,
          theWord
        );
        placeLetters(scoreKeeper.theGuess);
        if (checkForWin(theWord.length)) {
          overlayAlert("You won in " + scoreKeeper.row, resetGame());
        }
        if (checkForLoss(scoreKeeper.row)) {
          overlayAlert(
            "You lost! The word was " + scoreKeeper.theWordleWord,
            resetGame()
          );
        }
      } else {
        this.wipeLetters();
  
        return;
      }
    


    } else {return;}
  }

  render() {
    return (
      <div onClick={this.getCurrentKey}>
        <div className="keyboard-row">
          <div className="key-q keyboard-letters">q</div>
          <div className="key-w keyboard-letters">w</div>
          <div className="key-e keyboard-letters">e</div>
          <div className="key-r keyboard-letters">r</div>
          <div className="key-t keyboard-letters">t</div>
          <div className="key-y keyboard-letters">y</div>
          <div className="key-u keyboard-letters">u</div>
          <div className="key-i keyboard-letters">i</div>
          <div className="key-o keyboard-letters">o</div>
          <div className="key-p keyboard-letters">p</div>
        </div>
        <div className="keyboard-row">
          <div className="key-a keyboard-letters">a</div>
          <div className="key-s keyboard-letters">s</div>
          <div className="key-d keyboard-letters">d</div>
          <div className="key-f keyboard-letters">f</div>
          <div className="key-g keyboard-letters">g</div>
          <div className="key-h keyboard-letters">h</div>
          <div className="key-j keyboard-letters">j</div>
          <div className="key-k keyboard-letters">k</div>
          <div className="key-l keyboard-letters">l</div>
        </div>
        <div className="keyboard-row">
          <div className="key-backspace keyboard-letters">Back</div>
          <div className="key-z keyboard-letters">z</div>
          <div className="key-x keyboard-letters">x</div>
          <div className="key-c keyboard-letters">c</div>
          <div className="key-v keyboard-letters">v</div>
          <div className="key-b keyboard-letters">b</div>
          <div className="key-n keyboard-letters">n</div>
          <div className="key-m keyboard-letters">m</div>
          <div className="key-enter keyboard-letters">Enter</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <KeyBoardContainer />,
  document.getElementById("keyboard-container")
);

ReactDOM.render(
  <WordInput />,
  document.getElementById("word-guess-input-container")
);