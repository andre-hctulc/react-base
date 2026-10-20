"use client";

import { useEffect, useRef } from "react";

/**
 * @param active Defaults tot true
 */
export function useInterval(callback: () => void, delay: number, active?: boolean) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (active === false) return;
        const interval = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(interval);
    }, [delay, active]);
}
