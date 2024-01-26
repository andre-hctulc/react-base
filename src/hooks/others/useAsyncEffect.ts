import React from "react";

export function useAsyncEffect<T>(effect: () => T | Promise<T>, then: (result: T) => void, deps: React.DependencyList) {
    React.useEffect(() => {
        const res = effect();

        let interrupted = false;

        if (res instanceof Promise) {
            res.then(result => {
                if (!interrupted) then(result);
            });
        } else then(res);

        return () => {
            interrupted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
