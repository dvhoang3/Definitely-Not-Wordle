import React from "react"
import "./Row.css"

import Square from "./Square/Square"

const Row = (props) => {
  let word = (props.word !== undefined ? props.word : "")
  let colors = props.colors
  
  return (
    <div className="row">
      {[0, 1, 2, 3, 4].map(index =>
        <Square key={index}
        letter={word[index]}
        color={colors !== undefined ? colors[index] : undefined}
        />
      )}
    </div>
  )
}

export default Row