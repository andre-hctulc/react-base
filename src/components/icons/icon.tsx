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
            "text-2": "text-t2",
            "text-3": "text-t3",
            "text-4": "text-t4",
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
    strokeWidth?: number | string;
    height?: number | string;
    width?: number | string;
    fill?: string;
}

export const Icon = React.forwardRef<HTMLElement, IconProps>(
    ({ className, children, size, color, inline, strokeWidth, height, width, fill, ...props }, ref) => {
        const classes = icon({ className, size, color, inline });
        let additionalProps: any = {};

        if (!React.isValidElement(children))
            return (
                <span ref={ref} className={classes}>
                    {children}
                </span>
            );

        if (strokeWidth !== undefined) additionalProps.strokeWidth = strokeWidth;
        if (height !== undefined) additionalProps.height = height;
        if (width !== undefined) additionalProps.width = width;
        if (fill !== undefined) additionalProps.fill = fill;

        return React.cloneElement(children as React.ReactElement, {
            ref,
            className: classes,
            ...additionalProps,
            ...props,
        });
    }
);

Icon.displayName = withPrefix("Icon");
