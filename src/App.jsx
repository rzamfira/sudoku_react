import { useContext, useEffect } from 'react'
import Board from './features/sudoku_board/Board.jsx'
import './App.css'
import { SudokuContext } from './features/SudokuContext.jsx';
import { isCellEditable } from './features/sudoku_board/board-utils.js';
import { useMemo } from 'react';

export default function App() {

  const { generateNewGame, selectedCell, initialPuzzle, updateCell } = useContext(SudokuContext);

  const isEditable = useMemo(() =>
    isCellEditable(initialPuzzle, selectedCell),
    [initialPuzzle, selectedCell]
  );

  useEffect(() => {  // i should manage the events somewhere else, and here just call the functions?

    const handleKeyDown = (e) => {
      if (isEditable) {
        if (e.key >= '1' && e.key <= '9') {
          updateCell(selectedCell, e.key);
        }
        if (e.key === 'Backspace' || e.key === 'Delete') {
          updateCell(selectedCell, '');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [isEditable, selectedCell, updateCell]);

  return (

    <div className="App">

      <Board />

      <div className="controls">
        <button onClick={generateNewGame} className="new-game-button">New Game</button>
      </div>

    </div>

  );

}

