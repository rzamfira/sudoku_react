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

export function moveCellSelection(direction, selectedCell) {

    const { rowIndex, columnIndex } = selectedCell;
    let newRow = rowIndex;
    let newCol = columnIndex;

    if (direction === 'ArrowUp' && rowIndex > 0) newRow--;
    if (direction === 'ArrowDown' && rowIndex < 8) newRow++;
    if (direction === 'ArrowLeft' && columnIndex > 0) newCol--;
    if (direction === 'ArrowRight' && columnIndex < 8) newCol++;

    const newSquareIndex = calculateSquareIndex(newRow, newCol);

    return { rowIndex: newRow, columnIndex: newCol, squareIndex: newSquareIndex };

}