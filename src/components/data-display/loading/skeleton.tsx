// * SSR

import { collapse } from "@client-util/helpers";
import { randomNumber } from "@client-util/random";
import clsx from "clsx";
import React from "react";

interface SkeletonProps {
    /** @default "rounded" */
    variant?: "rounded" | "rect" | "circular" | "rounded_lg";
    height?: number | string | [number, number];
    width?: number | string | [number, number];
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** @default true */
    pulse?: boolean;
    /**
     * Kontrolliert, ob die children oder ein Ladezusatnd gerendert werden. Sollte dies nicht angegeben sein, wird immer ein Ladezustand gerendert.
     * Es werden __keine__ props an die children weitergegeben!
     * */
    active?: boolean;
    dark?: boolean;
    tag?: string;
    /** @default true */
    forwardRef?: boolean;
}

const Skeleton = React.forwardRef<HTMLElement, SkeletonProps>((props, ref) => {
    const variantClasses = collapse(props.variant || "rounded", { rounded: "rounded", rect: "", circular: "rounded-full", rounded_lg: "rounded-lg" });
    const classes = clsx("Skeleton", props.pulse !== false && "animate-pulse", props.dark ? "bg-bg-dark/60" : "bg-bg-paper", variantClasses, props.className);
    const minW = Array.isArray(props.width) ? props.width?.[0] : props.width;
    const maxW = Array.isArray(props.width) ? props.width?.[1] : props.width;
    const minH = Array.isArray(props.height) ? props.height?.[0] : props.height;
    const maxH = Array.isArray(props.height) ? props.height?.[1] : props.height;
    const width = React.useMemo(() => {
        if (minW === maxW) return maxW;
        return randomNumber(minW as number, maxW as number);
    }, [minW, maxW]);
    const height = React.useMemo(() => {
        if (minH === maxH) return maxH;
        return randomNumber(minH as number, maxH as number);
    }, [minH, maxH]);
    const Comp: any = props.tag || "div";

    if (props.active === true)
        return React.isValidElement(props.children) && props.forwardRef !== false
            ? React.cloneElement(props.children, { ...props.children.props, ref: ref })
            : props.children;

    return (
        <Comp
            ref={ref}
            className={classes}
            style={{ height, width, minHeight: props.minHeight, minWidth: props.minWidth, maxHeight: props.maxHeight, maxWidth: props.maxWidth, ...props.style }}
        >
            {props.children}
        </Comp>
    );
});

Skeleton.displayName = "Skeleton";

export default Skeleton;
