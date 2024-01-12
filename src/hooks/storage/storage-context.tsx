"use client";

import React from "react";

export const StorageContext = React.createContext<{ storage?: Storage; prefix?: string; jsonReviver?: (key: string, value: any) => any }>({});

export function useStorageContext() {
    const context =  React.useContext(StorageContext);
    return context;
}

export default function StorageContextProvider(props: {
    children?: React.ReactNode;
    storage?: Storage;
    prefix?: string;
    jsonReviver?: (key: string, value: any) => any;
}) {
    return <StorageContext.Provider value={{ storage: props.storage, prefix: props.prefix, jsonReviver: props.jsonReviver }}>{props.children}</StorageContext.Provider>;
}
