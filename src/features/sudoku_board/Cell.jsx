import { useContext, useMemo } from 'react';
import { SudokuContext } from '../SudokuContext.jsx';
import './Cell.css';
import { isCellNeighbour, isCellSelected, getBorderClasses } from './board-utils.js';

export default function Cell({ value, rowIndex, columnIndex, squareIndex }) {

    const { selectedCell, onCellSelect } = useContext(SudokuContext);

    const borderClasses = useMemo(() =>
        getBorderClasses(rowIndex, columnIndex),
        [rowIndex, columnIndex]
    );

    const isSelected = useMemo(() =>
        isCellSelected(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );
    const isNeighbour = useMemo(() =>
        isCellNeighbour(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );

    const displayValue = useMemo(() => {

        return value === 0 || value === '.' ? '' : value;

    }, [value]);

    return (

        <div
            className={`cell ${isSelected ? 'selected' : ''} ${isNeighbour ? 'neighbour' : ''} ${borderClasses}`}
            onClick={() => onCellSelect(rowIndex, columnIndex, squareIndex)}>
            {displayValue}
        </div>

    );

}
