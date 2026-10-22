import { createContext } from 'react';

export const BoardContext = createContext();

export function BoardProvider({ children, initialPuzzle, boardValues, selectedCell, onSelectCell, conflicts }) {


    const value = {
        initialPuzzle,
        boardValues,
        selectedCell,
        onSelectCell,
        conflicts
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );

}
