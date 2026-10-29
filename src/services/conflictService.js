
import { getNeighborsOfCell } from './cellService.js';

export function initializeConflicts() {

    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );

}

export function calculateAllConflicts(boardValues) {
    const conflictsMatrix = initializeConflicts();
    
    Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
            addConflicts(conflictsMatrix, { rowIndex: row, columnIndex: col }, boardValues);
        })
    );
    
    return conflictsMatrix;
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

export function hasConflicts(conflicts) {
    return conflicts.some(row =>
        row.some(cell => cell.length > 0)
    );
}

