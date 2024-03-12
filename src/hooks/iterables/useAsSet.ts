import React from "react";

export default function useAsSet<T>(iterable: Iterable<T>, deps?: React.DependencyList): Set<T> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const set = React.useMemo(() => new Set(iterable), [iterable, ...(deps || [])]);
    return set;
}


