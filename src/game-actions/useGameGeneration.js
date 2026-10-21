import { useState, useCallback } from 'react';

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






