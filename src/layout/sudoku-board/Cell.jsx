import { useContext, useMemo } from 'react';
import { BoardContext } from './BoardContext.jsx';
import './Cell.css';
import { isCellNeighbour, isCellSelected } from '../../services/cellService.js';
import { getBorderClasses } from '../../services/stylingService.js';

export default function Cell({ rowIndex, columnIndex }) {

    const { selectedCell, onSelectCell, boardValues } = useContext(BoardContext);

    const displayValue = useMemo(() => {
        const cellValue = boardValues[rowIndex][columnIndex];
        return cellValue === 0 || cellValue === '.' ? '' : cellValue;
    }, [boardValues, rowIndex, columnIndex]);

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
            onClick={() => onSelectCell(rowIndex, columnIndex)}>
            {displayValue}
        </div>

    );

}
