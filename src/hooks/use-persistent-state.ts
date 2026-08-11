"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

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
function getStorage(storage: StorageRef): Storage {
    if (storage === "sessionStorage") {
        return sessionStorage;
    } else if (storage === "localStorage" || storage === undefined) {
        return localStorage;
    } else {
        return storage;
    }
}

export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    storage?: StorageRef,
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const store = getStorage(storage);
        const storedValue = store.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    // Update storage and dispatch custom event
    useEffect(() => {
        const store = getStorage(storage);

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
    }, [key, state, storage]);

    useEffect(() => {
        const store = getStorage(storage);

        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea === store && event.key === key) {
                setState(event.newValue ? JSON.parse(event.newValue) : defaultValue);
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
    }, [key, storage]);

    return [state, setState];
}
