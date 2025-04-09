"use client";

import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";

const dialogFooter = tv({
    base: "box-border",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
        size: {
            xs: "px-2 pb-2",
            sm: "px-4 pb-3",
            md: "px-6 pb-5",
            lg: "px-8 pb-6",
            xl: "px-10 pb-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});

export interface DialogFooterProps extends TVCProps<typeof dialogFooter, "div"> {}

/**
 * The footer of a dialog.
 *
 * Use it with `Dialog` or `Popover`.
 */
export const DialogFooter: React.FC<DialogFooterProps> = ({
    children,
    className,
    variant,
    size,
    ...props
}) => {
    return (
        <div className={dialogFooter({ className, variant, size })} {...props}>
            {children}
        </div>
    );
};
