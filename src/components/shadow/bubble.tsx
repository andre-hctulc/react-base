import React from "react";

interface BubbleProps {
    eventProp: string;
    /**
     * Type for the dispatched custom event.
     * By default the original event type is used or
     * if no valid event is provided, `eventProp` is used as the event type.
     */
    eventType?: string;
    children: React.ReactElement<any>;
    /** `EventInit.cancelable` */
    cancelable?: boolean;
    /** `EventInit.composed` */
    composed?: boolean;
    /**
     * Defaults to the events target or null if the event is not a valid event.
     */
    eventTarget?: EventTarget | null;
    onBubble?: (ev: CustomEvent) => void;
    /**
     * The timeout in milliseconds before the custom event is dispatched.
     * This can be useful, when the event is dispatched before the children have processed the original event.
     */
    bubbleTimeout?: number;
}

const bubbleMarker = Symbol.for("rb_bubble_marker");

/**
 * Bubbles an event up the tree if the event is not already bubbling.
 *
 * A custom event is dispatched that mimics the original event.
 *
 * The custom events detail is an array of the original event arguments.
 *  */
export const Bubble: React.FC<BubbleProps> = ({
    eventProp,
    children,
    cancelable,
    composed,
    eventTarget,
    eventType,
    onBubble,
    bubbleTimeout,
}) => {
    const bubble = (...args: any) => {
        /** possibly `React.Event.nativeEvent` */
        const ev = args[0]?.nativeEvent;
        if (ev?.bubbles === true || args[0]?.[bubbleMarker]) return;

        children.props[eventProp]?.(...args);

        const customEvent = new CustomEvent(
            eventType ?? (typeof ev?.type === "string" ? ev.type : eventProp.toString()),
            {
                detail: args,
                bubbles: true,
                cancelable,
                composed,
            }
        );

        // Mark the event as bubbling
        Object.defineProperty(customEvent, bubbleMarker, { value: true, writable: false });

        const target: EventTarget | undefined = eventTarget || ev?.target?.parentElement;

        if (typeof target?.dispatchEvent === "function")
            setTimeout(() => target.dispatchEvent(customEvent), bubbleTimeout);

        onBubble?.(customEvent);
    };

    return React.cloneElement(children, { [eventProp]: bubble });
};
