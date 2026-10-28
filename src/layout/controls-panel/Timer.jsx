import './Timer.css';
import PlayIcon from '../../icons/play.svg';
import { formatTime, formatDatetime } from '../../services/timerService.js';

export default function Timer({ elapsedTime, isPaused, togglePause }) {

    return (
        <div className="timer">

            <div className="timer-class">
                <span className="timer-label">Time</span>
                <time className="timer-display" id="timer" dateTime={formatDatetime(elapsedTime)}>
                    {formatTime(elapsedTime)}
                </time>
            </div>

            <button
                className="pause-button"
                onClick={togglePause}
                title={isPaused ? "Resume" : "Pause"}
            >
                <span className="pause-icon"></span>
                <img src={PlayIcon} alt="play" className="play-icon" />
            </button>

        </div>
    );

}
