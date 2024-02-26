"use client";

import useStorage, { CurrentStorage } from "./useStorage";

/** Benutzt `useLocalStorage` in Kontext von `StorageContext` */
export default function useCurrentLocalStorage<T = string>(
    key: string,
    initalValue: T | (() => T),
    options?: { ignorePrefixes?: boolean; prefix?: boolean }
): CurrentStorage<T> {
    const [value, setValue] = useStorage(key, initalValue, { ...options, storage: "localStorage" });
    return [value, setValue];
}
