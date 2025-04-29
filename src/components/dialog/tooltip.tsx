"use client";

import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf, StyleProps } from "../../types/index.js";
import type { Placement } from "@popperjs/core";
import { cloneElement, useRef, useState, type MouseEventHandler } from "react";
import clsx from "clsx";
import { Popover } from "./popover.js";

const tooltip = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});

export interface TooltipProps extends VariantProps<typeof tooltip>, StyleProps {
    children: React.ReactElement<{
        className?: string;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
    }>;
    content: React.ReactNode;
    containerProps?: PropsOf<"div">;
    /**
     * Disable the tooltip
     */
    disabled?: boolean;
    /**
     * @default 200
     */
    enterDelay?: number;
    /**
     * @default 200
     */
    reEnterDelay?: number;
    position?: Placement;
    /**
     * Pixels
     * @default 4
     */
    gap?: number;
    /**
     * Gap to the window border
     *
     * Pixels
     * @default 4
     */
    frameMargin?: number;
    zIndex?: PropsOf<typeof Popover>["zIndex"];
    portal?: boolean;
}

/**
 * The child must forward the ref!
 *
 * ### Props
 * - `disabled`
 */
export const Tooltip: React.FC<TooltipProps> = ({
    position,
    children,
    containerProps,
    enterDelay,
    reEnterDelay,
    content,
    disabled,
    portal,
    zIndex,
    gap,
}) => {
    const anchor = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const openTimeout = useRef<any>(null);
    const entered = useRef<boolean>(false);

    return (
        <>
            {cloneElement(children, {
                ref: anchor,
                onMouseEnter: (e: any) => {
                    children.props?.onMouseEnter?.(e);

                    if (disabled) return;

                    entered.current = true;
                    if (openTimeout.current) clearTimeout(openTimeout.current);

                    openTimeout.current = setTimeout(
                        () => {
                            setOpen(true);
                        },
                        entered.current ? reEnterDelay ?? enterDelay ?? 200 : enterDelay ?? 200
                    );
                },
                onMouseLeave: (e: any) => {
                    children.props?.onMouseLeave?.(e);
                    if (openTimeout.current) clearTimeout(openTimeout.current);
                    setOpen(false);
                },
            } as any)}
            <Popover
                open={open}
                noInteraction
                position={position || "top"}
                anchor={anchor.current}
                portal={portal ?? false}
                zIndex={zIndex}
                gap={gap}
            >
                <div
                    {...containerProps}
                    className={clsx(
                        "bg-black/75 rounded-sm py-1.5 px-2 text-white text-sm text-center",
                        containerProps?.className
                    )}
                >
                    {content}
                </div>
            </Popover>
        </>
    );
};
