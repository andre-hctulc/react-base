import React from "react";

export default function useInterval(callback: () => void, delay: number) {
    const savedCallback = React.useRef(callback);
    savedCallback.current = callback;

    React.useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
