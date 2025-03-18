import React from "react";

/**
 * @param callback Triggered by `delay` ot `trigger` change
 * @param delay Delay in milliseconds
 * @param trigger Trigger to reset the timeout. Defaults to no trigger
 */
export function useTimeout(callback: () => void, delay: number, trigger: any = "") {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const timeout = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(timeout);
    }, [delay, trigger]);
}
