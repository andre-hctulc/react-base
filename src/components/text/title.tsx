import React, { type ReactNode } from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Icon } from "../icons";
import clsx from "clsx";

const title = tv({
    base: "",
    variants: {
        variant: {
            h1: "text-2xl",
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
        },
        underline: {
            true: "underline",
        },
        bold: {
            true: "font-semibold",
            false: "font-medium",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
        },
        my: {
            none: "",
            xs: "my-1",
            sm: "my-2",
            md: "my-4",
            lg: "my-7",
            xl: "my-12",
        },
        mt: {
            none: "",
            xs: "mt-1",
            sm: "mt-2",
            md: "mt-4",
            lg: "mt-7",
            xl: "mt-12",
        },
        mb: {
            none: "",
            xs: "mb-1",
            sm: "mb-2",
            md: "mb-4",
            lg: "mb-7",
            xl: "mb-12",
        },
        lineHeight: {
            none: "",
            tight: "leading-tight",
            snug: "leading-snug",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
    defaultVariants: {
        variant: "h1",
        bold: false,
    },
});

interface TitleProps extends TVCProps<typeof title, "h2"> {
    as?: any;
    icon?: ReactNode;
    iconProps?: Partial<PropsOf<typeof Icon>>;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title = React.forwardRef<HTMLElement, TitleProps>(
    (
        {
            children,
            className,
            as,
            variant,
            underline,
            size,
            my,
            mb,
            mt,
            lineHeight,
            bold,
            icon,
            iconProps,
            ...props
        },
        ref
    ) => {
        const Comp = as || variant || "h1";

        return (
            <Comp
                className={title({ className, variant, underline, size, my, mb, mt, lineHeight, bold })}
                ref={ref as any}
                {...props}
            >
                {icon && (
                    <Icon size="none" inline {...iconProps} className={clsx("mr-3", iconProps?.className)}>
                        {icon}
                    </Icon>
                )}
                {children}
            </Comp>
        );
    }
);

Title.displayName = withPrefix("Title");
