import React from "react";

// TODO React.useTransition hier benutzen?

export default function usePromise<T = any, E = unknown>() {
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
            .then(data => {
                if (interrupted) return;
                setIsPending(false);
                setData(data);
                setResolved(true);
                setError(null);
            })
            .catch(err => {
                if (interrupted) return;
                setIsPending(false);
                setData(undefined);
                setResolved(true);
                setError(err);
            });

        return () => {
            interrupted = true;
        };
    }, [currentPromise]);

    return { data, isPending, resolved, error, promise };
}
