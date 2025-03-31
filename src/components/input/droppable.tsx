"use client";

import React, { type FC, type Ref } from "react";
import type { StyleProps } from "../../types/index.js";
import clsx from "clsx";

interface DroppableProps extends StyleProps {
    children?: React.ReactNode;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    ref?: Ref<HTMLDivElement>;
}

export const Droppable: FC<DroppableProps> = ({
    className,
    style,
    children,
    disabled,
    ref,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
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
            ref={ref}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            className={clsx(className)}
            style={style}
        >
            {children}
        </div>
    );
};
