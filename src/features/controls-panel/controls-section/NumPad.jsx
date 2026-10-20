import './NumPad.css';

export default function NumPad() {
    return (
        <div className="numpad-section">
            {Array.from({ length: 9 }, (_, i) => (
                <button key={i} className="numpad-button">
                    {i + 1}
                </button>
            ))}
        </div>
    );
}