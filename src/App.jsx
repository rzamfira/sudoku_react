import { useState } from 'react'

import './App.css'

function App() {

  const [puzzle, setPuzzle] = useState(() => sudoku.generate('medium'));

  console.log(sudoku.board_string_to_grid(puzzle));

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div className="card">
        <button onClick={() => setPuzzle(sudoku.generate('medium'))}>
          New Game
        </button>
      </div>
    </div>
  )
}

export default App
