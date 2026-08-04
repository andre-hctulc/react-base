"use client";

import React from "react";

type Falsy = false | 0 | "" | null | undefined;

export function useElementById(id: string | Falsy, deps?: React.DependencyList) {
    const [element, setElement] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (id) {
            setElement(document.getElementById(id));
        }
    }, [id, ...(deps || [])]);

    return element;
}
