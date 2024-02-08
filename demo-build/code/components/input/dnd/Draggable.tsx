import React from "react";

interface DraggableProps {
    className?: string;
    style?: React.CSSProperties;
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
        <div ref={ref} draggable={!props.disabled} onDragEnd={handleDragEnd} onDragStart={handleDragStart} className={props.className} style={props.style}>
            {props.children}
        </div>
    );
});

Draggable.displayName = "Draggable";

export default Draggable;
