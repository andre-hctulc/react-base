"use client";

import { useCallback, useRef, useState } from "react";
import { useRefOf } from "./use-ref-of.js";

interface PromiseListeners<T = any, E = unknown> {
    onError?: (error: E) => void;
    onSuccess?: (result: T) => void;
}

export interface UsePromiseResult<T = any, E = unknown> {
    data: T | undefined;
    isPending: boolean;
    isResolved: boolean;
    isError: boolean;
    error: E | null;
    promise: (promise: Promise<T>) => void;
}

/**
 * A hook to handle promises. The hook always represents the state of the latest promise.
 */
export function usePromise<T = any, E = unknown>(listeners?: PromiseListeners<T, E>): UsePromiseResult<T, E> {
    const [data, setData] = useState<T>();
    const [isPending, setIsPending] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [error, setError] = useState<E | null>(null);
    const currentPromise = useRef<Promise<T> | null>(null);
    const errorListener = useRefOf(listeners?.onError);
    const successListener = useRefOf(listeners?.onSuccess);

    const promise = useCallback((newPromise: Promise<T>) => {
        currentPromise.current = newPromise;

        if (!currentPromise) {
            setData(undefined);
            setIsPending(false);
            setResolved(false);
            setError(null);
            return;
        }

        setIsPending(true);
        setResolved(false);
        setError(null);
        setData(undefined);

        newPromise
            .then((data) => {
                successListener.current?.(data);
                if (currentPromise.current !== newPromise) return;
                setIsPending(false);
                setData(data);
                setResolved(true);
                setError(null);
            })
            .catch((err) => {
                errorListener.current?.(err);
                if (currentPromise.current !== newPromise) return;
                setIsPending(false);
                setData(undefined);
                setResolved(true);
                setError(err);
            });
    }, []);

    return {
        data,
        isPending,
        isResolved: resolved,
        error,
        promise: promise,
        isError: error !== null,
    };
}
