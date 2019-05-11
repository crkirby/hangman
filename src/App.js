import React from 'react';
import Hangman from './components/Hangman';
import LetterBank from './components/LetterBank';
import HiddenPhrase from './components/HiddenPhrase';
import { commerce } from 'faker'
import './App.css';

export default class App extends React.Component {
  state = {
    availableLetters: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
      'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    hiddenWord: null,
    word: null,
    wrongAttempts: 0
  }

  componentWillMount() {
    const word = commerce.productName()
    const hiddenWord = word.split('').map(ch => {
      return ch === ' ' ? ' ' : '_'
    })
    this.setState({ hiddenWord, word })
  }

  componentDidMount() {
    document.body.addEventListener('keyup', this.handleKeyUp)
  }
  
  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handleKeyUp)
  }
  
  countOccurences = (word, ch) => {
    const occurences = []
    word.forEach((letter, index) => {
      if (letter.match(ch)) {
        occurences.push(index)
      }
    })
    return occurences
  }
  
  handleKeyUp = ({ key }) => {
    if (this.state.availableLetters.includes(key.toUpperCase())) {
      this.updateByKey(key)
    }
  }

  isGameOver = () => this.state.hiddenWord.join('').toUpperCase() === this.state.word.toUpperCase() || this.state.wrongAttempts === 6

  updateByKey = key => {
    if(!this.isGameOver()){
      const lastLetter = key.toUpperCase()
      let { availableLetters, hiddenWord, word, wrongAttempts } = this.state

      availableLetters = availableLetters.filter(w => !w.match(lastLetter))
      hiddenWord = hiddenWord.slice()
      word = word.slice().toUpperCase().split('')

      const occurences = this.countOccurences(word, lastLetter)
      if (occurences.length === 0) {
        wrongAttempts = wrongAttempts + 1
      } else {
        occurences.forEach(occurence => hiddenWord.splice(occurence, 1, lastLetter))
      }
      this.setState({ availableLetters, hiddenWord, wrongAttempts })
    }
  }

  render() {
    const { availableLetters, hiddenWord, wrongAttempts } = this.state
    const letterBank = availableLetters.join(' ')
    const hangmansLife = `../img/${wrongAttempts}.png`

    return (
      <div className="App">
        <header className="App-header">
          <div className="box box4">
            <h3 id="category">Fake Products</h3>
          </div>
          <div className="grid2x2">
            <div className="box box1">
              <Hangman image={hangmansLife} />
            </div>
            <div className="box box2">
              <LetterBank bank={letterBank} />
            </div>
          </div>
          <div className="box box3">
            <HiddenPhrase phrase={hiddenWord} />
          </div>
        </header>
      </div>
    );
  }
}
