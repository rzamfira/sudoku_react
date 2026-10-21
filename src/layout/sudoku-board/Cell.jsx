import { useContext, useMemo } from 'react';
import { BoardContext } from './BoardContext.jsx';
import './Cell.css';
import { isCellNeighbour, isCellSelected } from '../../board-utils/cellState.js';
import { getBorderClasses } from '../../board-utils/stylingHelpers.js';

export default function Cell({ rowIndex, columnIndex, squareIndex }) {

    const { selectedCell, onSelectCell, userBoard } = useContext(BoardContext);

    const displayValue = useMemo(() => {
        const cellValue = userBoard[rowIndex][columnIndex];
        return cellValue === 0 || cellValue === '.' ? '' : cellValue;
    }, [userBoard, rowIndex, columnIndex]);

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
            onClick={() => onSelectCell(rowIndex, columnIndex, squareIndex)}>
            {displayValue}
        </div>

    );

}
