"use client";

import React from "react";

interface WheelXProps {
    children: React.ReactElement;
}

/**
 * A component that allows horizontal scrolling with the mouse wheel.
 */
export const WheelX: React.FC<WheelXProps> = ({ children }) => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    // Use native event listeners. This does not work with React's synthetic events.
    React.useEffect(() => {
        if (!container) return;

        const aborterController = new AbortController();

        container.addEventListener(
            "wheel",
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                container.scrollLeft += e.deltaY;
            },
            { signal: aborterController.signal }
        );

        return () => {
            aborterController.abort();
        };
    }, [container]);

    return React.cloneElement(children, { ...children.props, ref: setContainer });
};
