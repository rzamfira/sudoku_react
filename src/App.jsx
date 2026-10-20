import { useContext, useEffect } from 'react'
import { useKeyboard } from './features/hooks';
import Board from './features/sudoku-board/Board.jsx'
import Timer from './features/controls-panel/timer-section/Timer.jsx';
import Controls from './features/controls-panel/controls-section/Controls.jsx';
import NewGame from './features/controls-panel/new-game-section/NewGame.jsx';
import './App.css'
import { SudokuContext } from './features/SudokuContext.jsx';

export default function App() {

  const { generateNewGame, updateCell, moveCellSelection } = useContext(SudokuContext);

  useEffect(() => { // should i have these two hooks here or inside the state?

    if (window.sudoku) {
      generateNewGame();
    }

  }, []);

  const handleInputValue = (value) => updateCell(value);
  const handleDeleteValue = () => updateCell('');

  useKeyboard(
    handleInputValue,
    handleDeleteValue,
    moveCellSelection
  );

  return (

    <div className="App">

      <Board />
      <Timer />
      <Controls />
      <NewGame />

    </div>

  );

}

