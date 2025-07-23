"use client";

import React, { type FC } from "react";
import type { PropsOf } from "../../types/index.js";

interface DroppableProps extends PropsOf<"div"> {
    disabled?: boolean;
}

/**
 * ### Props
 * - `disabled`
 */
export const Droppable: FC<DroppableProps> = ({
    disabled,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    children,
    ...props
}) => {
    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        onDrop?.(e);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        onDragOver?.(e);
    }

    function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        onDragEnter?.(e);
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        if (disabled) return;
        onDragLeave?.(e);
    }

    return (
        <div
            {...props}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
        >
            {children}
        </div>
    );
};
