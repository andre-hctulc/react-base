import React from "react";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface DraggableProps extends StyleProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;
}

const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>((props, ref) => {
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
            {...styleProps({ className: "inline-block" }, props)}
        >
            {props.children}
        </div>
    );
});

Draggable.displayName = "Draggable";

export default Draggable;
