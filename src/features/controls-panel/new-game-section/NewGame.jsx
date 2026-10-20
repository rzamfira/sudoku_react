import { useContext } from 'react';
import { SudokuContext } from '../../SudokuContext.jsx';
import './NewGame.css';

export default function NewGame() {

    const { handleNewGame } = useContext(SudokuContext);

    return (
        <div className="new-game-section">
            <button onClick={handleNewGame} className="new-game-button">New Game</button>
        </div>
    );
}