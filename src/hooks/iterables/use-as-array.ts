import React from "react";

export function useAsArray<T>(iterable: Iterable<T>) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const array = React.useMemo(() => Array.from(iterable), [iterable]);
    return array;
}
