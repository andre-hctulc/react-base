import { tv } from "tailwind-variants";
import type { ChildrenProps, PropsOf, StyleProps, WithTVProps } from "../../types/index.js";
import { Typography } from "../text/typography.js";
import { Icon } from "../icons/icon.js";
import React from "react";

const placeholder = tv({
    base: "flex flex-col items-center justify-center",
    variants: {
        gap: {
            none: "",
            xs: "gap-1",
            sm: "gap-2.5",
            md: "gap-4",
            lg: "gap-6",
        },
        padding: {
            none: "",
            "2xs": "p-1",
            xs: "p-2",
            sm: "p-5",
            md: "p-8",
            lg: "p-10",
        },
        grow: {
            true: "grow",
            false: "",
        },
        fullHeight: {
            true: "h-full",
        },
        fullWidth: {
            true: "w-full",
        },
        my: {
            none: "",
            "2xs": "my-1",
            xs: "my-3",
            sm: "my-6",
            md: "my-10",
            lg: "my-14",
            xl: "my-20",
        },
    },
    defaultVariants: {},
});

type PlaceholderProps = WithTVProps<
    StyleProps &
        ChildrenProps & {
            icon?: React.ReactNode;
            iconProps?: Partial<PropsOf<typeof Icon>>;
            helperText?: string;
            helperTextProps?: PropsOf<typeof Typography>;
            textProps?: PropsOf<typeof Typography>;
            italic?: boolean;
        },
    typeof placeholder
>;

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
    italic,
    my,
    ...props
}) => {
    return (
        <div className={placeholder({ className, gap, padding, grow, fullHeight, fullWidth, my })} {...props}>
            {icon && (
                <span className="text-t2">
                    <Icon size="4xl" {...iconProps}>
                        {icon}
                    </Icon>
                </span>
            )}
            {typeof children === "string" ? (
                <Typography italic={italic} variant="secondary" {...textProps}>
                    {children}
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
