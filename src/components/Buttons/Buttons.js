import React, { useState, useEffect } from "react"
import "./Buttons.css"

import { GREEN, YELLOW, DARKGRAY } from "../../colors"

const Buttons = ({ insertLetterFunction, deleteLetterFunction, submitGuessFunction, prevGuesses }) => {
  const [colors, setColors] = useState({})
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

  useEffect(() => {
    if (prevGuesses.length > 0) {
      updateColors(prevGuesses[prevGuesses.length - 1][0], prevGuesses[prevGuesses.length - 1][1])
    }
  }, [prevGuesses])

  const letterButtonStyle = (letter) => {
    return {
      margin: (letter === 'P' || letter === 'L') ? "0" : "0 6px 0 0",
      backgroundColor: colors[letter]
    }
  }

  return (
    <div>
      <div className="rows">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter =>
          <button className="screenButton" tabIndex={-1} key={letter}
          style={letterButtonStyle(letter)}
          onClick={() => insertLetterFunction(letter)}>{letter}</button>
        )}
      </div>
      <div className="rows">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter =>
          <button className="screenButton" tabIndex={-1} key={letter}
          style={letterButtonStyle(letter)}
          onClick={() => insertLetterFunction(letter)}>{letter}</button>)}
      </div>

      <div className="rows">
        <button className="screenButtonEnter" tabIndex={-1} onClick={() => submitGuessFunction()}>ENTER</button>

        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter =>
          <button className="screenButton" tabIndex={-1} key={letter}
          style={letterButtonStyle(letter)}
          onClick={() => insertLetterFunction(letter)}>{letter}</button>
        )}

        <button className="screenButtonDelete" tabIndex={-1} onClick={() => deleteLetterFunction()}>
          <svg width="24" height="18" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.625 0.0899963L0 17.09L10.625 34.09H44.18V0.0899963H10.625V0.0899963ZM42.18 32.09H11.734L2.359 17.09L11.734 2.09H42.18V32.09Z" fill="black"/>
            <path d="M18.887 25.797L26.18 18.504L33.473 25.797L34.887 24.383L27.594 17.09L34.887 9.797L33.473 8.383L26.18 15.676L18.887 8.383L17.473 9.797L24.766 17.09L17.473 24.383L18.887 25.797Z" fill="black"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Buttons