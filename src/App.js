import React, { useState, useEffect } from "react";
import './App.css';

import Board from "./components/Board/Board"
import Buttons from "./components/Buttons/Buttons"

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
    } else {
      setPrevGuesses([])
      setGuess("")
      setEndGame(false)
      // KEYBOARD COLORS NOT RESETTING !!
    }
  }
  useKeyboard(insertLetter, submitGuess, deleteLetter)

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="GameBoard">
        <Board currentGuess={currentGuess} prevGuesses={prevGuesses}/>
      </div>
      <div className="ScreenKeyboard">
        <Buttons insertLetterFunction={(letter) => insertLetter(letter)} deleteLetterFunction={() => deleteLetter()} submitGuessFunction={() => submitGuess()} prevGuesses={prevGuesses}/>
      </div>
    </div>
  )
}

export default App;
