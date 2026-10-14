import Cell from './Cell';
import './Square.css';

function Square({ squareIndex, puzzle }) {
  const startRow = Math.floor((squareIndex - 1) / 3) * 3;
  const startCol = ((squareIndex - 1) % 3) * 3;
  const cells = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const row = startRow + i;
      const col = startCol + j;
      const value = puzzle[row][col];
      cells.push(
        <Cell key={`${row}-${col}`} value={value} rowIndex={row} columnIndex={col} />
      );
    }
  }

  return (
    <div className="square" data-square-index = {squareIndex}>
      {cells}
    </div>
  );
}

export default Square;