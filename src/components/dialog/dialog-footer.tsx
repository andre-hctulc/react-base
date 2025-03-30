"use client";

import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";

const dialogFooter = tv({
    base: "px-6 pb-5 pt-4 box-border",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface DialogFooterProps extends TVCProps<typeof dialogFooter, "div"> {}

/**
 * The footer of a dialog.
 * 
 * Use it with `Dialog` or `Popover`.
 */
export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className, variant, ...props }) => {
    return (
        <div className={dialogFooter({ className, variant })} {...props}>
            {children}
        </div>
    );
};
