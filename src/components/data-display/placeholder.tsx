import { tv } from "tailwind-variants";
import type { ChildrenProps, PropsOf, StyleProps, WithTVProps } from "../../types/index.js";
import { Typography } from "../text/typography.js";
import { Icon } from "../icons/icon.js";
import { type FC, type ReactNode } from "react";

const placeholder = tv({
    base: "flex flex-col items-center justify-center",
    variants: {
        gap: {
            none: "",
            xs: "gap-1",
            sm: "gap-2.5",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
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
        height: {
            full: "h-full",
            auto: "",
        },
        width: {
            full: "w-full",
            auto: "",
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
        py: {
            none: "",
            "2xs": "py-1",
            xs: "py-3",
            sm: "py-6",
            md: "py-10",
            lg: "py-14",
            xl: "py-20",
        },
    },
    defaultVariants: {
        gap: "sm",
    },
});

type PlaceholderProps = WithTVProps<
    StyleProps &
        ChildrenProps & {
            icon?: ReactNode;
            iconProps?: Partial<PropsOf<typeof Icon>>;
            helperText?: string;
            helperTextProps?: PropsOf<typeof Typography>;
            textProps?: PropsOf<typeof Typography>;
            italic?: boolean;
            disabled?: boolean;
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
 * - `py`
 * - `my`
 */
export const Placeholder: FC<PlaceholderProps> = ({
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
    height,
    width,
    italic,
    my,
    disabled,
    py,
    ...props
}) => {
    return (
        <div className={placeholder({ className, gap, padding, grow, height, width, my, py })} {...props}>
            {icon && (
                <span className={disabled ? "text-t3" : "text-t2"}>
                    <Icon size="4xl" {...iconProps}>
                        {icon}
                    </Icon>
                </span>
            )}
            {typeof children === "string" ? (
                <Typography italic={italic} variant={disabled ? "tertiary" : "secondary"} {...textProps}>
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
