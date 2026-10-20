import { useContext, useEffect } from 'react'
import { useKeyboard } from './features/hooks';
import Board from './features/sudoku_board/Board.jsx'
import './App.css'
import { SudokuContext } from './features/SudokuContext.jsx';

export default function App() {

  const { generateNewGame, updateCell, moveCellSelection, handleNewGame } = useContext(SudokuContext);

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

      <div className="controls">
        <button onClick={handleNewGame} className="new-game-button">New Game</button>
      </div>

    </div>

  );

}

