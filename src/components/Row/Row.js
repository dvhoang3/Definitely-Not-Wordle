import React from "react"
import "./Row.css"

import Square from "../Square/Square"

const Row = (props) => {
  return (
    <div className="row">
      <Square letter="A"/>
      <Square letter="B"/>
      <Square letter="C"/>
      <Square letter="D"/>
      <Square letter="E"/>
    </div>
  )
}

export default Row