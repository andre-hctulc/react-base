import React from "react";
export function useMin(...values) {
    const m = React.useMemo(() => Math.min(...values), values);
    return m;
}
