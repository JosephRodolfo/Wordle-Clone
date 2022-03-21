

class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.logLetters = this.logLetters.bind(this);
    this.renderLetters = this.renderLetters.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.wipeLetters = this.wipeLetters.bind(this);
    this.state = {
      array: [],
      value: false
  };
  }

  wipeLetters() {
    let t = [];
    this.setState({ array: t}, this.renderLetters);

  }

  logLetters(e) {
    getResponsiveFontSize();

    let t = e.target.value.toLowerCase();
    
    let lowerCaseT= t.split("");
    this.setState({ array: lowerCaseT }, this.renderLetters);
  }

  submitFunction(e) {
    this.wipeLetters();


    e.preventDefault();

    const inputValueTemp = this.inputValue.value;
    if(inputValueTemp.length > 0){

        this.inputValue.value = '';     
    } 
    let holder = this.state.array.join("").toLowerCase();

    if (validateGuess(holder, parseInt(scoreKeeper.numberOfLettersInWord))) {
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
              this.wipeLetters();

        //resetGame();
        overlayAlert(`You won in <span id='nonCoco'>${scoreKeeper.row}</span>`, resetGame());
      }
      if (checkForLoss(scoreKeeper.row)) {
        this.wipeLetters();

        //  resetGame();
        overlayAlert(
          `You lost! The word was ${scoreKeeper.theWordleWord}`,
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
        <button type="submit" disabled={this.state.value} className="button" id="button-guess">
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


    if(this.state.array.length<scoreKeeper.theWordleWord.length){


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
    }  } 

    if (e.target.innerText=== "Back"){
      this.setState((prevState) => {
        return {
          array: prevState.array.slice(0, -1),
        };
      }, this.renderLetters);


    }
    
     if(e.target.innerText=== "Enter")  {
      


  
      let holder = this.state.array.join("").toLowerCase();
  
      if (validateGuess(holder, parseInt(scoreKeeper.numberOfLettersInWord))) {
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
          overlayAlert(`You won in <span id='nonCoco'>${scoreKeeper.row}</span>`, resetGame());
        }
        if (checkForLoss(scoreKeeper.row)) {
          overlayAlert(
            `You lost! The word was ${scoreKeeper.theWordleWord}`,
            resetGame()
          );        }
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
          <div className="key-q keyboard-letters button">q</div>
          <div className="key-w keyboard-letters button">w</div>
          <div className="key-e keyboard-letters button">e</div>
          <div className="key-r keyboard-letters button">r</div>
          <div className="key-t keyboard-letters button">t</div>
          <div className="key-y keyboard-letters button">y</div>
          <div className="key-u keyboard-letters button">u</div>
          <div className="key-i keyboard-letters button">i</div>
          <div className="key-o keyboard-letters button">o</div>
          <div className="key-p keyboard-letters button">p</div>
        </div>
        <div className="keyboard-row">
          <div className="key-a keyboard-letters button">a</div>
          <div className="key-s keyboard-letters button">s</div>
          <div className="key-d keyboard-letters button">d</div>
          <div className="key-f keyboard-letters button">f</div>
          <div className="key-g keyboard-letters button">g</div>
          <div className="key-h keyboard-letters button">h</div>
          <div className="key-j keyboard-letters button">j</div>
          <div className="key-k keyboard-letters button">k</div>
          <div className="key-l keyboard-letters button">l</div>
        </div>
        <div className="keyboard-row">
          <div className="key-backspace keyboard-letters button">Back</div>
          <div className="key-z keyboard-letters button">z</div>
          <div className="key-x keyboard-letters button">x</div>
          <div className="key-c keyboard-letters button">c</div>
          <div className="key-v keyboard-letters button">v</div>
          <div className="key-b keyboard-letters button">b</div>
          <div className="key-n keyboard-letters button">n</div>
          <div className="key-m keyboard-letters button">m</div>
          <div className="key-enter keyboard-letters button">Enter</div>
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