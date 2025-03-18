import React from "react";
import type { StyleProps } from "../../types/index.js";
import clsx from "clsx";
import { withPrefix } from "../../util/system.js";

interface DraggableProps extends StyleProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;
}

export const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>((props, ref) => {
    function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
        props.onDragStart?.(e);
    }

    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        props.onDragEnd?.(e);
    }

    return (
        <div
            ref={ref}
            draggable={!props.disabled}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            className={clsx("inline-block", props.className)}
            style={props.style}
        >
            {props.children}
        </div>
    );
});

Draggable.displayName = withPrefix("Draggable");
