import React from "react";
const bubbleMarker = Symbol.for("rb_bubble_marker");
/**
 * Bubbles an event up the tree if the event is not already bubbling.
 *
 * A custom event is dispatched that mimics the original event.
 *
 * The custom events detail is an array of the original event arguments.
 *  */
export const Bubble = ({ eventProp, children, cancelable, composed, eventTarget, eventType, onBubble, bubbleTimeout, }) => {
    const bubble = (...args) => {
        /** possibly `React.Event.nativeEvent` */
        const ev = args[0]?.nativeEvent;
        if (ev?.bubbles === true || args[0]?.[bubbleMarker])
            return;
        children.props[eventProp]?.(...args);
        const customEvent = new CustomEvent(eventType ?? (typeof ev?.type === "string" ? ev.type : eventProp.toString()), {
            detail: args,
            bubbles: true,
            cancelable,
            composed,
        });
        // Mark the event as bubbling
        Object.defineProperty(customEvent, bubbleMarker, { value: true, writable: false });
        const target = eventTarget || ev?.target?.parentElement;
        if (typeof target?.dispatchEvent === "function")
            setTimeout(() => target.dispatchEvent(customEvent), bubbleTimeout);
        onBubble?.(customEvent);
    };
    return React.cloneElement(children, { [eventProp]: bubble });
};
