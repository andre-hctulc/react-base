"use client";

import React from "react";

interface StorageContext {
    prefix: string;
    jsonReviver?: (key: string, value: any) => any;
    addListener?: (storage: any, key: string, listener: (newVlaue: string | null) => void) => void;
    removeListener?: (storage: any, key: string, listener: (newVlaue: string | null) => void) => void;
    notify: (storage: any, key: string, newValue: string | null) => void;
}

export const StorageContext = React.createContext<StorageContext | null>(null);

export function useStorageContext<R extends boolean = false>(required?: R): R extends true ? StorageContext : StorageContext | null {
    const ctx = React.useContext(StorageContext);
    if (required && !ctx) throw new Error("`StorageProvider`required");
    return ctx as any;
}

interface StorageContextProviderProps {
    children?: React.ReactNode;
    prefix?: string;
    jsonReviver?: (key: string, value: any) => any;
}

export default function StorageProvider(props: StorageContextProviderProps) {
    /** `Map<storage, Map<key, Set<listener>>>` */
    const storageListeners = React.useRef(new Map<any, Map<string, Set<(newValue: any) => void>>>());
    const notify = React.useCallback((storage: any, key: string, newValue: string | null) => {
        const store = storageListeners.current.get(storage);
        const listeners = store?.get(key);
        listeners?.forEach(listener => listener(newValue));
    }, []);
    const addListener = React.useCallback((storage: any, key: string, listener: (newValue: string | null) => void) => {
        let store = storageListeners.current.get(storage);
        if (!store) storageListeners.current.set(storage, (store = new Map()));
        const set = store.get(key);
        if (set) set.add(listener);
        else store.set(key, new Set([listener]));
    }, []);
    const removeListener = React.useCallback((storage: any, key: string, listener: (newValue: string | null) => void) => {
        const store = storageListeners.current.get(storage);
        store?.get(key)?.delete(listener);
    }, []);

    return (
        <StorageContext.Provider value={{ prefix: props.prefix || "", jsonReviver: props.jsonReviver, notify, addListener, removeListener }}>
            {props.children}
        </StorageContext.Provider>
    );
}
