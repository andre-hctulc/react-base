import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps } from "../../types";
import { collapse } from "@edgeshiftlabs/util";
import { themeColor } from "../../util";

// removed: align-middle

const chip = tv({
    base: "inline-flex text-center shrink-0 items-center data-[clickable=true]:cursor-pointer transition",
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
            rounded: "rounded-sm",
            pill: "rounded-full",
            square: "rounded-[1px]",
        },
        variant: {
            filled: "",
            outlined: "border",
            pale: "",
            text: "",
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
        thinBorder: {
            true: "border-[0.5px]",
        },
        thinText: {
            true: "font-light",
        },
    },
    defaultVariants: {
        size: "md",
        color: "neutral",
        variant: "outlined",
        shape: "pill",
        userSelect: "enabled",
    },
});

export interface ChipProps extends TVCProps<typeof chip, "span"> {
    hoverEffect?: boolean;
    clickable?: boolean;
    /**
     * Equal to `hoverEffect: true` and `clickable: true`.
     */
    interactive?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    as?: any;
}

export const Chip = React.forwardRef<HTMLElement, ChipProps>(
    ({ children, color, variant, className, size, hoverEffect, clickable, textSelect, icon, iconPosition, as, thinBorder, interactive, thinText, ...props }, ref) => {
        const Comp: any = as || "span";
        const _color = color || "neutral";
        const _variant = variant || "outlined";
        const { bgA, bg, border, text, textC } = themeColor(_color);
        const { bg: hoverBg, bgA: hoverBgA } = themeColor(_color, "hover:");
        const { bg: activeBg, bgA: activeBgA } = themeColor(_color, "active:");
        const bgColor = collapse(_variant, {
            filled: bg,
            outlined: "",
            pale: bgA(20),
            text: "",
        });
        const borderColor = collapse(_variant, {
            filled: "",
            outlined: border,
            pale: bgA(20),
            text: "",
        });
        const textColor = collapse(_variant, {
            filled: textC,
            outlined: text,
            pale: text,
            text: text,
        });
        const hoverBgColor = collapse(_variant, {
            filled: hoverBgA(90),
            outlined: hoverBgA(10),
            pale: hoverBgA(30),
            text: hoverBgA(10),
        });
        const activeBgColor = collapse(_variant, {
            filled: activeBgA(75),
            outlined: activeBgA(20),
            pale: activeBgA(20),
            text: activeBgA(20),
        });
        const _clickable = clickable ?? interactive ?? props.onClick;
        const _hoverEffect = hoverEffect ?? interactive ?? props.onClick;

        return (
            <Comp
                ref={ref}
                data-clickable={clickable}
                className={chip({
                    color,
                    variant,
                    size,
                    className: [bgColor, borderColor, textColor, _hoverEffect && hoverBgColor, _clickable && [activeBgColor, "cursor-pointer"], className],
                    textSelect,
                    thinBorder,
                    thinText,
                })}
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
