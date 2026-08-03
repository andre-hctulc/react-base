"use client";

import { type CSSProperties, type DragEventHandler, type FC, type ReactNode, type Ref } from "react";
import { cn as twMerge } from "@/util/cn.util.js";

export interface DraggableProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    onDragStart?: DragEventHandler<HTMLDivElement>;
    onDragEnd?: DragEventHandler<HTMLDivElement>;
    ref?: Ref<HTMLDivElement>;
}

export const Draggable: FC<DraggableProps> = ({
    disabled,
    className,
    style,
    children,
    ref,
    onDragEnd,
    onDragStart,
}) => {
    function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
        onDragStart?.(e);
    }

    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        onDragEnd?.(e);
    }

    return (
        <div
            ref={ref}
            draggable={!disabled}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            className={twMerge("inline-block", className)}
            style={style}
        >
            {children}
        </div>
    );
};
