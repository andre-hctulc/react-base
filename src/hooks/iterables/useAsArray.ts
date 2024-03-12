import React from "react";

export default function useAsArray<T>(iterable: Iterable<T>, deps?: React.DependencyList) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const array = React.useMemo(() => Array.from(iterable), [iterable, ...(deps || [])]);
    return array;
}
