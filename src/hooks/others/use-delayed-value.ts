import { useState, useEffect } from "react";

/**
 * Delays value changes by `delay` milliseconds.
 * Interrupted changes are discarded.
 * @param value Delay in milliseconds
 */
export function useDelayedValue<T>(value: T, delay: number = 2000): T {
    const [delayedValue, setDelayedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDelayedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return delayedValue;
}
