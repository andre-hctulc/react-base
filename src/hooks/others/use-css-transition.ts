"use client";

import { useEffect, useRef, useState } from "react";
import {
    TransitionState,
    type TransitionClasses,
    type TransitionEvents,
} from "../../components/transitions/transition.js";

interface UseCSSTransitionResult {
    ref: React.RefObject<HTMLElement | null>;
    mounted: boolean;
    state: TransitionState;
}

export function useCSSTransition(
    show: boolean,
    classes: TransitionClasses,
    events: TransitionEvents,
    appear: boolean = false
): UseCSSTransitionResult {
    const [state, setState] = useState<TransitionState>(
        show ? (appear ? TransitionState.Hidden : TransitionState.Entered) : TransitionState.Hidden
    );
    const [mounted, setMounted] = useState(show);
    const elementRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    const clearTimeout = () => {
        if (timeoutRef.current) {
            global.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    };

    const executeTransition = async (element: HTMLElement, fromClass: string, toClass: string) => {
        return new Promise<void>((resolve) => {
            const cleanup = () => {
                element.removeEventListener("transitionend", handleTransitionEnd);
                element.removeEventListener("animationend", handleTransitionEnd);
                clearTimeout();
            };

            const handleTransitionEnd = (event: Event) => {
                if (event.target === element) {
                    cleanup();
                    resolve();
                }
            };

            element.addEventListener("transitionend", handleTransitionEnd);
            element.addEventListener("animationend", handleTransitionEnd);

            // Fallback timeout
            timeoutRef.current = setTimeout(() => {
                cleanup();
                resolve();
            }, 500);

            // Force reflow
            element.offsetHeight;

            // Apply transition classes
            element.classList.remove(fromClass);
            element.classList.add(toClass);
        });
    };

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        if (show && state === TransitionState.Hidden) {
            setMounted(true);
            setState(TransitionState.Entering);

            events.onBeforeEnter?.();

            // Apply initial classes
            if (classes.enter) element.classList.add(classes.enter);
            if (classes.enterFrom) element.classList.add(classes.enterFrom);

            requestAnimationFrame(async () => {
                if (classes.enterFrom && classes.enterTo) {
                    await executeTransition(element, classes.enterFrom, classes.enterTo);
                } else {
                    // If no transition classes, just wait a frame
                    await new Promise((resolve) => requestAnimationFrame(() => resolve(void 0)));
                }

                if (classes.enter) element.classList.remove(classes.enter);
                if (classes.enterTo) element.classList.remove(classes.enterTo);

                setState(TransitionState.Entered);
                events.onAfterEnter?.();
            });
        } else if (!show && state === TransitionState.Entered) {
            setState(TransitionState.Leaving);

            events.onBeforeLeave?.();

            // Apply leave classes
            if (classes.leave) element.classList.add(classes.leave);
            if (classes.leaveFrom) element.classList.add(classes.leaveFrom);

            requestAnimationFrame(async () => {
                if (classes.leaveFrom && classes.leaveTo) {
                    await executeTransition(element, classes.leaveFrom, classes.leaveTo);
                } else {
                    // If no transition classes, just wait a frame
                    await new Promise((resolve) => requestAnimationFrame(() => resolve(void 0)));
                }

                if (classes.leave) element.classList.remove(classes.leave);
                if (classes.leaveTo) element.classList.remove(classes.leaveTo);

                setState(TransitionState.Hidden);
                setMounted(false);
                events.onAfterLeave?.();
            });
        }

        return clearTimeout;
    }, [show, state, classes, events]);

    // Handle appear transition
    useEffect(() => {
        if (appear && show && state === TransitionState.Hidden && mounted) {
            setState(TransitionState.Entering);
        }
    }, [appear, show, state, mounted]);

    return {
        ref: elementRef,
        mounted,
        state,
    };
}
