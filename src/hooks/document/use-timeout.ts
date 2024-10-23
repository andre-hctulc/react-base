import React from "react";

export function useTimeout(callback: () => void, delay: number) {
    React.useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
}
