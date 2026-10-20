import { createContext } from 'react';
import { useSelectedCell, useGameGeneration } from './hooks';
import { isCellEditable } from './sudoku-board/board-utils';

export const SudokuContext = createContext();


export function SudokuProvider({ children }) {

    const { initialPuzzle, userBoard, setUserBoard, generateNewGame } = useGameGeneration();
    const [selectedCell, onCellSelect] = useSelectedCell({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });

    const handleNewGame = () => {
        generateNewGame();
        onCellSelect(0, 0, 1);
    };

    const updateCell = (value) => {

        if (isCellEditable(initialPuzzle, selectedCell)) {
            setUserBoard(prevBoard => {
                const newBoard = prevBoard.map(row => [...row]);
                newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = value;
                return newBoard;
            });
        }

    };

    const moveCellSelection = (direction) => {

        const { rowIndex, columnIndex } = selectedCell;
        let newRow = rowIndex;
        let newCol = columnIndex;

        if (direction === 'ArrowUp' && rowIndex > 0) newRow--;
        if (direction === 'ArrowDown' && rowIndex < 8) newRow++;
        if (direction === 'ArrowLeft' && columnIndex > 0) newCol--;
        if (direction === 'ArrowRight' && columnIndex < 8) newCol++;

        onCellSelect(newRow, newCol, 0);

    };

    const value = {
        userBoard,
        generateNewGame,
        handleNewGame,
        selectedCell,
        onCellSelect,
        updateCell,
        moveCellSelection,
    };

    return (
        <SudokuContext.Provider value={value}>
            {children}
        </SudokuContext.Provider>
    );
}