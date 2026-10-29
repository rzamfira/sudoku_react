import { useState, useCallback } from 'react';

export const useSudokuGame = () => {

    const [initialPuzzle, setInitialPuzzle] = useState(null);
    const [boardValues, setBoardValues] = useState(null);

    const generateNewGame = useCallback(() => {
        const puzzleString = window.sudoku.generate('easy');
        const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
        setInitialPuzzle(puzzleGrid);
        setBoardValues(structuredClone(puzzleGrid));
    }, []);

    return { initialPuzzle, boardValues, setBoardValues, generateNewGame };

}






