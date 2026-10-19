import { createContext, useState, useEffect } from 'react';

export const SudokuContext = createContext();

const useSelectedCell = (initialState) => {
    const [selectedCell, setSelectedCell] = useState(initialState);

    const onCellSelect = (rowIndex, columnIndex, squareIndex) => {
        setSelectedCell({ rowIndex, columnIndex, squareIndex });
    };

    return [selectedCell, onCellSelect];
}

export function SudokuProvider({ children }) {

    const [initialPuzzle, setInitialPuzzle] = useState(null);
    const [userBoard, setUserBoard] = useState(null);
    const [selectedCell, onCellSelect] = useSelectedCell({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });


    const generateNewGame = () => {

        const puzzleString = window.sudoku.generate('medium');
        const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
        setInitialPuzzle(puzzleGrid);
        setUserBoard(puzzleGrid.map(row => [...row]));
        onCellSelect(0, 0, 1);

    };

    useEffect(() => {
        if (window.sudoku) {
            generateNewGame();
        }
    }, []);


    const updateCell = (value) => { 

        setUserBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            newBoard[selectedCell.rowIndex][selectedCell.columnIndex] = value;
            return newBoard;
        });

    };

    const value = {
        initialPuzzle,
        userBoard,
        generateNewGame,
        selectedCell,
        onCellSelect,
        updateCell,
    };

    return (
        <SudokuContext.Provider value={value}>
            {children}
        </SudokuContext.Provider>
    );
}