"use client";

import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Button } from "../input";
import { Toolbar } from "../containers";

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

interface DialogFooterProps extends TVCProps<typeof dialogFooter, "div"> {}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className, variant, ...props }) => {
    return (
        <div className={dialogFooter({ className, variant })} {...props}>
            {children}
        </div>
    );
};