//validateGuess function, takes the input word as string and length of the secret word and
//returns true or false if it is correct number of letters and not non-letter chars

export function validateGuess(guessWord, length) {
  let numberOfLetters = length;

  if (alphaOnly(guessWord) && checkLength(guessWord, numberOfLetters)) {
    console.log("word okay");
    return true;
  } else {
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
        console.log("letter okay");
      } else {
        return false;
      }
    }
  }

  function checkLength(input, lengthOfWord) {
    return input.length === lengthOfWord;
  }
}
