import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";

// removed: align-middle

const chip = tv({
    base: "inline-flex text-center flex-shrink-0 items-center data-[clickable=true]:cursor-pointer transition",
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
            filled: "text-contrast bg-opacity-100 data-[clickable=true]:hover:brightness-90 data-[clickable=true]:active:brightness-75",
            outlined:
                "border bg-opacity-0 data-[clickable=true]:hover:bg-opacity-10 data-[clickable=true]:active:bg-opacity-20",
            pale: "bg-opacity-20 data-[clickable=true]:hover:bg-opacity-30 data-[clickable=true]:active:bg-opacity-40",
            text: "bg-opacity-0 data-[clickable=true]:hover:bg-opacity-10 data-[clickable=true]:active:bg-opacity-20",
        },
        size: {
            sm: "h-5 text-xs px-1.5 gap-1",
            md: "h-6 text-sm px-2 gap-1.5",
            lg: "h-7 text-base px-2.5 gap-2",
        },
        textSelect: {
            enabled: "",
            disabled: "select-none",
        },
    },
    defaultVariants: {
        size: "md",
        color: "neutral",
        variant: "outlined",
        rounded: "pill",
        userSelect: "enabled",
    },
});

interface ChipProps extends TVCProps<typeof chip, "span"> {
    hoverEffect?: boolean;
    clickable?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    as?: any;
}

export const Chip = React.forwardRef<HTMLElement, ChipProps>(
    (
        {
            children,
            color,
            variant,
            className,
            size,
            hoverEffect,
            clickable,
            textSelect,
            icon,
            iconPosition,
            as,
            ...props
        },
        ref
    ) => {
        const Comp: any = as || "span";

        return (
            <Comp
                ref={ref}
                data-clickable={clickable}
                className={chip({ color, variant, size, className, textSelect })}
                {...props}
            >
                {icon && iconPosition === "left" && icon}
                {children}
                {icon && iconPosition !== "left" && icon}
            </Comp>
        );
    }
);

Chip.displayName = withPrefix("Chip");
