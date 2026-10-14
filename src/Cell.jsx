import './Cell.css';

function Cell({ value , rowIndex, columnIndex }) {
  return (
    <div className="cell" data-row-index={rowIndex} data-column-index={columnIndex}>
      {value}
    </div>
  );
}

export default Cell;