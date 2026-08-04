"use client";

import React, { type ComponentProps, type FC } from "react";

export interface DroppableProps extends ComponentProps<"div"> {
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
