import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps, StyleProps } from "../../types";
import { Spinner } from "../data-display/spinner";
import { Icon } from "../icons";

const btn = tv({
    base: "flex items-center justify-center transition duration-100 shrink-0 truncate",
    variants: {
        color: {
            neutral: "bg-neutral",
            black: "bg-black",
            primary: "bg-primary",
            secondary: "bg-secondary",
            error: "bg-error",
            success: "bg-success",
            warning: "bg-warning",
            info: "bg-info",
            accent: "bg-accent",
        },
        shape: {
            rounded_sm: "rounded-xs",
            rounded: "rounded-sm",
            rounded_md: "rounded-md",
            rounded_lg: "rounded-lg",
            pill: "rounded-full",
            square: "rounded-[1px]",
        },
        variant: {
            filled: "",
            outlined:
                "border bg-opacity-0 data-[disabled=false]:hover:bg-opacity-10 data-[disabled=false]:active:bg-opacity-20",
            pale: "bg-opacity-20 data-[disabled=false]:hover:bg-opacity-30 data-[disabled=false]:active:bg-opacity-40",
            text: "bg-opacity-0 data-[disabled=false]:hover:bg-opacity-10 data-[disabled=false]:active:bg-opacity-20",
            floating: "shadow-md",
        },
        size: {
            xs: "h-5 text-xs px-2 gap-1.5",
            sm: "h-7 text-sm px-3 gap-2",
            md: "h-9 text-base px-3.5 gap-2.5",
            lg: "h-[42px] text-lg px-3 gap-3",
            xl: "h-12 text-xl px-4 gap-3",
        },
        shadow: {
            md: "shadow-lg",
            lg: "shadow-xl",
            xl: "shadow-2xl",
        },
        disabled: {
            true: "cursor-not-allowed brightness-90!",
        },
        // Used for consistent margin in forms
        mt: {
            none: "",
            xs: "mt-2",
            sm: "mt-4",
            md: "mt-6",
            lg: "mt-10",
            xl: "mt-16",
        },
    },
    compoundVariants: [
        // filled like effects
        {
            variant: ["filled", "floating"],
            className: "data-[disabled=false]:hover:brightness-90 data-[disabled=false]:active:brightness-75",
        },
        // text like colors
        { variant: ["outlined", "pale", "text"], color: "neutral", className: "text-neutral" },
        { variant: ["outlined", "pale", "text"], color: "black", className: "text-black" },
        { variant: ["outlined", "pale", "text"], color: "primary", className: "text-primary" },
        { variant: ["outlined", "pale", "text"], color: "secondary", className: "text-secondary" },
        { variant: ["outlined", "pale", "text"], color: "error", className: "text-error" },
        { variant: ["outlined", "pale", "text"], color: "success", className: "text-success" },
        { variant: ["outlined", "pale", "text"], color: "warning", className: "text-warning" },
        { variant: ["outlined", "pale", "text"], color: "info", className: "text-info" },
        { variant: ["outlined", "pale", "text"], color: "accent", className: "text-accent" },
        // filled like colors
        {
            variant: ["filled", "floating"],
            color: "neutral",
            className: "text-neutral",
        },
        { variant: ["filled", "floating"], color: "black", className: "text-t-contrast" },
        {
            variant: ["filled", "floating"],
            color: "primary",
            className: "text-primary-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "secondary",
            className: "text-secondary-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "error",
            className: "text-error-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "success",
            className: "text-success-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "warning",
            className: "text-warning-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "info",
            className: "text-info-contrast",
        },
        {
            variant: ["filled", "floating"],
            color: "accent",
            className: "text-accent-contrast",
        },
        // border like colors
        { variant: "outlined", color: "neutral", className: "border-neutral" },
        { variant: "outlined", color: "black", className: "border-black" },
        { variant: "outlined", color: "primary", className: "border-primary" },
        { variant: "outlined", color: "secondary", className: "border-secondary" },
        { variant: "outlined", color: "error", className: "border-error" },
        { variant: "outlined", color: "success", className: "border-success" },
        { variant: "outlined", color: "warning", className: "border-warning" },
        { variant: "outlined", color: "info", className: "border-info" },
        { variant: "outlined", color: "accent", className: "border-accent" },
        // floating shadows
        {
            variant: "floating",
            color: "neutral",
            className: "data-[disabled=false]:shadow-neutral",
        },
        {
            variant: "floating",
            color: "black",
            className: "data-[disabled=false]:shadow-black",
        },
        {
            variant: "floating",
            color: "primary",
            className: "data-[disabled=false]:shadow-primary",
        },
        {
            variant: "floating",
            color: "secondary",
            className: "data-[disabled=false]:shadow-secondary",
        },
        {
            variant: "floating",
            color: "error",
            className: "data-[disabled=false]:shadow-error",
        },
        {
            variant: "floating",
            color: "success",
            className: "data-[disabled=false]:shadow-success",
        },
        {
            variant: "floating",
            color: "warning",
            className: "data-[disabled=false]:shadow-warning",
        },
        {
            variant: "floating",
            color: "info",
            className: "data-[disabled=false]:shadow-info",
        },
        {
            variant: "floating",
            color: "accent",
            className: "data-[disabled=false]:shadow-accent",
        },
    ],
    defaultVariants: {
        size: "md",
        color: "primary",
        variant: "filled",
        shape: "rounded_md",
    },
});

interface ButtonProps extends Omit<TVCProps<typeof btn, "button">, "className">, StyleProps {
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    children?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    as?: any;
    href?: string;
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
            shadow,
            mt,
            as,
            href,
            ...props
        },
        ref
    ) => {
        const ico = loading ? <Spinner color="inherit" size="sm" /> : icon;
        const dis = disabled || loading;
        const Comp = as || (href ? "a" : "button");
        const p: any = { ...props };

        if (href) {
            p.href = href;
        }

        return (
            <Comp
                ref={ref}
                data-variant={variant || "filled"}
                data-disabled={!!dis}
                className={btn({
                    className,
                    color,
                    variant,
                    size,
                    shape,
                    shadow,
                    mt,
                    disabled: disabled || loading,
                })}
                disabled={dis}
                {...p}
            >
                {ico && iconPosition === "left" && <Icon>{ico}</Icon>}
                {children}
                {ico && iconPosition !== "left" && <Icon>{ico}</Icon>}
            </Comp>
        );
    }
);

Button.displayName = withPrefix("Button");

const iconButton = tv({
    base: "p-0!",
    variants: {
        size: {
            xs: "w-5",
            sm: "w-7",
            md: "w-9",
            lg: "w-[42px]",
            xl: "w-12",
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
