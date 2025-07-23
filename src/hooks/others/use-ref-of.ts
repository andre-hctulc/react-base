"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Returns a ref that always points to the latest value
 */
export function useRefOf<T>(value: T): RefObject<T> {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    // We cannot return the ref directly, because it would cause scope issues,
    // which is why one would use this hook in the first place.
    return ref;
}
