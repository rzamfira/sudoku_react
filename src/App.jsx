import { useState, useEffect } from 'react'
import Board from './Board'
import './App.css'

function App() {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    if (window.sudoku) {
      const puzzleString = window.sudoku.generate('medium');
      const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
      setPuzzle(puzzleGrid);
    }
  }, []);

  return (
    <div className="App">
      {puzzle ? (
        <Board puzzle={puzzle} />
      ) : (
        <p>Loading puzzle...</p>
      )}
    </div>
  )
}

export default App
