import { useState, useCallback, useEffect, useRef } from 'react';

export function useTimer() {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {

        if (isPaused) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return;
        }

        intervalRef.current = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };

    }, [isPaused, elapsedTime]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    const resetTimer = useCallback(() => {
        setElapsedTime(0);
        setIsPaused(false);
    }, []);

    return { elapsedTime, isPaused, togglePause, resetTimer };

}
