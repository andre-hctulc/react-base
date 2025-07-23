"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { withPrefix } from "../../util/system.js";

/*

The 'storage' event is fired when a storage area (localStorage or sessionStorage) changes in another document (e.g., a different tab). 

We fire a custom event to notify other same-tab listeners about the change.

*/

type LocalStorageChangeEvent = {
    key: string;
    newValue: any;
};

const CUSTOM_EVENT_NAME = withPrefix("storage_change");

export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    storage: Storage = localStorage
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const storedValue = storage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    // Update storage and dispatch custom event
    useEffect(() => {
        if (state === undefined) {
            storage.removeItem(key);
        } else {
            storage.setItem(key, JSON.stringify(state));
        }

        // Dispatch custom event to notify other same-tab listeners
        const customEvent = new CustomEvent<LocalStorageChangeEvent>(CUSTOM_EVENT_NAME, {
            detail: { key, newValue: state },
        });
        window.dispatchEvent(customEvent);
    }, [key, state, storage]);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea === storage && event.key === key) {
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
