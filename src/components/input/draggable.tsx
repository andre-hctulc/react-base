import React, { type FC, type Ref } from "react";
import type { StyleProps } from "../../types/index.js";
import clsx from "clsx";

interface DraggableProps extends StyleProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;
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
            className={clsx("inline-block", className)}
            style={style}
        >
            {children}
        </div>
    );
};
