import { useState, useEffect, useCallback } from 'react'
import Board from './Board'
import './App.css'

export default function App() {

  const [initialPuzzle, setInitialPuzzle] = useState(null);
  const [userBoard, setUserBoard] = useState(null);
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });

  const generateNewGame = () => {

    const puzzleString = window.sudoku.generate('medium');
    const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
    setInitialPuzzle(puzzleGrid);
    setSelectedCell({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });

  };

  const isCellEditable = useCallback((rowIndex, columnIndex) => {
    return initialPuzzle[rowIndex][columnIndex] === '.';
  }, [initialPuzzle]);

  const onCellSelect = (rowIndex, columnIndex, squareIndex) => {
    setSelectedCell({ rowIndex, columnIndex, squareIndex });
  };

  const updateCell = (rowIndex, columnIndex, value) => {

    setUserBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      newBoard[rowIndex][columnIndex] = value;
      return newBoard;
    });

  };

  useEffect(() => {

    if (window.sudoku) {
      generateNewGame();
    }

  }, [])

  useEffect(() => {

    if (initialPuzzle) {
      setUserBoard(initialPuzzle.map(row => [...row]));
    }

  }, [initialPuzzle]);


  return (

    <div className="App">
      {userBoard ? (
        <Board userBoard={userBoard} updateCell={updateCell} isCellEditable={isCellEditable}
          selectedCell={selectedCell} onCellSelect={onCellSelect} />
      ) : (
        <p>Loading puzzle...</p>
      )}
      <div className="controls">
        <button onClick={generateNewGame} className="new-game-button">New Game</button>
      </div>
    </div>

  )

}

