import './GameAction.css';

export default function GameAction() {
    return (
        <div className="game-action-section">
            <button className="game-action-button">Undo</button>
            <button className="game-action-button">Erase</button>
            <button className="game-action-button">Notes</button>
        </div>
    );
}