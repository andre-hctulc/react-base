import React from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

export const spinner = tv({
    base: "animate-spin origin-center",
    variants: {
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            success: "text-success",
            error: "text-error",
            warning: "text-warning",
            info: "text-info",
            light: "text-light",
            dark: "text-black",
            white: "text-white",
            neutral: "text-neutral",
            contrast: "text-t-contrast",
            inherit: "text-inherit",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            inherit: "",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "md",
    },
});

export interface SpinnerProps extends TVCProps<typeof spinner, "svg"> {}

export const Spinner = React.forwardRef<SVGElement, SpinnerProps>(({ className, size, color, ...props }, ref) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            ref={ref as any}
            className={spinner({ className, size, color })}
            {...props}
        >
            <path
                d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                className="spinner_P7sC"
            />
        </svg>
    );
});

Spinner.displayName = withPrefix("Spinner");
