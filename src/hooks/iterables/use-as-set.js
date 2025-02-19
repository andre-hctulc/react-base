import React from "react";
export function useAsSet(iterable) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const set = React.useMemo(() => new Set(iterable), [iterable]);
    return set;
}
