import Square from './Square.jsx';
import './Board.css';
import { BoardProvider } from './BoardContext.jsx';

export default function Board({ userBoard, selectedCell, onSelectCell }) {

  if (!userBoard) {
    return <div className="sudoku-board"></div>;
  }

  return (
    <BoardProvider selectedCell={selectedCell} onSelectCell={onSelectCell} userBoard={userBoard}>
      <div className="sudoku-board">
        {Array.from({ length: 9 }, (_, i) => (
          <Square key={i} squareIndex={i + 1} />
        ))}
      </div>
    </BoardProvider>
  );
}
