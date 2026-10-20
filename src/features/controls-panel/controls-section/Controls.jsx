import './Controls.css';
import GameAction from './GameAction';
import NumPad from './NumPad';

export default function Controls() {
    return (
        <div className="controls-section">
            <GameAction />
            <NumPad />
        </div>
    );
}