import './NewGame.css';

export default function NewGame({ onNewGame }) {

    return (
        <button className="new-game-button" onClick={onNewGame}>New Game</button>
    );

}