"use client";

import React from "react";

/**
 * Checks if the component is hydrated.
 */
export function useIsHydrated() {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    return hydrated;
}
