import { createContext, useState, useEffect } from 'react';
import { initializeConflicts, updateConflicts } from '../../services/conflictService.js';

export const BoardContext = createContext();

export function BoardProvider({ children, initialPuzzle, boardValues, selectedCell, onSelectCell }) {

    const [conflicts, setConflicts] = useState(initializeConflicts());

    useEffect(() => {
        setConflicts(prevConflicts => updateConflicts(prevConflicts, selectedCell, boardValues));
    }, [boardValues]);

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
