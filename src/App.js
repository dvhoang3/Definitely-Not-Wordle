import React, { useState, useEffect } from "react";
import './App.css';
import Board from "./components/Board/Board"

import { guess } from "./logic/guess"

function useKeyboard(alphaCallback, enterCallback, deleteCallback) {
  useEffect(() => {
    function handle(event) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        alphaCallback(String.fromCharCode(event.keyCode))
      } else if (event.keyCode === 13) {
        enterCallback()
      } else if (event.keyCode === 8) {
        deleteCallback()
      }
    }
    document.addEventListener("keydown", handle)
    return () => document.removeEventListener("keydown", handle)
  })
}

function App() {
  let answer = "IDIOT"                          // TEMPORARY ANSWER

  const [prevGuesses, setPrevGuesses] = useState([])
  const [currentGuess, setGuess] = useState("")
  const [endGame, setEndGame] = useState(false)

  const gameEnd = (win) => {
    setEndGame(true)
    if (win) {
      console.log("WIN !!!")                    //TODO:: WIN Screen
    } else {
      console.log("LOSE !!!")                   //TODO:: LOSE Screen
    }
  }

  const insertLetter = (letter) => {
    if (currentGuess.length < 5 && !endGame) {
      setGuess(currentGuess + letter)
    }
  }
  const deleteLetter = () => {
    if (!endGame) {
      setGuess(currentGuess.slice(0, -1))
    }
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
        console.log('Guess not lenght of 5')        // TODO:: alert: word length not valid
      }
    }
  }
  useKeyboard(insertLetter, submitGuess, deleteLetter)

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      {alphabet.map(letter => <button key={letter} onClick={() => insertLetter(letter)}>{letter}</button>)}
      <button onClick={() => deleteLetter()}>Backspace</button>
      <button onClick={() => submitGuess()}>Enter</button>
      <Board currentGuess={currentGuess} prevGuesses={prevGuesses}/>
    </div>
  )
}

export default App;
