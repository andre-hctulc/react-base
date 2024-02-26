import React from "react";

export default function useSet<T>(iterable: Iterable<T>): Set<T> {
    const set = React.useMemo(() => new Set(iterable), [iterable]);
    return set;
}
