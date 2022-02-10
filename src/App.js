import React, { useState } from "react";
import './App.css';

function App() {
  const [currentGuess, setGuess] = useState("")
  const insertLetter = (letter) => {
    setGuess(currentGuess + letter)
  }
  const deleteLetter = () => {
    setGuess(currentGuess.slice(0, -1))
  }
  const submitGuess = () => {
    setGuess("")
  }

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return (
    <div className="App">
      <h1>Hello From React</h1>
      <h2>{currentGuess}</h2>
      <ul>
        {alphabet.map(letter => <li key={letter}><button onClick={() => insertLetter(letter)}>{letter}</button></li>)}
      </ul>
      <button onClick={() => deleteLetter()}>Backspace</button>
      <button onClick={() => submitGuess()}>Enter</button>
    </div>
  )
}

export default App;
