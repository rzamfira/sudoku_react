import Square from './Square';
import './Board.css';
import { useContext } from 'react';
import { SudokuContext } from '../SudokuContext.jsx';

export default function Board() {

  const { userBoard } = useContext(SudokuContext);

  if (!userBoard) {
    return null;
  }

  return (

    <div className="board">
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} squareIndex={i + 1} />
      ))}
    </div>

  );

}
