import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf, StyleProps } from "../../types";
import type { Placement } from "@popperjs/core";
import { cloneElement, useRef, useState, type MouseEventHandler } from "react";
import clsx from "clsx";
import { Popover } from "./popover";

const tooltip = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});

interface TooltipProps extends VariantProps<typeof tooltip>, StyleProps {
    children: React.ReactElement<{
        className?: string;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
    }>;
    content: React.ReactNode;
    containerProps?: PropsOf<"div">;
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
     * @default 4
     */
    gap?: number;
    /**
     * Gap to the window border
     * @default 4
     */
    frameMargin?: number;
    zIndex?: "none" | "10" | "20" | "30" | "40" | "50";
}

/**
 * The child must forward the ref!
 */
export const Tooltip: React.FC<TooltipProps> = ({
    position,
    children,
    containerProps,
    enterDelay,
    reEnterDelay,
    content,
    disabled,
    ...props
}) => {
    const anchor = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef<any>(null);
    const entered = useRef<boolean>(false);

    return (
        <>
            {cloneElement(children, {
                ref: anchor,
                onMouseEnter: (e: any) => {
                    if (disabled) return;
                    if (closeTimeout.current) clearTimeout(closeTimeout.current);
                    setOpen(true);
                    children.props?.onMouseEnter?.(e);
                },
                onMouseLeave: (e: any) => {
                    closeTimeout.current = setTimeout(
                        () => {
                            setOpen(false);
                        },
                        entered.current ? reEnterDelay ?? 200 : enterDelay ?? 200
                    );
                    entered.current = true;
                    children.props?.onMouseLeave?.(e);
                },
            } as any)}
            <Popover open={open} position={position || "top"} anchor={anchor.current} {...props}>
                <div
                    {...containerProps}
                    className={clsx("bg-black/90 rounded p-1.5 text-white", containerProps?.className)}
                >
                    {content}
                </div>
            </Popover>
        </>
    );
};
