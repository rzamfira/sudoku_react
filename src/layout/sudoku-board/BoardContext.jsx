import { createContext } from 'react';

export const BoardContext = createContext();

export function BoardProvider({ children, boardValues, selectedCell, onSelectCell }) {

    const value = {
        boardValues,
        selectedCell,
        onSelectCell
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );

}
