import { BoardContext } from './BoardContext.jsx';

export function BoardProvider({ children, initialPuzzle, boardValues, selectedCell, onSelectCell, conflicts, notesBoard }) {

    const value = {
        initialPuzzle,
        boardValues,
        selectedCell,
        onSelectCell,
        conflicts,
        notesBoard
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
}
