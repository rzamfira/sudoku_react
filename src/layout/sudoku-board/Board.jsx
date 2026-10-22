import Square from './Square.jsx';
import './Board.css';


export default function Board() {

  return (
    <div className="sudoku-board">
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} squareIndex={i + 1} />
      ))}
    </div>
  );
}
