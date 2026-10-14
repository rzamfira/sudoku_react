import Square from './Square';
import './Board.css';

function Board({ puzzle }) {
  const squares = [];
  for (let i = 1; i <= 9; i++) {
    squares.push(
      <Square key={i} squareIndex={i} puzzle={puzzle} />
    );
  }

  return (
    <div className="board">
      {squares}
    </div>
  );
}

export default Board;