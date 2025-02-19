import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import clsx from "clsx";
import { withPrefix } from "../../util/system";
export const Draggable = React.forwardRef((props, ref) => {
    function handleDragStart(e) {
        props.onDragStart?.(e);
    }
    function handleDragEnd(e) {
        props.onDragEnd?.(e);
    }
    return (_jsx("div", { ref: ref, draggable: !props.disabled, onDragEnd: handleDragEnd, onDragStart: handleDragStart, className: clsx("inline-block", props.className), style: props.style, children: props.children }));
});
Draggable.displayName = withPrefix("Draggable");
