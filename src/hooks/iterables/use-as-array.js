import React from "react";
export function useAsArray(iterable) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const array = React.useMemo(() => Array.from(iterable), [iterable]);
    return array;
}
