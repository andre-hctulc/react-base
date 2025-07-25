import { tv } from "tailwind-variants";
import { type FC, type ReactNode } from "react";
import type { TVCProps, StyleProps, LinkProps } from "../../types/index.js";
import { Spinner } from "../data-display/spinner.js";
import { Icon } from "../icons/icon.js";
import { themeColor } from "../../util/style.js";
import { collapse } from "@dre44/util";

const btn = tv({
    base: "flex items-center justify-center transition duration-100 shrink-0 truncate cursor-pointer",
    variants: {
        color: {
            neutral: "",
            black: "",
            primary: "",
            secondary: "",
            error: "",
            success: "",
            warning: "",
            info: "",
            accent: "",
        },
        shape: {
            rounded_sm: "rounded-sm",
            rounded_md: "rounded-md",
            rounded_lg: "rounded-lg",
            pill: "rounded-full",
            square: "rounded-[1px]",
        },
        variant: {
            filled: "",
            outlined: "border",
            pale: "",
            text: "",
            floating: "shadow-md",
            mix: "border",
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
    defaultVariants: {
        size: "md",
        color: "primary",
        variant: "filled",
        shape: "rounded_md",
    },
});

export interface ButtonProps extends Omit<TVCProps<typeof btn, "button">, "className">, StyleProps {
    iconPosition?: "left" | "right";
    icon?: ReactNode;
    children?: ReactNode;
    linkProps?: LinkProps;
    loading?: boolean;
    disabled?: boolean;
    as?: any;
    href?: string;
}

export const Button: FC<ButtonProps> = ({
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
    ref,
    linkProps,
    ...props
}) => {
    const _variant = variant || "filled";
    const _color = color || "primary";
    const ico = loading ? <Spinner color="inherit" size="sm" /> : icon;
    const _disabled = disabled || loading;
    const Comp = as || (href ? "a" : "button");
    const p: any = { ...props };
    const { bgA, bg, border, text, textC } = themeColor(_color);
    const { bg: hoverBg, bgA: hoverBgA } = themeColor(_color, "hover:");
    const { bg: activeBg, bgA: activeBgA } = themeColor(_color, "active:");
    const bgColor = collapse(_variant, {
        filled: bg,
        outlined: "",
        pale: bgA(20),
        text: "",
        floating: bg,
        mix: "bg-paper2",
    });
    const borderColor = collapse(_variant, {
        filled: "",
        outlined: border,
        pale: bgA(20),
        text: "",
        floating: bg,
        mix: "border-[1.5px]",
    });
    const textColor = collapse(_variant, {
        filled: textC,
        outlined: text,
        pale: text,
        text: text,
        floating: textC,
        mix: text,
    });
    const hoverBgColor = collapse(_variant, {
        filled: hoverBgA(90),
        outlined: hoverBgA(10),
        pale: hoverBgA(30),
        text: hoverBgA(10),
        floating: hoverBg,
        mix: "hover:bg-paper3",
    });
    const activeBgColor = collapse(_variant, {
        filled: activeBgA(75),
        outlined: activeBgA(20),
        pale: activeBgA(20),
        text: activeBgA(20),
        floating: activeBgA(75),
        mix: "active:bg-paper4",
    });
    const btnExclusiveProps: any = !href && !as ? { disabled } : {};

    if (href) {
        p.href = href;
        if (linkProps) Object.assign(p, linkProps);
    }
    return (
        <Comp
            ref={ref}
            className={btn({
                className: [
                    bgColor,
                    !_disabled && hoverBgColor,
                    !_disabled && activeBgColor,
                    borderColor,
                    textColor,
                    className,
                ],
                color,
                variant,
                size,
                shape,
                shadow,
                mt,
                disabled: _disabled,
            })}
            {...btnExclusiveProps}
            {...p}
        >
            {ico && iconPosition === "left" && <Icon>{ico}</Icon>}
            {children}
            {ico && iconPosition !== "left" && <Icon>{ico}</Icon>}
        </Comp>
    );
};
