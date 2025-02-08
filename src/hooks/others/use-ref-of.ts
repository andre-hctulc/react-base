"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref that always points to the latest value
 */
export function useRefOf<T>(value: T) {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
