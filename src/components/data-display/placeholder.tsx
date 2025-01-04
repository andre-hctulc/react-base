import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
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
            true: "flex-grow",
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
    helperText?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
    children,
    className,
    icon,
    gap,
    padding,
    helperText,
    grow,
    fullHeight,
    fullWidth,
    my,
    ...props
}) => {
    return (
        <div className={placeholder({ className, gap, padding, grow, fullHeight, fullWidth, my })} {...props}>
            {icon && <Icon size="4xl">{icon}</Icon>}
            {typeof children === "string" ? (
                <Typography variant="secondary">{children ?? "Empty"}</Typography>
            ) : (
                children
            )}
            {helperText && <Typography variant="tertiary">{helperText}</Typography>}
        </div>
    );
};
