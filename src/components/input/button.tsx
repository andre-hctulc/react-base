import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import { Button as BaseButton } from "@headlessui/react";
import clsx from "clsx";
import type { TVCProps, XStyleProps } from "../../types";
import { Spinner } from "../data-display/spinner";

const btn = tv({
    base: "px-3.5 flex items-center justify-center transition",
    variants: {
        color: {
            neutral: "bg-neutral border-neutral text-neutral",
            black: "bg-black border-black text-black data-[variant=filled]:text-contrast",
            primary: "bg-primary text-primary border-primary data-[variant=filled]:text-primary-contrast",
            secondary:
                "bg-secondary text-secondary border-secondary data-[variant=filled]:text-secondary-contrast",
            error: "bg-error text-error border-error data-[variant=filled]:text-error-contrast",
            success: "bg-success text-success border-success data-[variant=filled]:text-success-contrast",
            warning: "bg-warning text-warning border-warning data-[variant=filled]:text-warning-contrast",
            info: "bg-info text-info border-info data-[variant=filled]:text-info-contrast",
            accent: "bg-accent text-accent border-accent data-[variant=filled]:text-accent-contrast",
        },
        shape: {
            rounded: "rounded",
            pill: "rounded-full",
            square: "rounded-[1px]",
        },
        variant: {
            filled: "bg-opacity-100 hover:brightness-90 active:brightness-75",
            outlined: "border bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20",
            pale: "bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40",
            text: "bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20",
        },
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-base",
            lg: "h-12 text-lg",
        },
    },
    defaultVariants: {
        size: "md",
        color: "primary",
        variant: "filled",
        shape: "rounded",
    },
});

interface ButtonProps extends Omit<TVCProps<typeof btn, "button">, "className">, XStyleProps {
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    children?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { children, color, variant, className, size, loading, iconPosition, icon, shape, disabled, ...props },
        ref
    ) => {
        const ico = loading ? <Spinner color="inherit" size="sm" /> : icon;

        return (
            <BaseButton
                ref={ref}
                data-variant={variant || "filled"}
                className={btn({
                    color,
                    variant,
                    size,
                    shape,
                    className: [(disabled || loading) && "brightness-120", className],
                })}
                disabled={disabled || loading}
                {...props}
            >
                {ico && iconPosition === "left" && <span className="mr-2">{ico}</span>}
                {children}
                {ico && iconPosition !== "left" && <span className="ml-2">{ico}</span>}
            </BaseButton>
        );
    }
);

Button.displayName = withPrefix("Button");

export const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "icon">>(
    ({ children, className, loading, disabled, ...props }, ref) => {
        const w = props.size === "sm" ? "w-7" : props.size === "md" || !props.size ? "w-9" : "w-12";
        return (
            <Button
                className={clsx("!p-0", w, className as any)}
                disabled={loading || disabled}
                ref={ref}
                {...props}
            >
                {loading ? <Spinner color="inherit" size="inherit" /> : children}
            </Button>
        );
    }
);

IconButton.displayName = withPrefix("IconButton");
