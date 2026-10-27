import { useContext, useMemo } from 'react';
import { BoardContext } from './BoardContext.jsx';
import './Cell.css';
import { isCellNeighbour, isCellSelected, hasCellConflict, isCellEditable } from '../../services/cellService.js';
import { getBorderClasses } from '../../services/stylingService.js';

export default function Cell({ rowIndex, columnIndex }) {

    const { initialPuzzle, boardValues, selectedCell, onSelectCell, conflicts, notesBoard } = useContext(BoardContext);

    const displayValue = useMemo(() => {
        const cellValue = boardValues[rowIndex][columnIndex];
        return cellValue === 0 || cellValue === '.' ? '' : cellValue;
    }, [boardValues, rowIndex, columnIndex]);

    const cellNotes = useMemo(() =>
        notesBoard[rowIndex][columnIndex],
        [notesBoard, rowIndex, columnIndex]
    );

    const noteNumbers = useMemo(() =>
        Array.from({ length: 9 }, (_, i) => i + 1),
        []
    );

    const isCurrentCellEditable = useMemo(() =>
        isCellEditable(initialPuzzle, rowIndex, columnIndex),
        [initialPuzzle, rowIndex, columnIndex]
    );
    const isCurrentCellSelected = useMemo(() =>
        isCellSelected(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );
    const isNeighbourOfSelectedCell = useMemo(() =>
        isCellNeighbour(selectedCell, rowIndex, columnIndex),
        [selectedCell, rowIndex, columnIndex]
    );
    const hasCurrentCellConflict = useMemo(() =>
        hasCellConflict(conflicts, rowIndex, columnIndex),
        [conflicts, rowIndex, columnIndex]
    );

    const borderClasses = useMemo(() =>
        getBorderClasses(rowIndex, columnIndex),
        [rowIndex, columnIndex]
    );

    const classNames = [
        'cell',
        isCurrentCellSelected && 'selected',
        isNeighbourOfSelectedCell && 'neighbour',
        hasCurrentCellConflict && 'conflict',
        isCurrentCellEditable && hasCurrentCellConflict && 'invalid-value',
        isCurrentCellEditable && !hasCurrentCellConflict && 'valid-value',
        borderClasses
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classNames}
            onClick={() => onSelectCell(rowIndex, columnIndex)}>
            {displayValue || (
                <div className="notes-grid">
                    {noteNumbers.map(note => (
                        <Note 
                            key={note} 
                            note={note} 
                            isActive={cellNotes.includes(note)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );

}

function Note({ note, isActive }) {
    return (
        <div className={`notes-value ${isActive ? 'active' : ''}`}>
            {isActive && note}
        </div>
    );
}
