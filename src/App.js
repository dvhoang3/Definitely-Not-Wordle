import React, { useEffect } from "react";
import './App.css';

function App() {
  // Word state
  

  // handle alphabet key press
  useEffect(() => {
    const handleAlpha = (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        //String.fromCharCode(event.keyCode)
        console.log(String.fromCharCode(event.keyCode))
      }
    }
    window.addEventListener('keydown', handleAlpha);
    return () => window.removeEventListener('keydown', handleAlpha)
  }, [])

  // handle enter key press
  useEffect(() => {
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
          console.log("Enter: Clear Everything!")
      }
    }
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter)
  }, [])

  // handle backspace key press
  useEffect(() => {
    const handleEnter = (event) => {
        if (event.keyCode === 8) {
          console.log("Backspace: Clear most recent letter added!")
      }
    }
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter)
  }, [])

  return (
    <div className="App">
      <h1>Hello From React</h1>
    </div>
  );
}

export default App;
