"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

/*

The 'storage' event is fired when a storage area (localStorage or sessionStorage) changes in another document (e.g., a different tab). 

We fire a custom event to notify other same-tab listeners about the change.

*/

type LocalStorageChangeEvent = {
    key: string;
    newValue: any;
};

const CUSTOM_EVENT_NAME = "use-persistent-state-storage-change";

type StorageRef = Storage | "sessionStorage" | "localStorage" | undefined;

/**
 * Resolves the storage reference dynamically based on the provided storage parameter.
 * {@link StorageRef} can be a string reference, to prevent issues with passing storage instances from server to client components.
 */
function getStorage(storage: StorageRef): Storage | undefined {
    if (storage === "sessionStorage") {
        if (typeof window === "undefined") {
            return undefined;
        }
        return sessionStorage;
    } else if (storage === "localStorage" || storage === undefined) {
        if (typeof window === "undefined") {
            return undefined;
        }
        return localStorage;
    } else {
        return storage;
    }
}

function readStoredValue<T>(store: Storage, key: string): T | undefined {
    const storedValue = store.getItem(key);
    if (storedValue === null) {
        return undefined;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch {
        return undefined;
    }
}

function readStoredValueFromString<T>(storedValue: string | null, fallback: T): T {
    if (storedValue === null) {
        return fallback;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch {
        return fallback;
    }
}

export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    storage?: StorageRef,
    /**
     * Read storage during the initial client render. Only use this for components
     * that are never server-rendered, as it can otherwise cause a hydration mismatch.
     */
    immediate = false,
): [T, Dispatch<SetStateAction<T>>] {
    const initialKey = useRef(key);
    const [state, setState] = useState<T>(() => {
        if (!immediate) {
            return defaultValue;
        }

        const store = getStorage(storage);
        return store ? (readStoredValue<T>(store, key) ?? defaultValue) : defaultValue;
    });
    const [loadedKey, setLoadedKey] = useState<string | null>(null);

    // Hydrate from storage after the initial render so SSR and client markup match.
    useEffect(() => {
        if (immediate && initialKey.current === key) {
            setLoadedKey(key);
            return;
        }

        const store = getStorage(storage);
        if (!store) {
            setLoadedKey(key);
            return;
        }

        const storedValue = readStoredValue<T>(store, key);
        if (storedValue !== undefined) {
            setState(storedValue);
        }

        setLoadedKey(key);
    }, [immediate, key, storage]);

    // Update storage and dispatch custom event
    useEffect(() => {
        const store = getStorage(storage);
        if (!store || loadedKey !== key) {
            return;
        }

        if (state === undefined) {
            store.removeItem(key);
        } else {
            store.setItem(key, JSON.stringify(state));
        }

        // Dispatch custom event to notify other same-tab listeners
        const customEvent = new CustomEvent<LocalStorageChangeEvent>(CUSTOM_EVENT_NAME, {
            detail: { key, newValue: state },
        });
        window.dispatchEvent(customEvent);
    }, [key, state, storage, loadedKey]);

    useEffect(() => {
        const store = getStorage(storage);
        if (!store || loadedKey !== key) {
            return;
        }

        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea === store && event.key === key) {
                setState(readStoredValueFromString<T>(event.newValue, defaultValue));
            }
        };

        const handleCustomStorage = (event: CustomEvent<LocalStorageChangeEvent>) => {
            if (event.detail.key === key) {
                setState(event.detail.newValue);
            }
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener(CUSTOM_EVENT_NAME, handleCustomStorage as EventListener);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomStorage as EventListener);
        };
    }, [key, storage, loadedKey, defaultValue]);

    return [state, setState];
}
