import { useEffect, useState } from "react";

export function usePersistentState<T>(
    key: string,
    defaultValue?: T,
    storage?: Storage
): [T, React.Dispatch<React.SetStateAction<T>>] {
    // Get initial state from storage or use the default value
    const getStoredValue = (): T => {
        if (!storage) storage = localStorage;
        const storedValue = storage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue as T;
    };
    const [state, setState] = useState<T>(getStoredValue);

    useEffect(() => {
        if (!storage) storage = localStorage;
        storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea === storage && event.key === key) {
                setState(event.newValue ? JSON.parse(event.newValue) : undefined);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, [key, storage]);

    return [state, setState];
}
