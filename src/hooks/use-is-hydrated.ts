"use client";

import { useEffect, useRef, useState } from "react";

export function useIsHydrated() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return hydrated;
}

export function useAfterHydration<T>(callback: () => T): T | undefined {
    const hydrated = useIsHydrated();
    const [result, setResult] = useState<T | undefined>(undefined);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (hydrated) {
            setResult(() => callbackRef.current());
        }
    }, [hydrated]);

    return result;
}
