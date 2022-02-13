import React from "react"
import "./Row.css"

import Square from "./Square/Square"

const Row = ({ word, colors }) => {  
  return (
    <div className="row">
      {[0, 1, 2, 3, 4].map(index =>
        <Square key={index}
        letter={(word !== undefined) ? word[index] : ""}
        color={colors !== undefined ? colors[index] : undefined}
        />
      )}
    </div>
  )
}

export default Row