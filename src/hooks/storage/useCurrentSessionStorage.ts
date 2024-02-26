"use client";

import useStorage, { CurrentStorage } from "./useStorage";

/** Benutzt `useLocalStorage` in Kontext von `StorageContext` */
export default function useCurrentSessionStorage<T = string>(
    key: string,
    initalValue: T | (() => T),
    options?: { ignorePrefixes?: boolean; prefix?: boolean }
): CurrentStorage<T> {
    const storage = useStorage(key, initalValue, { ...options, storage: "sessionStorage" });
    return storage;
}
