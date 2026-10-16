import { createContext, useState, useEffect } from 'react';

export const SudokuContext = createContext();

export function SudokuProvider({ children }) {

    const [initialPuzzle, setInitialPuzzle] = useState(null);
    const [userBoard, setUserBoard] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });
    // const selectedCellDetailed = useMemo(() => ({
    //     row: selectedCell.rowIndex,
    //     column: selectedCell.columnIndex,
    //     square: selectedCell.squareIndex
    // }), [selectedCell]);


    const generateNewGame = () => {

        const puzzleString = window.sudoku.generate('medium');
        const puzzleGrid = window.sudoku.board_string_to_grid(puzzleString);
        setInitialPuzzle(puzzleGrid);
        setUserBoard(puzzleGrid.map(row => [...row]));
        setSelectedCell({ rowIndex: 0, columnIndex: 0, squareIndex: 1 });

    };

    useEffect(() => {
        if (window.sudoku) {
            generateNewGame();
        }
    }, []);

    const onCellSelect = (rowIndex, columnIndex, squareIndex) => {
        setSelectedCell({ rowIndex, columnIndex, squareIndex });
    };

    const updateCell = (selectedCell, value) => {

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