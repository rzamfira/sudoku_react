import { calculateSquareIndex } from './navigationService.js';

export function isCellEditable(initialPuzzle, rowIndex, columnIndex) {

    return initialPuzzle && initialPuzzle[rowIndex][columnIndex] === '.';
}

export function isCellSelected(selectedCell, rowIndex, columnIndex) {

    return selectedCell.rowIndex === rowIndex &&
        selectedCell.columnIndex === columnIndex;
}

export function hasCellConflict(conflicts, rowIndex, columnIndex) {

    return conflicts[rowIndex][columnIndex].length > 0;
}

export function isCellNeighbour(selectedCell, rowIndex, columnIndex) {

    if (selectedCell.rowIndex === rowIndex && selectedCell.columnIndex === columnIndex) {
        return false;
    }

    const sameRow = selectedCell.rowIndex === rowIndex;
    const sameColumn = selectedCell.columnIndex === columnIndex;
    const sameSquare = selectedCell.squareIndex === calculateSquareIndex(rowIndex, columnIndex);
    return sameRow || sameColumn || sameSquare;

}

export function getNeighborsOfCell(currentCell) {

    const neighbors = Array.from({ length: 81 }, (_, i) => ({
        rowIndex: Math.floor(i / 9),
        columnIndex: i % 9
    }));

    return neighbors.filter(({ rowIndex, columnIndex }) =>
        isCellNeighbour(currentCell, rowIndex, columnIndex)
    );

}
