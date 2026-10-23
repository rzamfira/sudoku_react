import { useEffect, useCallback, useState, useMemo } from 'react'
import { initializeConflicts, updateConflicts } from './services/conflictService.js';
import Board from './layout/sudoku-board/Board.jsx'
import { BoardProvider } from './layout/sudoku-board/BoardContext.jsx';
import './App.css'
import { useSudokuGame } from './hooks/useSudokuGame.js';
import { isCellEditable } from './services/cellService.js';
import { moveCellSelection } from './services/navigationService.js';
import Numpad from './layout/controls-panel/Numpad.jsx';
import GameControls from './layout/controls-panel/GameControls.jsx';
import NewGame from './layout/controls-panel/NewGame.jsx';

export default function App() {

  const { initialPuzzle, boardValues, setBoardValues, generateNewGame } = useSudokuGame();
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0 });
  const [conflicts, setConflicts] = useState(initializeConflicts());

  const handleCellSelect = useCallback((rowIndex, columnIndex) => {
    setSelectedCell({ rowIndex, columnIndex });
  }, []);

  const handleMoveCellSelection = useCallback((direction) => {
    const newCell = moveCellSelection(direction, selectedCell);
    handleCellSelect(newCell.rowIndex, newCell.columnIndex);
  }, [selectedCell, handleCellSelect]);

  const updateCell = useCallback((value) => {

    if (isCellEditable(initialPuzzle, selectedCell.rowIndex, selectedCell.columnIndex)) {

      setBoardValues(prevBoard => {
        const newBoard = structuredClone(prevBoard);
        newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = value;
        // should i keep here the update of the conflicts? but then the function would not be pure
        return newBoard;
      });

    }

  }, [initialPuzzle, selectedCell, setBoardValues, setConflicts]);

  const handleNewGame = useCallback(() => {
    setConflicts(initializeConflicts());
    generateNewGame();
    handleCellSelect(0, 0);
  }, [generateNewGame, handleCellSelect, setConflicts]);

  useEffect(() => {
    generateNewGame();
  }, []);

  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        updateCell(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        updateCell('.');
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        handleMoveCellSelection(e.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [updateCell, handleMoveCellSelection]);

  useEffect(() => {
    if (!boardValues) return;
    setConflicts(prev => updateConflicts(prev, selectedCell, boardValues));
  }, [boardValues]);

  return (
    <div className="App">

      {boardValues && (
        <BoardProvider initialPuzzle={initialPuzzle} boardValues={boardValues} selectedCell={selectedCell} onSelectCell={handleCellSelect} conflicts={conflicts} >
          <Board />
        </BoardProvider>
      )}

      <GameControls updateCell={updateCell} />
      <Numpad updateCell={updateCell} />
      <NewGame onNewGame={handleNewGame} />

    </div>
  );

}

