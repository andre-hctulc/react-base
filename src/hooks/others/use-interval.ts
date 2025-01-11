import React from "react";

/**
 * @param active Defaults tot true
 */
export function useInterval(callback: () => void, delay: number, active?: boolean) {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        if (active === false) return;
        const interval = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(interval);
    }, [delay, active]);
}
