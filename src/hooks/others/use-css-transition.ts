"use client";

import { useEffect, useRef, useState } from "react";
import {
    TransitionState,
    type TransitionClasses,
    type TransitionEvents,
} from "../../components/transitions/transition.js";
import { addCssClasses, removeCssClasses } from "../../util/style.js";

interface UseCssTransitionResult {
    ref: React.RefObject<HTMLElement | null>;
    mounted: boolean;
    state: TransitionState;
}

export function useCssTransition(
    show: boolean,
    classes: TransitionClasses,
    events: TransitionEvents,
    appear: boolean = false
): UseCssTransitionResult {
    // Initialize state - always start hidden when show=true to trigger transitions
    const [state, setState] = useState<TransitionState>(() => {
        return show ? TransitionState.Hidden : TransitionState.Hidden;
    });

    const [mounted, setMounted] = useState(show);
    const elementRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const transitionEndListenerRef = useRef<((event: TransitionEvent) => void) | null>(null);
    const hasInitialized = useRef(false);

    const clearTimeoutRef = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    };

    const clearTransitionListener = (element: HTMLElement) => {
        if (transitionEndListenerRef.current) {
            element.removeEventListener("transitionend", transitionEndListenerRef.current);
            transitionEndListenerRef.current = null;
        }
    };

    const interruptCurrentTransition = (element: HTMLElement) => {
        clearTimeoutRef();
        clearTransitionListener(element);
    };

    // Clean up all transition classes
    const cleanupClasses = (element: HTMLElement) => {
        const allClasses = [
            classes.enter,
            classes.enterFrom,
            classes.enterTo,
            classes.leave,
            classes.leaveFrom,
            classes.leaveTo,
        ].filter(Boolean);

        allClasses.forEach((cls) => {
            if (cls) removeCssClasses(element, cls);
        });
    };

    // Execute enter transition
    const executeEnter = async (element: HTMLElement) => {
        // Interrupt any ongoing transition
        interruptCurrentTransition(element);

        events.onBeforeEnter?.();
        setState(TransitionState.Entering);

        // Clean up any existing classes
        cleanupClasses(element);

        // Apply enter and enterFrom classes immediately
        if (classes.enter) addCssClasses(element, classes.enter);
        if (classes.enterFrom) addCssClasses(element, classes.enterFrom);

        // Force reflow
        element.offsetHeight;

        // Wait for next frame then start transition
        await new Promise<void>((resolve) => {
            requestAnimationFrame(() => {
                // Remove enterFrom and add enterTo
                if (classes.enterFrom) removeCssClasses(element, classes.enterFrom);
                if (classes.enterTo) addCssClasses(element, classes.enterTo);

                // Set up transition completion detection
                const handleTransitionEnd = (event: TransitionEvent) => {
                    if (event.target === element) {
                        clearTransitionListener(element);
                        clearTimeoutRef();
                        resolve();
                    }
                };

                transitionEndListenerRef.current = handleTransitionEnd;
                element.addEventListener("transitionend", handleTransitionEnd);

                // Fallback timeout
                timeoutRef.current = setTimeout(() => {
                    clearTransitionListener(element);
                    resolve();
                }, 1000);
            });
        });

        // Clean up transition-specific classes but keep persistent enter classes
        if (classes.enterTo) removeCssClasses(element, classes.enterTo);
        // Keep classes.enter as it contains persistent styles like overflow-hidden and transition properties

        setState(TransitionState.Entered);
        events.onAfterEnter?.();
    };

    // Execute leave transition
    const executeLeave = async (element: HTMLElement) => {
        // Interrupt any ongoing transition
        interruptCurrentTransition(element);

        events.onBeforeLeave?.();
        setState(TransitionState.Leaving);

        // Clean up enter classes and apply leave classes
        if (classes.enter) removeCssClasses(element, classes.enter);
        if (classes.enterFrom) removeCssClasses(element, classes.enterFrom);
        if (classes.enterTo) removeCssClasses(element, classes.enterTo);

        if (classes.leave) addCssClasses(element, classes.leave);
        if (classes.leaveFrom) addCssClasses(element, classes.leaveFrom);

        // Force reflow
        element.offsetHeight;

        // Wait for next frame then start transition
        await new Promise<void>((resolve) => {
            requestAnimationFrame(() => {
                // Remove leaveFrom and add leaveTo
                if (classes.leaveFrom) removeCssClasses(element, classes.leaveFrom);
                if (classes.leaveTo) addCssClasses(element, classes.leaveTo);

                // Set up transition completion detection
                const handleTransitionEnd = (event: TransitionEvent) => {
                    if (event.target === element) {
                        clearTransitionListener(element);
                        clearTimeoutRef();
                        resolve();
                    }
                };

                transitionEndListenerRef.current = handleTransitionEnd;
                element.addEventListener("transitionend", handleTransitionEnd);

                // Fallback timeout
                timeoutRef.current = setTimeout(() => {
                    clearTransitionListener(element);
                    resolve();
                }, 1000);
            });
        });

        // Clean up all leave classes
        cleanupClasses(element);
        setState(TransitionState.Hidden);
        setMounted(false);
        events.onAfterLeave?.();
    };

    // Handle initial setup on first render
    useEffect(() => {
        const element = elementRef.current;
        if (!element || hasInitialized.current) return;

        hasInitialized.current = true;

        if (show) {
            setMounted(true);

            if (appear) {
                // With appear=true, start transition immediately
                executeEnter(element);
            } else {
                // With appear=false, skip to entered state but apply persistent enter classes
                setState(TransitionState.Entered);
                if (classes.enter) {
                    addCssClasses(element, classes.enter);
                }
                events.onAfterEnter?.();
            }
        }
    }, [show, appear]);

    // Main transition effect for show/hide changes after initial render
    useEffect(() => {
        const element = elementRef.current;
        if (!element || !hasInitialized.current) return;

        if (show && (state === TransitionState.Hidden || state === TransitionState.Leaving)) {
            setMounted(true);
            executeEnter(element);
        } else if (!show && (state === TransitionState.Entered || state === TransitionState.Entering)) {
            executeLeave(element);
        }
    }, [show]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            const element = elementRef.current;
            if (element) {
                interruptCurrentTransition(element);
                cleanupClasses(element);
            }
        };
    }, []);

    return {
        ref: elementRef,
        mounted,
        state,
    };
}
