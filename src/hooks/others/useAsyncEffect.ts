import React from "react";

/**
 * @deprecated
 */
export default function useAsyncEffect<T>(
    effect: () => Promise<T>,
    then: (result: T) => void,
    deps: React.DependencyList,
    error?: (err: unknown) => void
) {
    React.useEffect(() => {
        let interrupted = false;

        effect()
            .then(result => {
                if (!interrupted) then(result);
            })
            .catch(err => {
                if (!interrupted) error?.(err);
            });

        return () => {
            interrupted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
