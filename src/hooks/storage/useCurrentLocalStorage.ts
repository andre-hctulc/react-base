"use client";

import { useLocalStorage } from "usehooks-ts";
import { useStorage } from "./StorageProvider";
import React from "react";

type CurrentLocalStorage<T> = [T, (value: T) => void];

/** Benutzt `useLocalStorage` in Kontext von `StorageContext` */
export default function useCurrentLocalStorage<T = string>(
    key: string,
    initalValue: T,
    options?: { ignorePrefixes?: boolean; prefix?: boolean }
): CurrentLocalStorage<T> {
    const storageContext = useStorage();
    const prefix = React.useMemo(() => {
        if (options?.ignorePrefixes) return "";
        let pre = [storageContext.prefix || "", options?.prefix || ""].filter(pre => !!pre).join("-");
        if (pre) return (pre = pre + "-");
        else return "";
    }, [options?.prefix, storageContext.prefix, options?.ignorePrefixes]);

    const [value, setValue] = useLocalStorage<T>(`${prefix}${key}`, initalValue);

    return [value, setValue];
}
