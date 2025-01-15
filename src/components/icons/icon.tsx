import React from "react";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import { withPrefix } from "../../util/system";

const icon = tv({
    base: "",
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            none: "",
            inherit: "text-inherit",
        },
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            success: "text-success",
            error: "text-error",
            warning: "text-warning",
            info: "text-info",
            inherit: "text-inherit",
            neutral: "text-neutral",
            text: "text",
            "text-2": "text-2",
            "text-3": "text-3",
            "text-4": "text-4",
        },
        inline: {
            true: "inline",
        },
    },
    defaultVariants: {
        size: "md",
        color: "inherit",
    },
});

interface IconProps extends TVCProps<typeof icon, "span"> {
    children: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLElement, IconProps>(
    ({ className, children, size, color, inline, ...props }, ref) => {
        const classes = icon({ className, size, color, inline });

        if (!React.isValidElement(children))
            return (
                <span ref={ref} className={classes}>
                    {children}
                </span>
            );

        return React.cloneElement(children as React.ReactElement, {
            ref,
            className: classes,
            ...props,
        });
    }
);

Icon.displayName = withPrefix("Icon");
