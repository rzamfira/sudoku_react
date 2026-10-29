import Square from './Square.jsx';
import PauseIcon from '../../icons/pause.svg';
import { useContext } from 'react';
import { BoardContext } from './BoardContext.jsx';
import './Board.css';


export default function Board() {

  const { handleClick, isPaused, isGameWon } = useContext(BoardContext);

  return (
    <div className="sudoku-board" onClick={() => handleClick(() => { })}>
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} squareIndex={i + 1} />
      ))}
      {isPaused && (
        <div className="pause-overlay">
          <img className="icon-is-paused" src={PauseIcon} alt="pause" />
        </div>
      )}
      {isGameWon && (
        <div className="won-overlay">
          <h2>You Won!</h2>
        </div>
      )}
    </div>
  );

}
