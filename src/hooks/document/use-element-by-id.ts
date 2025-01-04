import React from "react";
import type { Falsy } from "../../types";

export function useElementById(id: string | Falsy, deps?: React.DependencyList) {
    const [element, setElement] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (id) {
            setElement(document.getElementById(id));
        }
    }, [id, ...(deps || [])]);

    return element;
}
