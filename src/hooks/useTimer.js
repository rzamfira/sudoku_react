import { useState, useCallback, useEffect } from 'react';

export function useTimer(isGameWon) {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {

        if (isPaused || isGameWon) {
            return;
        }

        const intervalId = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };

    }, [isPaused, elapsedTime, isGameWon]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    const resetTimer = useCallback(() => {
        setElapsedTime(0);
        setIsPaused(false);
    }, []);

    return { elapsedTime, isPaused, togglePause, resetTimer };

}
