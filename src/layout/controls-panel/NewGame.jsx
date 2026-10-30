import './NewGame.css';

export default function NewGame({ onNewGame }) {

    return (
        <div className="new-game-section">
            <button className="new-game-button" onClick={onNewGame}>New Game</button>
        </div>
    );

}