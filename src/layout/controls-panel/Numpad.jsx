import './Numpad.css';

export default function Numpad({ updateCell, handleClick }) {

  return (
    <div className="numpad">
      {Array.from({ length: 9 }, (_, i) => (
        <button key={i} className="numpad-button" onClick={() => handleClick(() => updateCell((i + 1).toString()))}>
          {i + 1}
        </button>
      ))}
    </div>
  );
  
}