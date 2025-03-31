import React from "react";

interface PromiseListeners {
    onError?: (error: any) => void;
    onSuccess?: (result: any) => void;
}

export interface UsePromiseResult<T = any, E = Error> {
    data: T | undefined;
    isPending: boolean;
    resolved: boolean;
    error: E | null;
    promise: (prom: Promise<T>) => void;
    isError: boolean;
}

/**
 * A hook to handle promises. The hook always represents the state of the latest promise.
 */
export function usePromise<T = any, E = Error>(listeners?: PromiseListeners): UsePromiseResult<T, E> {
    const [data, setData] = React.useState<T>();
    const [isPending, setIsPending] = React.useState(false);
    const [resolved, setResolved] = React.useState(false);
    const [error, setError] = React.useState<E | null>(null);
    const [currentPromise, promise] = React.useState<Promise<T>>();

    React.useEffect(() => {
        let interrupted = false;

        if (!currentPromise) {
            setData(undefined);
            setIsPending(false);
            setResolved(false);
            setError(null);
            return;
        }

        setIsPending(true);

        currentPromise
            .then((data) => {
                if (interrupted) return;
                setIsPending(false);
                setData(data);
                setResolved(true);
                setError(null);
                if (listeners?.onSuccess) {
                    listeners.onSuccess(data);
                }
            })
            .catch((err) => {
                if (interrupted) return;
                setIsPending(false);
                setData(undefined);
                setResolved(true);
                setError(err);
                if (listeners?.onError && error) {
                    listeners.onError(error);
                }
            });

        return () => {
            interrupted = true;
        };
    }, [currentPromise]);

    return {
        data,
        isPending,
        resolved,
        error,
        promise: promise,
        isError: error !== null,
    };
}
