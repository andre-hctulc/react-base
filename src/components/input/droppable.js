"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import clsx from "clsx";
import { withPrefix } from "../../util/system";
export const Droppable = React.forwardRef((props, ref) => {
    const disabled = props.disabled;
    function handleDrop(e) {
        if (disabled)
            return;
        e.preventDefault();
        props.onDrop?.(e);
    }
    function handleDragOver(e) {
        if (disabled)
            return;
        e.preventDefault();
        props.onDragOver?.(e);
    }
    function handleDragEnter(e) {
        if (disabled)
            return;
        props.onDragEnter?.(e);
    }
    function handleDragLeave(e) {
        if (disabled)
            return;
        props.onDragLeave?.(e);
    }
    return (_jsx("div", { ref: ref, onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDragEnter: handleDragEnter, className: clsx(props.className), style: props.style, children: props.children }));
});
Droppable.displayName = withPrefix("Droppable");
