import React from "react";
export function useMax(...values) {
    const m = React.useMemo(() => Math.max(...values), values);
    return m;
}
