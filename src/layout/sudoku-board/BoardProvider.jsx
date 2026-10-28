import { BoardContext } from './BoardContext.jsx';

export function BoardProvider({ children, initialPuzzle, boardValues, selectedCell, onSelectCell, conflicts, notesBoard, isPaused, handleClick }) {

    const value = {
        initialPuzzle,
        boardValues,
        selectedCell,
        onSelectCell,
        conflicts,
        notesBoard,
        isPaused,
        handleClick
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );

}
