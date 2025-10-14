"use client";

import { cloneElement, useEffect, useState } from "react";
import { hideScrollbar as hide } from "../../util/style.js";

interface XScrollProps {
    /**
     * The container element that will be scrolled horizontally.
     * Must forward the ref.
     */
    children: React.ReactElement<any>;
    /**
     * Hide the scrollbar of the container?
     */
    hideScrollbar?: boolean;
}

/**
 * A component that allows horizontal scrolling with the mouse wheel.
 */
export const XScroll: React.FC<XScrollProps> = ({ children, hideScrollbar }) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    // Use native event listeners. This does not work with React's synthetic events.
    useEffect(() => {
        if (!container) return;

        const aborterController = new AbortController();

        if (hideScrollbar) {
            hide(container);
        }

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

    return cloneElement(children, { ref: setContainer });
};
