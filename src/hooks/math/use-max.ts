"use client";

import React from "react";

export function useMax(...values: number[]): number {
    const m = React.useMemo(() => Math.max(...values), values);
    return m;
}
