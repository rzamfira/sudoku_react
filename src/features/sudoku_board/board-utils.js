
export function calculateSquareIndex(rowIndex, columnIndex) {

    const squareRow = Math.floor(rowIndex / 3);
    const squareColumn = Math.floor(columnIndex / 3);
    return (squareRow * 3 + squareColumn) + 1;

}

export function getCellCoordinatesFromSquare(squareIndex, cellIndex) {

    const squareRow = Math.floor((squareIndex - 1) / 3);
    const squareCol = (squareIndex - 1) % 3;

    const cellRow = Math.floor(cellIndex / 3);
    const cellCol = cellIndex % 3;

    return {
        rowIndex: squareRow * 3 + cellRow,
        columnIndex: squareCol * 3 + cellCol
    };
}

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

export function getBorderClasses(rowIndex, columnIndex) {
    const classes = [];

    if ((columnIndex + 1) % 3 === 0) {
        classes.push('no-right-border');
    }

    if (columnIndex % 3 === 0) {
        classes.push('no-left-border');
    }

    if ((rowIndex + 1) % 3 === 0) {
        classes.push('no-bottom-border');
    }

    if (rowIndex % 3 === 0) {
        classes.push('no-top-border');
    }

    return classes.join(' ');
}

export function getSquareBorderClasses(squareIndex) {
    const classes = [];

    if (squareIndex % 3 !== 0) {
        classes.push('border-right');
    }

    if (squareIndex <= 6) {
        classes.push('border-bottom');
    }

    return classes.join(' ');
}
