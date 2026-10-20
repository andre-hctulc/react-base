"use client";

import { type ComponentProps, type DragEvent, type FC } from "react";

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
    function handleDrop(e: DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        onDrop?.(e);
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        if (disabled) return;
        e.preventDefault();
        onDragOver?.(e);
    }

    function handleDragEnter(e: DragEvent<HTMLDivElement>) {
        if (disabled) return;
        onDragEnter?.(e);
    }

    function handleDragLeave(e: DragEvent<HTMLDivElement>) {
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
