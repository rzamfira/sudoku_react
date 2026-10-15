import { useEffect } from 'react';
import './Cell.css';

export default function Cell({ value, rowIndex, columnIndex, squareIndex, updateCell, isCellEditable, selectedCell, onCellSelect }) {

    const displayValue = value === 0 || value === '.' ? '' : value;

    useEffect(() => {

        if (selectedCell.rowIndex === rowIndex && selectedCell.columnIndex === columnIndex && isCellEditable(rowIndex, columnIndex)) {

            const handleKeyDown = (e) => {
                if (e.key >= '1' && e.key <= '9') {
                    updateCell(rowIndex, columnIndex, e.key);
                }
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    updateCell(rowIndex, columnIndex, '');
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => document.removeEventListener('keydown', handleKeyDown);

        }

    }, [selectedCell])

    return (

        <div className={`cell ${selectedCell.rowIndex === rowIndex && selectedCell.columnIndex === columnIndex ? 'selected' : ''}`}
            data-row-index={rowIndex} data-column-index={columnIndex}
            onClick={() => onCellSelect(rowIndex, columnIndex, squareIndex)}>
            {displayValue}
        </div>

    );

}
