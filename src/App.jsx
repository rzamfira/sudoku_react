import { useEffect, useCallback, useState, useMemo } from 'react'
import { initializeConflicts, calculateAllConflicts } from './services/conflictService.js';
import { initializeNotesBoard } from './services/notesService.js';
import { useUpdateCell } from './hooks/useUpdateCell.js';
import { useTimer } from './hooks/useTimer.js';
import { useSudokuGame } from './hooks/useSudokuGame.js';
import Board from './layout/sudoku-board/Board.jsx'
import { BoardProvider } from './layout/sudoku-board/BoardProvider.jsx';
import './App.css'
import { moveCellSelection } from './services/navigationService.js';
import Numpad from './layout/controls-panel/Numpad.jsx';
import GameControls from './layout/controls-panel/GameControls.jsx';
import NewGame from './layout/controls-panel/NewGame.jsx';
import Timer from './layout/controls-panel/Timer.jsx';

export default function App() {

  const { initialPuzzle, boardValues, setBoardValues, generateNewGame } = useSudokuGame();
  const { elapsedTime, isPaused, togglePause, resetTimer } = useTimer();
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0 });
  const [notesMode, setNotesMode] = useState(false);
  const [notesBoard, setNotesBoard] = useState(initializeNotesBoard());

  const [history, setHistory] = useState([]);
  const recordHistory = useCallback(() => {

    setHistory(prev => [...prev, {
      boardValues: structuredClone(boardValues),
      notesBoard: structuredClone(notesBoard),
      selectedCell
    }]);

  }, [boardValues, notesBoard, selectedCell]);

  const updateCell = useUpdateCell(initialPuzzle, selectedCell, notesMode, setBoardValues, setNotesBoard, recordHistory);

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

  const handleNewGame = useCallback(() => {

    generateNewGame();
    handleCellSelect(0, 0);
    setHistory([]);
    setNotesBoard(initializeNotesBoard());
    resetTimer();

  }, [generateNewGame, handleCellSelect, resetTimer]);

  const toggleNotesMode = useCallback(() => {
    setNotesMode(prev => !prev);
  }, []);

  const handleUndo = useCallback(() => {

    if (history.length === 0) {
      return;
    }

    const lastState = history[history.length - 1];
    setBoardValues(lastState.boardValues);
    setNotesBoard(lastState.notesBoard);
    setSelectedCell(lastState.selectedCell);

    setHistory(prev => prev.slice(0, -1));

  }, [history, setBoardValues, setNotesBoard, setSelectedCell]);

  const handlePausedInteraction = useCallback((action) => {
    if (isPaused) {
      togglePause();
    } else {
      action();
    }
  }, [isPaused, togglePause]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        handlePausedInteraction(() => updateCell(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handlePausedInteraction(() => updateCell('.'));
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        handlePausedInteraction(() => handleMoveCellSelection(e.key));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [updateCell, handleMoveCellSelection, handlePausedInteraction]);

  return (

    <div className={`App ${isPaused ? 'is-paused' : ''}`}>

      {boardValues && (
        <BoardProvider initialPuzzle={initialPuzzle} boardValues={boardValues} selectedCell={selectedCell} onSelectCell={handleCellSelect} conflicts={conflicts} notesBoard={notesBoard} isPaused={isPaused} handleClick={handlePausedInteraction}>
          <Board />
        </BoardProvider>
      )}

      <Timer elapsedTime={elapsedTime} isPaused={isPaused} togglePause={togglePause} />
      <div className="controls-section">
        <GameControls updateCell={updateCell} notesMode={notesMode} toggleNotesMode={toggleNotesMode} onUndo={handleUndo} handleClick={handlePausedInteraction} />
        <Numpad updateCell={updateCell} handleClick={handlePausedInteraction} />
      </div>
      <NewGame onNewGame={handleNewGame} />

    </div>

  );

}

