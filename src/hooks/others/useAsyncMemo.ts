import React from "react";

interface AsyncMemoOptions<T> {
    defaultValue?: T;
    keepPreviousData?: boolean;
    /** Zum Debuggen */
    id?: string;
}

/* 
`sId` wird hier dazu verwendet, den value mit den `deps` zu synchronisieren. Da der Value (`parsedValue.value`) in einem Effekt als Status gesetzt wird, kann es sein, 
dass sich die deps ändern, bevor sich der status ändert. Dann sind die `deps` und der Value asynchron.
 */

/**
 * _Es kann sein, dass es hier die `deps` und der Parsed Value asynchron sind. Das Problem scheint jedoch behoben zu sein! 🥳_
 * @param factory
 * @param deps
 * @param options `options.keepPreviousData = true` kann dazu führen, dass dies `deps` und der _Parsed Value_ asynchron sind
 * @returns _Parsed Value_
 * @deprecated
 */
export default function useAsyncMemo<T>(factory: () => T | Promise<T>, deps: React.DependencyList, options?: AsyncMemoOptions<T>): T | undefined {
    const [parsedValue, setParsedValue] = React.useState<{ value: T; stateId: number } | undefined>(
        options?.defaultValue ? { stateId: 0, value: options.defaultValue } : undefined
    );
    const stateId = React.useRef(0);
    // Memo verwenden, statt Effekt in Kombi mit Ref, da das nicht synchron mit den deps
    const sId = React.useMemo(() => {
        return (stateId.current = stateId.current + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    React.useEffect(() => {
        let interrupted = false;

        const effect = async () => {
            const sId = stateId.current;
            const parsedVlaue = await factory();

            if (!interrupted) {
                setParsedValue({ value: parsedVlaue, stateId: sId });
            }
        };

        effect();

        return () => {
            interrupted = true;
            if (!options?.keepPreviousData) setParsedValue(undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    if (parsedValue?.stateId === sId) return parsedValue.value;
    else if (options?.keepPreviousData) return parsedValue?.value;
    else return undefined;
}
