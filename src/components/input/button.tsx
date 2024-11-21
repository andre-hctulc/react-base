import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import { Button as BaseButton } from "@headlessui/react";
import type { TVCProps, XStyleProps } from "../../types";
import { Spinner } from "../data-display/spinner";
import { Icon } from "../icons";

const btn = tv({
    base: "flex items-center justify-center transition duration-100",
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
            filled: "bg-opacity-100 data-[disabled=false]:hover:brightness-90 data-[disabled=false]:active:brightness-75",
            outlined:
                "border bg-opacity-0 data-[disabled=false]:hover:bg-opacity-10 data-[disabled=false]:active:bg-opacity-20",
            pale: "bg-opacity-20 data-[disabled=false]:hover:bg-opacity-30 data-[disabled=false]:active:bg-opacity-40",
            text: "bg-opacity-0 data-[disabled=false]:hover:bg-opacity-10 data-[disabled=false]:active:bg-opacity-20",
        },
        size: {
            xs: "h-5 text-xs px-2",
            sm: "h-7 text-sm px-3",
            md: "h-9 text-base px-3.5",
            lg: "h-12 text-xl px-3.5",
        },
        floating: {
            md: "shadow-lg",
            lg: "shadow-xl",
            xl: "shadow-2xl",
        },
        disabled: {
            true: "!cursor-not-allowed !brightness-90",
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
        {
            children,
            color,
            variant,
            className,
            size,
            loading,
            iconPosition,
            icon,
            shape,
            disabled,
            floating,
            ...props
        },
        ref
    ) => {
        const ico = loading ? <Spinner color="inherit" size="sm" /> : icon;
        const dis = disabled || loading;

        return (
            <BaseButton
                ref={ref}
                data-variant={variant || "filled"}
                data-disabled={!!dis}
                className={btn({
                    className,
                    color,
                    variant,
                    size,
                    shape,
                    floating,
                    disabled,
                })}
                disabled={dis}
                {...props}
            >
                {ico && iconPosition === "left" && <Icon className="mr-2">{ico}</Icon>}
                {children}
                {ico && iconPosition !== "left" && <Icon className="ml-2">{ico}</Icon>}
            </BaseButton>
        );
    }
);

Button.displayName = withPrefix("Button");

const iconButton = tv({
    base: "!p-0",
    variants: {
        size: {
            xs: "w-5",
            sm: "w-7",
            md: "w-9",
            lg: "w-12",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "icon">>(
    ({ children, className, loading, disabled, size, ...props }, ref) => {
        return (
            <Button
                color="neutral"
                variant="text"
                className={iconButton({ className, size })}
                disabled={loading || disabled}
                ref={ref}
                size={size}
                {...props}
            >
                {loading ? <Spinner color="inherit" size="inherit" /> : children}
            </Button>
        );
    }
);

IconButton.displayName = withPrefix("IconButton");
