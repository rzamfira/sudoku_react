
import { getNeighborsOfCell } from './cellService.js';

export function initializeConflicts() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );
    
}

export function updateConflicts(conflicts, selectedCell, boardValues) {

    const updatedConflicts = structuredClone(conflicts);

    return setConflictsFor(
        selectedCell,
        clearAllConflictsFor(selectedCell, updatedConflicts),
        boardValues
    );

}

function clearAllConflictsFor(selectedCell, conflictsMatrix) {

    for (const neighbor of getNeighborsOfCell(selectedCell)) {

        conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex] =
            conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex].filter(
                conflict =>
                    conflict.rowIndex !== selectedCell.rowIndex ||
                    conflict.columnIndex !== selectedCell.columnIndex
            );

    }

    conflictsMatrix[selectedCell.rowIndex][selectedCell.columnIndex] = [];
    return conflictsMatrix;

}

function setConflictsFor(selectedCell, conflictsMatrix, boardValues) {

    const value = boardValues[selectedCell.rowIndex][selectedCell.columnIndex];
    if (value === '' || value === '.') {
        return conflictsMatrix;
    }

    for (const neighbor of getNeighborsOfCell(selectedCell)) {

        if (boardValues[neighbor.rowIndex][neighbor.columnIndex] === value) {
            conflictsMatrix[selectedCell.rowIndex][selectedCell.columnIndex].push(neighbor);
            conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex].push(selectedCell);
        }

    }

    return conflictsMatrix;

}

