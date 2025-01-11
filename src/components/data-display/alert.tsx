import React from "react";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const alert = tv({
    base: "rounded px-4 py-3 text-contrast",
    variants: {
        type: {
            error: "bg-error",
            success: "bg-success",
            warning: "bg-warning",
            info: "bg-info",
        },
    },
    defaultVariants: {
        type: "info",
    },
});

interface AlertProps extends TVCProps<typeof alert, "div"> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ children, type, className, ...props }, ref) => {
        return (
            <div ref={ref} className={alert({ type, className })} {...props}>
                {children}
            </div>
        );
    }
);
