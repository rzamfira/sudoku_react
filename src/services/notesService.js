export function initializeNotesBoard() {
    return Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );
}

export function getCellNotes(notesBoard, rowIndex, columnIndex) {
    return notesBoard[rowIndex][columnIndex];
}

export function updateCellNote(notesBoard, rowIndex, columnIndex, note) {

    const cellNotes = notesBoard[rowIndex][columnIndex];

    if (cellNotes.includes(note)) {
        return removeNote(notesBoard, rowIndex, columnIndex, note);
    } else {
        return addNote(notesBoard, rowIndex, columnIndex, note);
    }

}

export function clearCellNotes(notesBoard, rowIndex, columnIndex) {

    const updatedNotesBoard = structuredClone(notesBoard);
    updatedNotesBoard[rowIndex][columnIndex] = [];
    return updatedNotesBoard;

}

function addNote(notesBoard, rowIndex, columnIndex, note) {

    const updatedNotesBoard = structuredClone(notesBoard);
    const cellNotes = updatedNotesBoard[rowIndex][columnIndex];

    if (!cellNotes.includes(note)) {
        cellNotes.push(note);
        cellNotes.sort((a, b) => a - b);
    }

    return updatedNotesBoard;

}

function removeNote(notesBoard, rowIndex, columnIndex, note) {

    const updatedNotesBoard = structuredClone(notesBoard);
    const cellNotes = updatedNotesBoard[rowIndex][columnIndex];

    const index = cellNotes.indexOf(note);
    if (index > -1) {
        cellNotes.splice(index, 1);
    }

    return updatedNotesBoard;

}
