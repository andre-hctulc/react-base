"use client";

import { Fragment } from "react/jsx-runtime";
import type { TransitionClasses, TransitionEvents } from "./transition.js";
import { cloneElement, useContext } from "react";
import { TransitionContext } from "./transition-context.js";
import { useCssTransition } from "../../hooks/index.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

interface TransitionChildProps extends TransitionClasses, TransitionEvents {
    children: React.ReactElement | ((ref: React.RefObject<HTMLElement | null>) => React.ReactElement);
    as?: React.ElementType;
    className?: string;
}

export function TransitionChild({
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
}: TransitionChildProps) {
    const context = useContext(TransitionContext);
    const classes = { enter, enterFrom, enterTo, leave, leaveFrom, leaveTo };
    const events = { onBeforeEnter, onAfterEnter, onBeforeLeave, onAfterLeave };
    const { ref, mounted } = useCssTransition(!!context?.show, classes, events);

    if (!mounted) return null;

    if (typeof children === "function") {
        return children(ref);
    }

    if (Component === Fragment) {
        const childProps: any = children.props || {};

        return cloneElement<any>(children, {
            ref,
            className: twMerge(childProps.className, className),
        });
    }

    return (
        <Component ref={ref} className={className}>
            {children}
        </Component>
    );
}
