import { useCallback, useEffect, useState } from "react";

type SetPersistentStateDispatch<T> = (value: (T | undefined) | ((previousValue: T | undefined) => T)) => void;

export function usePersistentState<T>(
    key: string,
    defaultValue?: T,
    storage?: Storage
): [T | undefined, SetPersistentStateDispatch<T>] {
    const [state, setState] = useState<T | undefined>(() => {
        // Get initial state from storage or use the default value
        if (!storage) storage = localStorage;
        const storedValue = storage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    const setValue = useCallback((value: Parameters<SetPersistentStateDispatch<T>>[0]) => {
        // If the value is a function, pass it as is. It must always return a value.
        if (typeof value === "function") {
            setState(value);
            return;
        }

        // When explicitly setting undefined, remove the item from storage
        if (value === undefined) {
            if (!storage) storage = localStorage;
            storage.removeItem(key);
            setState(undefined);
        } else {
            setState(value);
        }
    }, []);

    useEffect(() => {
        if (!storage) storage = localStorage;
        if (state !== undefined) {
            storage.setItem(key, JSON.stringify(state));
        }
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

    return [state, setValue];
}
