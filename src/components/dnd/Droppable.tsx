"use client";

import React from "react";
import { useDND } from "../../providers/DNDProvider";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface DroppableProps extends StyleProps {
    children?: React.ReactNode;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
    disabled?: boolean;
}

const Droppable = React.forwardRef<HTMLDivElement, DroppableProps>((props, ref) => {
    const dnd = useDND();
    const disabled = dnd?.disabled || props.disabled;

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
            {...styleProps(props)}
        >
            {props.children}
        </div>
    );
});

Droppable.displayName = "Droppable";

export default Droppable;
