import { useEffect } from 'react';
import { initializeNotesBoard } from '../services/notesService.js';

export function useSolvePuzzle(boardValues, setBoardValues, setHistory, setNotesBoard) {
    
    useEffect(() => {
        const solvePuzzle = () => {

            const boardString = boardValues.flat().join('');
            
            const puzzleString = window.sudoku.solve(boardString);
            const solvedGrid = window.sudoku.board_string_to_grid(puzzleString);
            
            const emptyCell = Array.from({ length: 81 }, (_, i) => ({
                rowIndex: Math.floor(i / 9),
                colIndex: i % 9
            })).find(cell => 
                boardValues[cell.rowIndex][cell.colIndex] === '.'
            );

            const newBoard = solvedGrid.map((row, rowIdx) =>
                row.map((cell, colIdx) => 
                    (rowIdx === emptyCell.rowIndex && colIdx === emptyCell.colIndex) ? '.' : cell
                )
            );

            setBoardValues(newBoard);
            setHistory([]);
            setNotesBoard(initializeNotesBoard());
        };

        window.solvePuzzle = solvePuzzle;
    }, [boardValues, setBoardValues, setHistory, setNotesBoard]);

}
