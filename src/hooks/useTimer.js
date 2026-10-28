import { useState, useCallback, useEffect, useRef } from 'react';

export function useTimer() {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {

        if (isPaused) {

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;

        }

        intervalRef.current = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

    }, [isPaused]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    const resetTimer = useCallback((currentIsPaused) => {

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setElapsedTime(0);
        setIsPaused(false);

        if (!currentIsPaused) {
            intervalRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }

    }, []);

    return { elapsedTime, isPaused, togglePause, resetTimer };

}
