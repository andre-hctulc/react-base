"use client";

import React from "react";

interface StorageContext {
    storage: Storage;
    prefix?: string;
    jsonReviver?: (key: string, value: any) => any;
}

export const StorageContext = React.createContext<StorageContext | null>(null);

export function useStorage() {
    const ctx = React.useContext(StorageContext);
    if (!ctx) throw new Error("`StorageContextProvider` required");
    return ctx;
}

interface StorageContextProviderProps {
    children?: React.ReactNode;
    storage: Storage;
    prefix?: string;
    jsonReviver?: (key: string, value: any) => any;
}

export default function StorageProvider(props: StorageContextProviderProps) {
    return <StorageContext.Provider value={{ storage: props.storage, prefix: props.prefix, jsonReviver: props.jsonReviver }}>{props.children}</StorageContext.Provider>;
}
