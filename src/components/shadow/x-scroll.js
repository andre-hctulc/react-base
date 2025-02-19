"use client";
import React from "react";
import { hideScrollbar as hide } from "../../util";
/**
 * A component that allows horizontal scrolling with the mouse wheel.
 */
export const XScroll = ({ children, hideScrollbar }) => {
    const [container, setContainer] = React.useState(null);
    // Use native event listeners. This does not work with React's synthetic events.
    React.useEffect(() => {
        if (!container)
            return;
        const aborterController = new AbortController();
        if (hideScrollbar) {
            hide(container);
        }
        container.addEventListener("wheel", (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.scrollLeft += e.deltaY;
        }, { signal: aborterController.signal });
        return () => {
            aborterController.abort();
        };
    }, [container]);
    return React.cloneElement(children, { ref: setContainer });
};
