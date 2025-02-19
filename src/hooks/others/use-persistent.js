import React from "react";
/**
 * Use `usePersistentState.memoryStorage` to use an in-memory storage.
 */
export function usePersistentState(key, defaultValue, storage) {
    // Get initial state from storage or use the default value
    const getStoredValue = () => {
        if (!storage)
            storage = localStorage;
        const storedValue = storage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    };
    const [state, setState] = React.useState(getStoredValue);
    React.useEffect(() => {
        if (!storage)
            storage = localStorage;
        storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);
    return [state, setState];
}
class MemoryStorage {
    data = {};
    get length() {
        return Object.keys(this.data).length;
    }
    clear() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key] ?? null;
    }
    key(index) {
        return Object.keys(this.data)[index] ?? null;
    }
    removeItem(key) {
        delete this.data[key];
    }
    setItem(key, value) {
        this.data[key] = value;
    }
}
usePersistentState.memoryStorage = new MemoryStorage();
