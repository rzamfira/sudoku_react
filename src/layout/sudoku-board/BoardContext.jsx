import { createContext } from 'react';

export const BoardContext = createContext();

export function BoardProvider({ children, selectedCell, onSelectCell, userBoard }) {
    const value = {
        selectedCell,
        onSelectCell,
        userBoard,
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
}
