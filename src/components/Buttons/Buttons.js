import React from "react"
import "./Buttons.css"

const Buttons = ({ insertLetterFunction, deleteLetterFunction, submitGuessFunction, colors }) => {

  const letterButtonStyle = (letter) => {
    return {
      margin: (letter === 'P' || letter === 'L') ? "0" : "0 6px 0 0",
      backgroundColor: colors[letter]
    }
  }

  return (
    <div className="keyboard">
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