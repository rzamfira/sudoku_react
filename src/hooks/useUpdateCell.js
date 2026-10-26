import { useCallback } from 'react';
import { isCellEditable } from '../services/cellService.js';
import { updateCellNote, clearCellNotes } from '../services/notesService.js';

export function useUpdateCell(initialPuzzle, selectedCell, notesMode, setBoardValues, setNotesBoard) {

    const updateBoardValue = useCallback((cellValue) => {
        setBoardValues(prevBoard => {
            const newBoard = structuredClone(prevBoard);
            newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = cellValue;
            return newBoard;
        });
    }, [selectedCell, setBoardValues]);

    return useCallback((value) => {

        if (!isCellEditable(initialPuzzle, selectedCell.rowIndex, selectedCell.columnIndex)) {
            return;
        }

        if (notesMode) {
            updateBoardValue('.');
            setNotesBoard(prev => value === '.'
                ? clearCellNotes(prev, selectedCell.rowIndex, selectedCell.columnIndex)
                : updateCellNote(prev, selectedCell.rowIndex, selectedCell.columnIndex, parseInt(value))
            );
        }

        else {
            updateBoardValue(value);
            setNotesBoard(prev => clearCellNotes(prev, selectedCell.rowIndex, selectedCell.columnIndex));
        }

    }, [initialPuzzle, selectedCell, notesMode, updateBoardValue, setNotesBoard]);
}

