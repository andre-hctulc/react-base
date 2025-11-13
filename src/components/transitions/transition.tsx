"use client";

import {
    Fragment,
    cloneElement,
    isValidElement,
    type RefObject,
    type ReactElement,
    type ElementType,
    Children,
} from "react";
import { TransitionChild } from "./transition-child.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { useCssTransition } from "../../hooks/index.js";
import { TransitionContext } from "./transition-context.js";

export interface TransitionClasses {
    /**
     * Classes applied during entire enter transition. Kept after transition completes.
     */
    enter?: string;
    /**
     * Classes applied at the start of enter transition (initial state).
     */
    enterFrom?: string;
    /**
     * Classes applied during enter transition animation (target state).
     */
    enterTo?: string;
    /**
     * Classes applied during entire leave transition. Removed after transition completes.
     */
    leave?: string;
    /**
     * Classes applied at the start of leave transition (initial state).
     */
    leaveFrom?: string;
    /**
     * Classes applied during leave transition animation (target state).
     */
    leaveTo?: string;
}

export interface TransitionEvents {
    onBeforeEnter?: () => void;
    onAfterEnter?: () => void;
    onBeforeLeave?: () => void;
    onAfterLeave?: () => void;
}
export enum TransitionState {
    Hidden = "hidden",
    Entering = "entering",
    Entered = "entered",
    Leaving = "leaving",
}

interface TransitionProps extends TransitionClasses, TransitionEvents {
    show?: boolean;
    appear?: boolean;
    unmount?: boolean;
    children: ReactElement | ((ref: RefObject<HTMLElement | null>) => ReactElement);
    as?: ElementType;
    className?: string;
}

export function Transition({
    show = false,
    appear = false,
    unmount = true,
    children,
    as: Component = Fragment,
    className = "",
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo,
    onBeforeEnter,
    onAfterEnter,
    onBeforeLeave,
    onAfterLeave,
}: TransitionProps) {
    const classes = { enter, enterFrom, enterTo, leave, leaveFrom, leaveTo };
    const events: TransitionEvents = { onBeforeEnter, onAfterEnter, onBeforeLeave, onAfterLeave };

    const { ref, mounted } = useCssTransition(show, classes, events, appear);

    const contextValue = {
        show,
    };

    if (unmount && !mounted) return null;

    const content = (
        <TransitionContext.Provider value={contextValue}>
            {typeof children === "function" ? children(ref) : children}
        </TransitionContext.Provider>
    );

    if (typeof children === "function") {
        return content;
    }

    // Check if children contains TransitionChild components
    const hasTransitionChildren = Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === TransitionChild
    );

    if (hasTransitionChildren) {
        return content;
    }

    // Single child transition
    if (Component === Fragment && isValidElement(children)) {
        const childProps: any = children.props || {};

        return (
            <TransitionContext.Provider value={contextValue}>
                {cloneElement<any>(children, {
                    ref,
                    className: twMerge(childProps.className, className),
                    style: {
                        ...childProps.style,
                        display: mounted ? undefined : "none",
                    },
                })}
            </TransitionContext.Provider>
        );
    }

    return (
        <TransitionContext.Provider value={contextValue}>
            <Component ref={ref} className={className} style={{ display: mounted ? undefined : "none" }}>
                {children}
            </Component>
        </TransitionContext.Provider>
    );
}

// Default export for convenience
export default Transition;
