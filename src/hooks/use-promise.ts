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
    isSuccess: boolean;
    isFinished: boolean;
    error: E | undefined;
    promise: (promise: Promise<T>) => void;
}

/**
 * A hook to handle promises. The hook always represents the state of the latest promise.
 */
export function usePromise<T = any, E = unknown>(listeners?: PromiseListeners<T, E>): UsePromiseResult<T, E> {
    const [data, setData] = useState<T>();
    const [isPending, setIsPending] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState<E | undefined>(undefined);
    const currentPromise = useRef<Promise<T> | null>(null);
    const errorListener = useRefOf(listeners?.onError);
    const successListener = useRefOf(listeners?.onSuccess);

    const promise = useCallback((newPromise: Promise<T>) => {
        currentPromise.current = newPromise;

        if (!currentPromise) {
            setData(undefined);
            setIsPending(false);
            setIsFinished(false);
            setError(undefined);
            return;
        }

        setIsPending(true);
        setIsFinished(false);
        setError(undefined);
        setData(undefined);

        newPromise
            .then((data) => {
                successListener.current?.(data);
                if (currentPromise.current !== newPromise) return;
                setIsPending(false);
                setData(data);
                setIsFinished(true);
                setError(undefined);
            })
            .catch((err) => {
                errorListener.current?.(err);
                if (currentPromise.current !== newPromise) return;
                setIsPending(false);
                setData(undefined);
                setIsFinished(true);
                setError(err);
            });
    }, []);

    return {
        data,
        isPending,
        isFinished,
        error,
        promise,
        isSuccess: error !== undefined,
    };
}
