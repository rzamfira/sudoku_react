// Square.jsx
import { useMemo } from 'react';
import Cell from './Cell.jsx';
import './Square.css';
import { getCellCoordinatesFromSquare } from '../../board-utils/navigationOperations.js';
import { getSquareBorderClasses } from '../../board-utils/stylingHelpers.js';


export default function Square({ squareIndex }) {

  const borderClasses = useMemo(() =>
    getSquareBorderClasses(squareIndex),
    [squareIndex]
  );

  return (

    <div className={`square ${borderClasses}`}>
      {Array.from({ length: 9 }, (_, cellIndex) => {

        const { rowIndex, columnIndex } = getCellCoordinatesFromSquare(squareIndex, cellIndex);

        return (
          <Cell key={`${rowIndex}-${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            squareIndex={squareIndex} />
        );
      })}
    </div>

  );

}