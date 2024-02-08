import { Falsy } from "u/src/utility-types";
import React from "react";

export default function useFilter<T = any>(arr: T[] | Falsy, filter: (item: T) => boolean) {
    const filtered = React.useMemo(() => {
        if (!arr) return null;
        return arr.filter(item => filter(item));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arr]);

    return filtered;
}
