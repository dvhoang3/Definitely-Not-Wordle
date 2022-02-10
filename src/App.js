import React, { useState } from "react";
import './App.css';

import { guess } from "./logic/guess"

function App() {
  let answer = "IDIOT"                          // TEMPORARY ANSWER

  const [prevGuesses, setPrevGuesses] = useState([])
  const [currentGuess, setGuess] = useState("")
  const [endGame, setEndGame] = useState(false)

  const gameEnd = (win) => {
    setEndGame(true)
    if (win) {
      console.log("WIN !!!")                    // WIN Screen
    } else {
      console.log("LOSE !!!")                   // LOSE Screen
    }
  }

  const insertLetter = (letter) => {
    if (currentGuess.length < 5 && !endGame) {
      setGuess(currentGuess + letter)
    }
  }
  const deleteLetter = () => {
    setGuess(currentGuess.slice(0, -1))
  }
  const submitGuess = () => {
    if (!endGame) {
      if (currentGuess.length === 5) {
        setPrevGuesses([...prevGuesses, [currentGuess, guess(currentGuess, answer)]])
        if (currentGuess === answer) {
          gameEnd(true)
        } else if (prevGuesses.length + 1 === 6) {
          gameEnd(false)
        }
        setGuess("")
      } else {
        console.log('Guess not lenght of 5')        // ALERT: word length not valid
      }
    }
  }

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return (
    <div className="App">
      <h1>Wordle Clone in Progress</h1>
      {alphabet.map(letter => <button key={letter} onClick={() => insertLetter(letter)}>{letter}</button>)}
      <button onClick={() => deleteLetter()}>Backspace</button>
      <button onClick={() => submitGuess()}>Enter</button>
      <h2>Guess: {currentGuess}</h2>
      {prevGuesses.map((prevGuess, index) => <h2 key={index}>{`${prevGuess[0]}: ${prevGuess[1]}`}</h2>)}
    </div>
  )
}

export default App;
