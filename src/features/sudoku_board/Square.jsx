// Square.jsx
import { useContext, useMemo } from 'react';
import Cell from './Cell.jsx';
import { SudokuContext } from '../SudokuContext.jsx';
import './Square.css';
import { getSquareBorderClasses, getCellCoordinatesFromSquare } from './board-utils.js';


export default function Square({ squareIndex }) {

  const { userBoard } = useContext(SudokuContext);

  const borderClasses = useMemo(() =>
    getSquareBorderClasses(squareIndex),
    [squareIndex]
  );

  return (

    <div className={`square ${borderClasses}`}>
      {Array.from({ length: 9 }, (_, cellIndex) => {

        const { rowIndex, columnIndex } = getCellCoordinatesFromSquare(squareIndex, cellIndex);
        const value = userBoard[rowIndex][columnIndex];

        return (
          <Cell key={`${rowIndex}-${columnIndex}`} value={value}
            rowIndex={rowIndex} columnIndex={columnIndex} squareIndex={squareIndex} />
        );
      })}
    </div>

  );

}