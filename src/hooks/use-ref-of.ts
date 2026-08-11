"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Returns a ref that always points to the latest {@link value}
 */
export function useRefOf<T>(value: T): RefObject<T> {
    const ref = useRef<T>(value);
    const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

    useIsomorphicLayoutEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
