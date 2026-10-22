import { calculateSquareIndex } from './navigationService.js';

export function isCellEditable(initialPuzzle, selectedCell) {

    return initialPuzzle && initialPuzzle[selectedCell.rowIndex][selectedCell.columnIndex] === '.';

}

export function isCellSelected(selectedCell, rowIndex, columnIndex) {

    return selectedCell.rowIndex === rowIndex &&
        selectedCell.columnIndex === columnIndex;

}

export function isCellNeighbour(selectedCell, rowIndex, columnIndex) {

    const sameRow = selectedCell.rowIndex === rowIndex;
    const sameColumn = selectedCell.columnIndex === columnIndex;
    const sameSquare = selectedCell.squareIndex === calculateSquareIndex(rowIndex, columnIndex);
    return sameRow || sameColumn || sameSquare;

}