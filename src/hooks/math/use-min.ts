import React from "react";

export function useMin(...values: number[]): number {
    const m = React.useMemo(() => Math.min(...values), values);
    return m;
}
