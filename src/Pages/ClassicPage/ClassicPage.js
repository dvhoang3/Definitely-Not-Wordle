import React, { useState, useEffect } from "react"
import './ClassicPage.css'

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { GREEN, YELLOW, DARKGRAY } from "../../colors"

import Board from "../../components/Board/Board"
import Buttons from "../../components/Buttons/Buttons"

import { getRandomWord, isPossibleWord } from "../../words/wordBank"
import { guess } from "../../logic/guess"

let answer = getRandomWord()

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

toast.configure()
function ClassicPage() {
  const [prevGuesses, setPrevGuesses] = useState([])
  const [currentGuess, setGuess] = useState("")
  const [colors, setColors] = useState({})
  const [endGame, setEndGame] = useState(false)

  const notifyInputError = (message) => {
    toast.error(message, {
      toastId: message,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored"
      });
  }
  const notifyEndGame = (message) => {
    toast.success(message, {
      toastId: message,
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored"
    })
  }

  const gameEnd = (win) => {
    setEndGame(true)
    if (win) {
      notifyEndGame('Win!! ... Press Enter to play Again')
    } else {
      notifyEndGame(`Lose!! The Answer was ${answer} ... Press Enter to play Again`)
    }
  }

  const updateColors = (guess, guessColors) => {
    if (prevGuesses === []) {
      setColors({})
      return
    }

    let newColors = {}
    for (let i=0; i < guess.length; ++i) {
      if (guessColors[i] === DARKGRAY) {
        if (colors[guess[i]] === undefined && newColors[guess[i]] === undefined) {
          newColors[guess[i]] = DARKGRAY
        }
      } else if (guessColors[i] === YELLOW) {
        if (colors[guess[i]] !== GREEN && newColors[guess[i]] !== GREEN) {
          newColors[guess[i]] = YELLOW
        }
      } else {
        newColors[guess[i]] = GREEN
      }
      
    }
    setColors({...colors, ...newColors})
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
      if (currentGuess.length !== 5) {
        // Shake Row -> update some state -> dont care if its true or false
        notifyInputError('5 LETTERS... its not that hard...')
        // Shake Row -> update some state -> dont care if its true or false
      } else if (!isPossibleWord(currentGuess)) {
        notifyInputError('Please Stop Making up Words...')
      } else {
        let guessColorResults = guess(currentGuess, answer)
        setPrevGuesses([...prevGuesses, [currentGuess, guessColorResults]])
        updateColors(currentGuess, guessColorResults)
        if (currentGuess === answer) {
          gameEnd(true)
        } else if (prevGuesses.length + 1 === 6) {
          gameEnd(false)
        }
        setGuess("")
      }
    } else {
      toast.dismiss()
      setPrevGuesses([])
      setGuess("")
      setEndGame(false)
      setColors({})
      answer = getRandomWord()
    }
  }
  useKeyboard(insertLetter, submitGuess, deleteLetter)

  return (
    <div className="Classic">
      <h1>Not Wordle</h1>
      <div className="GameBoard">
        <Board currentGuess={currentGuess} prevGuesses={prevGuesses}/>
      </div>
      <div className="ScreenKeyboard">
        <Buttons insertLetterFunction={(letter) => insertLetter(letter)} deleteLetterFunction={() => deleteLetter()} submitGuessFunction={() => submitGuess()} colors={colors}/>
      </div>
    </div>
  )
}

export default ClassicPage;
