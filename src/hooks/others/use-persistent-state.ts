import React from "react";

/**
 * Use `usePersistentState.memoryStorage` to use an in-memory storage.
 */
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

    const [state, setState] = React.useState<T>(getStoredValue);

    React.useEffect(() => {
        if (!storage) storage = localStorage;
        storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);

    return [state, setState];
}

class MemoryStorage implements Storage {
    private data: Record<string, string> = {};

    get length(): number {
        return Object.keys(this.data).length;
    }

    clear(): void {
        this.data = {};
    }

    getItem(key: string): string | null {
        return this.data[key] ?? null;
    }

    key(index: number): string | null {
        return Object.keys(this.data)[index] ?? null;
    }

    removeItem(key: string): void {
        delete this.data[key];
    }

    setItem(key: string, value: string): void {
        this.data[key] = value;
    }
}

usePersistentState.memoryStorage = new MemoryStorage();
