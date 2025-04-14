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
            none: "",
            xs: "px-2 py-2",
            sm: "px-4 py-3",
            md: "px-6 py-5",
            lg: "px-8 py-6",
            xl: "px-10 py-8",
        },
        border: {
            true: "border-t",
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
    border,
    ...props
}) => {
    return (
        <div className={dialogFooter({ className, variant, size, border })} {...props}>
            {children}
        </div>
    );
};
