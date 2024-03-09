import React from "react";
import { useStorageContext } from "../../components/others/StorageProvider";

function getStorage(storage: "localStorage" | "sessionStorage" | Storage) {
    if (typeof window === "undefined") return null;
    if (storage === "localStorage") return localStorage;
    if (storage === "sessionStorage") return sessionStorage;
    return storage || localStorage;
}

export type CurrentStorage<T> = [T, (newValue: T | null | ((prevValue: T) => T | null)) => void];

export default function useStorage<T = string>(
    key: string,
    initialValue: T | (() => T),
    options?: { storage?: "localStorage" | "sessionStorage" | Storage; ignorePrefixes?: boolean; prefix?: boolean }
): CurrentStorage<T> {
    const storageContext = useStorageContext(true);
    const prefix = React.useMemo(() => {
        if (options?.ignorePrefixes) return "";
        const pre = [storageContext.prefix || "", options?.prefix || ""].filter(pre => !!pre).join("-");
        if (pre) return pre;
        else return "";
    }, [options?.prefix, storageContext.prefix, options?.ignorePrefixes]);
    const k = prefix + key;
    const getInitial = () => {
        if (typeof initialValue === "function") return (initialValue as any)();
        return initialValue;
    };
    const [value, setValue] = React.useState(() => {
        const store = getStorage(options?.storage || "localStorage");

        if (!store) return initialValue;

        const storedValue = store.getItem(k);

        if (storedValue === null) {
            return getInitial();
        } else {
            try {
                return JSON.parse(storedValue, storageContext.jsonReviver) as T;
            } catch (err) {
                console.error(err);
                return getInitial();
            }
        }
    });

    React.useEffect(() => {
        const key = k;
        const store = getStorage(options?.storage || "localStorage");
        let listener: (newValue: any) => void;

        storageContext.addListener?.(
            store,
            key,
            (listener = (newValue: any) => {
                if (newValue === null) setValue(getInitial());
                else setValue(newValue);
            })
        );

        return () => {
            storageContext.removeListener?.(store, key, listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [k]);

    function _setValue(newValue: any) {
        let newV: any;
        const store = getStorage(options?.storage || "localStorage");

        if (!store) return;

        try {
            if (typeof newValue === "function") {
                const storedValue = store.getItem(k);
                const prevValue = storedValue === null ? getInitial() : JSON.parse(storedValue, storageContext.jsonReviver);
                newV = newValue(prevValue);
            } else {
                newV = newValue;
            }
            storageContext.notify?.(store, k, newV);
            if (newV === null) store.removeItem(k);
            else store.setItem(k, JSON.stringify(newV));
        } catch (err) {
            console.error(err);
        }
    }

    return [value, _setValue];
}
