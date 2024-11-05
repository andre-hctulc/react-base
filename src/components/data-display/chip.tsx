import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps, XStyleProps } from "../../types";

const chip = tv({
    base: "rounded-full inline-flex text-center align-middle flex-shrink-0 items-center data-[clickable=true]:cursor-pointer transition",
    variants: {
        color: {
            neutral: "bg-neutral border-neutral text-neutral",
            black: "bg-black border-black text-black",
            primary: "bg-primary text-primary border-primary",
            secondary: "bg-secondary text-secondary border-secondary",
            error: "bg-error text-error border-error",
            success: "bg-success text-success border-success",
            warning: "bg-warning text-warning border-warning",
            info: "bg-info text-info border-info",
            accent: "bg-accent text-accent border-accent",
        },
        shape: {
            rounded: "rounded",
            pill: "rounded-full",
            square: "rounded-[1px]",
        },
        variant: {
            filled: "text-contrast bg-opacity-100 data-[hover-effect=true]:hover:brightness-90 data-[clickable=true]:active:brightness-75",
            outlined:
                "border bg-opacity-0 data-[hover-effect=true]:hover:bg-opacity-10 data-[clickable=true]:active:bg-opacity-20",
            pale: "bg-opacity-20 data-[hover-effect=true]:hover:bg-opacity-30 data-[clickable=true]:active:bg-opacity-40",
            text: "bg-opacity-0 data-[hover-effect=true]:hover:bg-opacity-10 data-[clickable=true]:active:bg-opacity-20",
        },
        size: {
            sm: "h-5 text-sm px-1.5",
            md: "h-6 text-sm px-2",
            lg: "h-7 text-base px-2.5",
        },
    },
    defaultVariants: {
        size: "md",
        color: "neutral",
        variant: "outlined",
    },
});

interface ChipProps extends TVCProps<typeof chip, "span"> {
    hoverEffect?: boolean;
    clickable?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
    ({ children, color, variant, className, size, hoverEffect, clickable, ...props }, ref) => {
        return (
            <span
                ref={ref}
                data-hover-effect={hoverEffect}
                data-clickable={clickable}
                className={chip({ color, variant, size, className })}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Chip.displayName = withPrefix("Chip");
