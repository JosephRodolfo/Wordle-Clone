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

  wipeLetters(){

    let t = [];
    this.setState({ array: t }, this.renderLetters);

  }

  logLetters(e) {
    getResponsiveFontSize();

    let t = e.target.value.split("");
    this.setState({ array: t }, this.renderLetters);
  }

  submitFunction(e) {
    e.preventDefault();
    let wordGuess = document.getElementById("word-guess");
    let holder = wordGuess.value;
    wordGuess.value = "";

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
        <button type="submit" className="button" id="button-guess">
          Submit
        </button>

        <input type="text" id="word-guess" onChange={this.logLetters} />
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

ReactDOM.render(
  <WordInput />,
  document.getElementById("word-guess-input-container")
);
