"use client";

import React from "react";
import type { StyleProps } from "../../types";
import clsx from "clsx";
import { withPrefix } from "../../util/system";

interface DroppableProps extends StyleProps {
    children?: React.ReactNode;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
    disabled?: boolean;
}

export const Droppable = React.forwardRef<HTMLDivElement, DroppableProps>((props, ref) => {
    const disabled = props.disabled;

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        props.onDrop?.(e);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        props.onDragOver?.(e);
    }

    function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        props.onDragEnter?.(e);
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        props.onDragLeave?.(e);
    }

    return (
        <div
            ref={ref}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            className={clsx(props.className)}
            style={props.style}
        >
            {props.children}
        </div>
    );
});

Droppable.displayName = withPrefix("Droppable");
