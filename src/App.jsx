import { useContext, useEffect } from 'react'
import Board from './features/sudoku_board/Board.jsx'
import './App.css'
import { SudokuContext } from './features/SudokuContext.jsx';
import { isCellEditable } from './features/sudoku_board/board-utils.js';

export default function App() {

  const { generateNewGame, selectedCell, initialPuzzle, updateCell } = useContext(SudokuContext);

  useEffect(() => {

    const handleKeyDown = (e) => {
      if (isCellEditable(initialPuzzle, selectedCell)) {
        if (e.key >= '1' && e.key <= '9') {
          updateCell(e.key);
        }
        if (e.key === 'Backspace' || e.key === 'Delete') {
          updateCell('');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [selectedCell, updateCell]);

  return (

    <div className="App">

      <Board />

      <div className="controls">
        <button onClick={generateNewGame} className="new-game-button">New Game</button>
      </div>

    </div>

  );

}

