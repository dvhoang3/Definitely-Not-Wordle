import React from "react"
import "./Board.css"

import Row from "./Row/Row"

const Board = ({ currentGuess, prevGuesses }) => {
  return (
    <div className="board">
      {[0,1,2,3,4,5].map(index => 
        <Row key={index}
        word = {
          (index === prevGuesses.length) ? currentGuess :
          ((prevGuesses[index] !== undefined) ? prevGuesses[index][0] : undefined)
        }
        colors = {
          (prevGuesses[index] !== undefined) ? prevGuesses[index][1] : undefined
        }
        />
      )}
    </div>
  )
}

export default Board