import { useState, useEffect, useCallback } from 'react';

export const useSelectedCell = (initialState) => {

    const [selectedCell, setSelectedCell] = useState(initialState);

    const onCellSelect = (rowIndex, columnIndex, squareIndex) => {
        setSelectedCell({ rowIndex, columnIndex, squareIndex });
    };

    return [selectedCell, onCellSelect];

}

export const useGameGeneration = () => {

    const [initialPuzzle, setInitialPuzzle] = useState(null);
    const [userBoard, setUserBoard] = useState(null);

    const generateNewGame = useCallback(() => {
        const puzzleString = window.sudoku.generate('medium');
        const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
        setInitialPuzzle(puzzleGrid);
        setUserBoard(puzzleGrid.map(row => [...row]));
    }, []);

    return { initialPuzzle, userBoard, setUserBoard, generateNewGame };

}

export const useKeyboard = (onInputValue, onDeleteValue, onMoveCellSelection) => {

    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.key >= '1' && e.key <= '9') {
                onInputValue(e.key);
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                onDeleteValue();
            } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                onMoveCellSelection(e.key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);

    }, [onInputValue, onDeleteValue, onMoveCellSelection]);

};