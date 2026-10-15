import Square from './Square';
import './Board.css';

export default function Board({ userBoard, updateCell, selectedCell, onCellSelect, isCellEditable }) {

  const squares = [];

  for (let i = 1; i <= 9; i++) {

    squares.push(
      <Square key={i} squareIndex={i} userBoard={userBoard}
        updateCell={updateCell} isCellEditable={isCellEditable}
        selectedCell={selectedCell} onCellSelect={onCellSelect} />
    );

  }

  return (

    <div className="board">
      {squares}
    </div>

  );

}
