import React from "react";
import { collapse } from "../../util";
import { randomNumber } from "../../util/system";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface SkeletonProps extends StyleProps {
    /** @default "rounded" */
    variant?: "rounded" | "rect" | "circular" | "rounded_lg" | "text";
    height?: number | string | [number, number];
    width?: number | string | [number, number];
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    children?: React.ReactNode;
    /** @default true */
    pulse?: boolean;
    /**
     * Kontrolliert, ob die children oder ein Ladezusatnd gerendert werden. Sollte dies nicht angegeben sein, wird immer ein Ladezustand gerendert.
     * Es werden __keine__ props an die children weitergegeben!
     * */
    active?: boolean;
    dark?: boolean;
    /** @default "div" */
    tag?: string;
    /** @default true */
    forwardRef?: boolean;
    onClick?: React.MouseEventHandler;
}

const Skeleton = React.forwardRef<HTMLElement, SkeletonProps>((props, ref) => {
    const variantClasses = collapse(props.variant || "rounded", {
        rounded: "rounded",
        text: "rounded",
        rect: "",
        circular: "rounded-full",
        rounded_lg: "rounded-lg",
    });

    const width = React.useMemo(
        () => {
            const minW = Array.isArray(props.width) ? props.width?.[0] : props.width;
            const maxW = Array.isArray(props.width) ? props.width?.[1] : props.width;
            if (minW === maxW) return maxW;
            return randomNumber(minW as number, maxW as number);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Array.isArray(props.width) ? props.width : [props.width]
    );
    const height = React.useMemo(
        () => {
            let height: number | string | undefined;
            const minH = Array.isArray(props.height) ? props.height?.[0] : props.height;
            const maxH = Array.isArray(props.height) ? props.height?.[1] : props.height;
            if (minH === maxH) height = maxH;
            else height = randomNumber(minH as number, maxH as number);

            // Bei Text Skeleton Höhe abziehen, da Texte kleiener (bzgl. der Höhe) erscheinen, als sie es im DOM tatsächlich sind
            if (props.variant === "text" && height)
                return `calc(${typeof height === "string" ? height : height + "px"} - 4px)`;

            return height;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Array.isArray(props.height) ? props.height : [props.height]
    );
    const Comp: any = props.tag || "div";

    if (props.active === true)
        return React.isValidElement(props.children) && props.forwardRef !== false
            ? React.cloneElement(props.children, { ...props.children.props, ref: ref })
            : props.children;

    return (
        <Comp
            ref={ref}
            onClick={props.onClick}
            className={clsx([
                "Skeleton",
                props.pulse !== false && "animate-pulse",
                props.dark ? "bg-bg-dark/60" : "bg-bg-paper",
                variantClasses,
                props.className,
            ])}
            style={{
                height,
                width,
                minHeight: props.minHeight,
                minWidth: props.minWidth,
                maxHeight: props.maxHeight,
                maxWidth: props.maxWidth,
                ...props.style,
            }}
        >
            {props.children}
        </Comp>
    );
});

Skeleton.displayName = "Skeleton";

export default Skeleton;
