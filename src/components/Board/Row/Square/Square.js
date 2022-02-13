import React from "react"
import './Square.css'

const Square = ({ letter, color }) => {
  return (
    <div className="square" style={(color !== undefined) ? {backgroundColor: color, color: "white"} : {backgroundColor: "white"}} >{letter}</div>
  )
}

export default Square