import { useEffect, useState, type Dispatch } from "react";

/**
 * Persists the current state. 
 * If the state is undefined, the item is removed from the storage.
 */
export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    storage?: Storage
): [T, Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        // Get initial state from storage or use the default value
        if (!storage) storage = localStorage;
        const storedValue = storage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    useEffect(() => {
        if (!storage) storage = localStorage;
        if (state === undefined) {
            storage.removeItem(key);
        } else {
            storage.setItem(key, JSON.stringify(state));
        }
    }, [key, state, storage]);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea === storage && event.key === key) {
                setState(event.newValue ? JSON.parse(event.newValue) : defaultValue);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, [key, storage]);

    return [state, setState];
}
