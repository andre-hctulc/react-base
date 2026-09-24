"use client";

import {
    useCallback,
    useRef,
    type RefObject,
    type UIEvent,
    type UIEventHandler,
    type WheelEventHandler,
} from "react";
import { useRefOf } from "./use-ref-of.js";

export interface ScrollObserverEvent {
    currentOffset: number;
    element: HTMLElement;
    event: UIEvent<HTMLElement>;
    scrollTop: number;
}

export interface ScrollObserverMetrics {
    currentOffset: number;
    isAtEnd: boolean;
    isAtStart: boolean;
    scrollTop: number;
}

export interface UseScrollObserverOptions {
    onReachEnd?: (event: ScrollObserverEvent) => void;
    onReachStart?: (event: ScrollObserverEvent) => void;
    /**
     * The offset (px) from the bottom of the container at which to trigger the end reach.
     * @default 0
     */
    endOffset?: number;
    /**
     * The offset (px) from the top of the container at which to trigger the start reach.
     * @default 0
     */
    startOffset?: number;
}

export interface ScrollObserver {
    handleScroll: UIEventHandler<HTMLElement>;
    handleWheel: WheelEventHandler<HTMLElement>;
    getMetrics: (element: HTMLElement) => ScrollObserverMetrics;
    // /**
    //  * Refreshes the scroll observer and returns the current scroll metrics if the element is available.
    //  *
    //  * It
    //  * - Recalculates the current scroll metrics.
    //  * - Updates the active state for start and end reach.
    //  * - Invokes the corresponding callbacks if the start or end is reached.
    //  */
    // refresh: () => ScrollObserverMetrics | undefined;
}

export function useScrollObserver({
    onReachEnd,
    onReachStart,
    endOffset = 0,
    startOffset = 0,
}: UseScrollObserverOptions): ScrollObserver {
    const isEndActiveRef = useRef(false);
    const isStartActiveRef = useRef(false);
    const onReachEndRef = useRefOf(onReachEnd);
    const onReachStartRef = useRefOf(onReachStart);
    const endOffsetRef = useRefOf(endOffset);
    const startOffsetRef = useRefOf(startOffset);

    const getMetrics = useCallback((element: HTMLElement): ScrollObserverMetrics => {
        const currentOffset = element.scrollHeight - element.scrollTop - element.clientHeight;
        return {
            currentOffset,
            isAtEnd: currentOffset <= endOffsetRef.current,
            isAtStart: element.scrollTop <= startOffsetRef.current,
            scrollTop: element.scrollTop,
        };
    }, []);

    const observe = useCallback(
        (element: HTMLElement, event?: UIEvent<HTMLElement>) => {
            const metrics = getMetrics(element);

            if (metrics.isAtEnd && !isEndActiveRef.current && event) {
                isEndActiveRef.current = true;
                onReachEndRef.current?.({ ...metrics, element, event });
            } else if (!metrics.isAtEnd) {
                isEndActiveRef.current = false;
            }

            if (metrics.isAtStart && !isStartActiveRef.current && event) {
                isStartActiveRef.current = true;
                onReachStartRef.current?.({ ...metrics, element, event });
            } else if (!metrics.isAtStart) {
                isStartActiveRef.current = false;
            }

            return metrics;
        },
        [getMetrics],
    );

    const handleScroll = useCallback<UIEventHandler<HTMLElement>>(
        (event) => {
            observe(event.currentTarget, event);
        },
        [observe],
    );

    const handleWheel = useCallback<WheelEventHandler<HTMLElement>>(
        (event) => {
            if (event.deltaY > 0) {
                isEndActiveRef.current = false;
            } else if (event.deltaY < 0) {
                isStartActiveRef.current = false;
            }
            observe(event.currentTarget, event);
        },
        [observe],
    );

    return { handleScroll, handleWheel, getMetrics };
}
