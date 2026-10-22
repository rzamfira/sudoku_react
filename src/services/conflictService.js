
import { getNeighborsOfCell } from './cellService.js';

export function initializeConflicts() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );

}

export function updateConflicts(conflicts, selectedCell, boardValues) {

    const updatedConflicts = structuredClone(conflicts);

    clearConflicts(updatedConflicts, selectedCell);
    addConflicts(updatedConflicts, selectedCell, boardValues);

    return updatedConflicts;

}

function clearConflicts(conflictsMatrix, selectedCell) {

    for (const neighbor of getNeighborsOfCell(selectedCell)) {

        conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex] =
            conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex].filter(
                conflict =>
                    conflict.rowIndex !== selectedCell.rowIndex ||
                    conflict.columnIndex !== selectedCell.columnIndex
            );

    }

    conflictsMatrix[selectedCell.rowIndex][selectedCell.columnIndex] = [];

}

function addConflicts(conflictsMatrix, selectedCell, boardValues) {

    const value = boardValues[selectedCell.rowIndex][selectedCell.columnIndex];
    if (value === '.') {
        return conflictsMatrix;
    }

    for (const neighbor of getNeighborsOfCell(selectedCell)) {

        if (boardValues[neighbor.rowIndex][neighbor.columnIndex] === value) {
            conflictsMatrix[selectedCell.rowIndex][selectedCell.columnIndex].push(neighbor);
            conflictsMatrix[neighbor.rowIndex][neighbor.columnIndex].push(selectedCell);
        }

    }

}

