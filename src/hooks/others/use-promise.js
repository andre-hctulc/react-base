import React from "react";
/**
 * A hook to handle promises.
 */
export function usePromise(listeners) {
    const [data, setData] = React.useState();
    const [isPending, setIsPending] = React.useState(false);
    const [resolved, setResolved] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentPromise, promise] = React.useState();
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
            if (interrupted)
                return;
            setIsPending(false);
            setData(data);
            setResolved(true);
            setError(null);
            if (listeners?.onSuccess) {
                listeners.onSuccess(data);
            }
        })
            .catch((err) => {
            if (interrupted)
                return;
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
    return { data, isPending, resolved, error, promise, isError: error !== null };
}
