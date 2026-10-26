import { useEffect, useCallback, useState, useMemo } from 'react'
import { initializeConflicts, calculateAllConflicts } from './services/conflictService.js';
import { initializeNotesBoard } from './services/notesService.js';
import { useUpdateCell } from './hooks/useUpdateCell.js';
import { useSudokuGame } from './hooks/useSudokuGame.js';
import Board from './layout/sudoku-board/Board.jsx'
import { BoardProvider } from './layout/sudoku-board/BoardProvider.jsx';
import './App.css'
import { moveCellSelection } from './services/navigationService.js';
import Numpad from './layout/controls-panel/Numpad.jsx';
import GameControls from './layout/controls-panel/GameControls.jsx';
import NewGame from './layout/controls-panel/NewGame.jsx';

export default function App() {

  const { initialPuzzle, boardValues, setBoardValues, generateNewGame } = useSudokuGame();
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0 });
  const [notesMode, setNotesMode] = useState(false);  
  const [notesBoard, setNotesBoard] = useState(initializeNotesBoard()); 

  const conflicts = useMemo(() => {
    if (!boardValues) return initializeConflicts();
    return calculateAllConflicts(boardValues);
  }, [boardValues]);

  const handleCellSelect = useCallback((rowIndex, columnIndex) => {
    setSelectedCell({ rowIndex, columnIndex });
  }, []);

  const handleMoveCellSelection = useCallback((direction) => {
    const newCell = moveCellSelection(direction, selectedCell);
    handleCellSelect(newCell.rowIndex, newCell.columnIndex);
  }, [selectedCell, handleCellSelect]);

  const updateCell = useUpdateCell(initialPuzzle, selectedCell, notesMode, setBoardValues, setNotesBoard);

  const handleNewGame = useCallback(() => {
    generateNewGame();
    handleCellSelect(0, 0);
  }, [generateNewGame, handleCellSelect]);

  const toggleNotesMode = useCallback(() => {
    setNotesMode(prev => !prev);
  }, []);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

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

  return (
    <div className="App">

      {boardValues && (
        <BoardProvider initialPuzzle={initialPuzzle} boardValues={boardValues} selectedCell={selectedCell} onSelectCell={handleCellSelect} conflicts={conflicts} notesBoard={notesBoard}>
          <Board />
        </BoardProvider>
      )}

      <GameControls updateCell={updateCell} notesMode={notesMode} toggleNotesMode={toggleNotesMode} />
      <Numpad updateCell={updateCell} />
      <NewGame onNewGame={handleNewGame} />

    </div>
  );

}

