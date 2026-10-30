import { useEffect } from 'react';

export function useSolvePuzzle(boardValues, setBoardValues ) {
    
    useEffect(() => {
        const solvePuzzle = () => {

            const boardString = boardValues.flat().join('');
            const solvedString = window.sudoku.solve(boardString);
            const solvedGrid = window.sudoku.board_string_to_grid(solvedString);
            
            const emptyIndex = boardString.indexOf('.');
            if (emptyIndex !== -1) {
                const row = Math.floor(emptyIndex / 9);
                const column = emptyIndex % 9;
                solvedGrid[row][column] = '.';
            }

            setBoardValues(solvedGrid);
    
        };

        window.solvePuzzle = solvePuzzle;
    }, [boardValues, setBoardValues]);

}
