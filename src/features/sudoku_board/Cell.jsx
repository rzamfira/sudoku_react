import { useContext, useMemo } from 'react';
import { SudokuContext } from '../SudokuContext.jsx';
import './Cell.css';
import { isCellNeighbour, isCellSelected, getBorderClasses } from './board-utils.js';

export default function Cell({ rowIndex, columnIndex, squareIndex }) {

    const { selectedCell, onCellSelect, userBoard } = useContext(SudokuContext);

    const value = userBoard[rowIndex][columnIndex];
    const displayValue = useMemo(() => {

        return value === 0 || value === '.' ? '' : value;

    });

    const isCurrentCellSelected = useMemo(() =>
        isCellSelected(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );
    const isNeighbourOfCurrentCell = useMemo(() =>
        isCellNeighbour(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );
    const borderClasses = useMemo(() =>
        getBorderClasses(rowIndex, columnIndex),
        [rowIndex, columnIndex]
    );

    const classNames = [
        'cell',
        isCurrentCellSelected && 'selected',
        isNeighbourOfCurrentCell && 'neighbour',
        borderClasses
    ].filter(Boolean).join(' ')

    return (

        <div
            className={classNames}
            onClick={() => onCellSelect(rowIndex, columnIndex, squareIndex)}>
            {displayValue}
        </div>

    );

}
