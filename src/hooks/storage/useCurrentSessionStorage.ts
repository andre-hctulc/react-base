"use client";

import { useSessionStorage } from "usehooks-ts";
import { useStorage } from "./StorageProvider";
import React from "react";

type CurrentSessionStorage<T> = [T | undefined, (value: T) => void];

/** Benutzt `useSessionStorage` in Kontext von `StorageContext` */
export default function useCurrentSessionStorage<T = string>(
    key: string,
    initalValue: T,
    options?: { ignorePrefixes?: boolean; prefix?: boolean }
): CurrentSessionStorage<T> {
    const storageContext = useStorage();
    const prefix = React.useMemo(() => {
        if (options?.ignorePrefixes) return "";
        let pre = [storageContext.prefix || "", options?.prefix || ""].filter(pre => !!pre).join("-");
        if (pre) return (pre = pre + "-");
        else return "";
    }, [options?.prefix, storageContext.prefix, options?.ignorePrefixes]);

    const [value, setValue] = useSessionStorage(`${prefix}${key}`, initalValue);

    return [value as T | undefined, setValue as (value: T) => void];
}
