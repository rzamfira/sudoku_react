import { BoardContext } from './BoardContext.jsx';

export function BoardProvider({ children, initialPuzzle, boardValues, selectedCell, onSelectCell, conflicts, notesBoard, isPaused, handleClick, isGameWon }) {

    const value = {
        initialPuzzle,
        boardValues,
        selectedCell,
        onSelectCell,
        conflicts,
        notesBoard,
        isPaused,
        handleClick,
        isGameWon
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );

}
