import './Numpad.css';

export default function Numpad({ updateCell }) {

  return (
    <div className="numpad">
      {Array.from({ length: 9 }, (_, i) => (
        <button key={i} className="numpad-button" onClick={() => updateCell((i + 1).toString())}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}