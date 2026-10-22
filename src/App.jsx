import { useEffect, useCallback, useState } from 'react'
import { calculateSquareIndex } from './services/navigationService.js';
import Board from './layout/sudoku-board/Board.jsx'
import { BoardProvider } from './layout/sudoku-board/BoardContext.jsx';
import './App.css'
import { useSudokuGame } from './hooks/useSudokuGame.js';
import { isCellEditable } from './services/cellService.js';
import { moveCellSelection } from './services/navigationService.js';

export default function App() {

  const { initialPuzzle, boardValues, setBoardValues, generateNewGame } = useSudokuGame();
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0, squareIndex: calculateSquareIndex(0, 0) });

  const handleCellSelect = useCallback((rowIndex, columnIndex) => {
    setSelectedCell({ rowIndex, columnIndex, squareIndex: calculateSquareIndex(rowIndex, columnIndex) });
  }, []);

  const updateCell = useCallback((value) => {

    if (isCellEditable(initialPuzzle, selectedCell.rowIndex, selectedCell.columnIndex)) {

      setBoardValues(prevBoard => {
        const newBoard = structuredClone(prevBoard);
        newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = value;
        return newBoard;
      });

    }

  }, [initialPuzzle, selectedCell, setBoardValues]);

  const handleMoveCellSelection = useCallback((direction) => {

    const newCell = moveCellSelection(direction, selectedCell);
    handleCellSelect(newCell.rowIndex, newCell.columnIndex);

  }, [selectedCell, handleCellSelect]);

  useEffect(() => {
    generateNewGame();
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
      {boardValues && (
        <BoardProvider initialPuzzle={initialPuzzle} boardValues={boardValues} selectedCell={selectedCell} onSelectCell={handleCellSelect} >
          <Board />
        </BoardProvider>
      )}
      {/* <div className="new-game-section">
        <button onClick={handleNewGame} className="new-game-button">New Game</button>
      </div> */}
    </div>
  );

}

