import React from "react";
export function useTimeout(callback, delay) {
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    React.useEffect(() => {
        const timeout = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(timeout);
    }, [delay]);
}
