import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Typography } from "../text";
import { Icon } from "../icons";
import React from "react";

const placeholder = tv({
    base: "flex flex-col items-center justify-center",
    variants: {
        gap: {
            none: "",
            sm: "gap-2.5",
            md: "gap-4",
            lg: "gap-6",
        },
        padding: {
            none: "",
            sm: "p-6",
            md: "p-8",
            lg: "p-10",
        },
        grow: {
            true: "grow",
        },
        fullHeight: {
            true: "h-full",
        },
        fullWidth: {
            true: "w-full",
        },
        my: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
            xl: "my-20",
        },
    },
    defaultVariants: {
        padding: "md",
        gap: "md",
    },
});

interface PlaceholderProps extends TVCProps<typeof placeholder, "div"> {
    icon?: React.ReactNode;
    iconProps?: Partial<PropsOf<typeof Icon>>;
    helperText?: string;
    helperTextProps?: PropsOf<typeof Typography>;
    textProps?: PropsOf<typeof Typography>;
}

/**
 * ### Props
 * - `gap`
 * - `padding`
 * - `icon`
 * - `helperText`
 * - `grow`
 * - `fullHeight`
 * - `fullWidth`
 * - `my`
 */
export const Placeholder: React.FC<PlaceholderProps> = ({
    children,
    className,
    icon,
    iconProps,
    gap,
    padding,
    helperText,
    helperTextProps,
    grow,
    textProps,
    fullHeight,
    fullWidth,
    my,
    ...props
}) => {
    return (
        <div className={placeholder({ className, gap, padding, grow, fullHeight, fullWidth, my })} {...props}>
            {icon && (
                <span className="text-2">
                    <Icon size="4xl" {...iconProps}>
                        {icon}
                    </Icon>
                </span>
            )}
            {typeof children === "string" ? (
                <Typography variant="secondary" {...textProps}>
                    {children ?? "Empty"}
                </Typography>
            ) : (
                children
            )}
            {helperText && (
                <Typography variant="tertiary" {...helperTextProps}>
                    {helperText}
                </Typography>
            )}
        </div>
    );
};
