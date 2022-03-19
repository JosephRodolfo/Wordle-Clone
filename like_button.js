class WordInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.logLetters = this.logLetters.bind(this);
    this.renderLetters= this.renderLetters.bind(this);
    this.state = {
      array: [],
    };
  }

  logLetters(e) {
    getResponsiveFontSize();

 
    
    let t = e.target.value.split("");
    this.setState({array: t}, this.renderLetters);
   
  

  };

  
  renderLetters(){


    for (let i = 0; i < this.state.array.length; i++) {

      let squareId = "#b" + (scoreKeeper.row + 1) + "" + (i + 1);
      ReactDOM.render(
        <LetterGuesses
          letterToShow={this.state["array"][i]}
        />,
        document.querySelector(squareId)
      );
    }
  }

  render() {
    return <input type="text" id="word-guess" onChange={this.logLetters} />;
    
  }
}

class LetterGuesses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
      <div>{this.props.letterToShow}  </div>
    );
  }
}

ReactDOM.render(
  <WordInput />,
  document.getElementById("word-guess-input-container")
);


