import { useEffect, useCallback, useState } from 'react'
import Board from './layout/sudoku-board/Board.jsx'
import './App.css'
import { useGameGeneration } from './game-actions/useGameGeneration.js';
import { isCellEditable } from './board-utils/cellState.js';
import { moveCellSelection } from './board-utils/navigationOperations.js';

export default function App() {

  const { initialPuzzle, userBoard, setUserBoard, generateNewGame } = useGameGeneration();
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });

  const onCellSelect = useCallback((rowIndex, columnIndex, squareIndex) => {
    setSelectedCell({ rowIndex, columnIndex, squareIndex });
  }, []);

  const updateCell = useCallback((value) => {  // should I define this inside the game-actions as well?

    if (isCellEditable(initialPuzzle, selectedCell)) {

      setUserBoard(prevBoard => {
        const newBoard = prevBoard.map(row => [...row]);
        newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = value;
        return newBoard;
      });

    }

  }, [initialPuzzle, selectedCell, setUserBoard]);

  const handleMoveCellSelection = useCallback((direction) => {

    const newCell = moveCellSelection(direction, selectedCell);
    onCellSelect(newCell.rowIndex, newCell.columnIndex, newCell.squareIndex);

  }, [selectedCell, onCellSelect]);

  useEffect(() => {

    if (window.sudoku) {
      generateNewGame();
    }

  }, []);

  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        updateCell(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        updateCell('');
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        handleMoveCellSelection(e.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [updateCell, handleMoveCellSelection]);

  // const handleNewGame = useCallback(() => {
  //   generateNewGame();
  //   onCellSelect(0, 0, 1);
  // }, [generateNewGame, onCellSelect]);

  return (
    <div className="App">
      <Board
        userBoard={userBoard}
        selectedCell={selectedCell}
        onSelectCell={onCellSelect}
      />
      {/* <div className="new-game-section">
        <button onClick={handleNewGame} className="new-game-button">New Game</button>
      </div> */}
    </div>
  );

}

