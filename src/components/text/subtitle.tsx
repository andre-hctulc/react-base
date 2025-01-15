import { withPrefix } from "../../util/system";
import React, { type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Icon } from "../icons";
import clsx from "clsx";

const subtitle = tv({
    base: "text-lg font-medium text-2",
    variants: {
        variant: {
            h2: "text-lg",
            h3: "text-base",
            h4: "text-sm",
            h5: "text-xs",
        },
        underline: {
            true: "underline",
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
        variant: "h2",
    },
});

interface SubtitleProps extends TVCProps<typeof subtitle, "h2"> {
    as?: any;
    icon?: ReactNode;
    iconProps?: Partial<PropsOf<typeof Icon>>;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Subtitle = React.forwardRef<HTMLElement, SubtitleProps>(
    (
        { children, className, as, variant, underline, my, mt, mb, lineHeight, icon, iconProps, ...props },
        ref
    ) => {
        const Comp = as || variant || "h2";

        return (
            <Comp
                className={subtitle({ className, underline, variant, my, mb, mt, lineHeight })}
                ref={ref as any}
                {...props}
            >
                {icon && (
                    <Icon size="none" inline {...iconProps} className={clsx("mr-2", iconProps?.className)}>
                        {icon}
                    </Icon>
                )}
                {children}
            </Comp>
        );
    }
);

Subtitle.displayName = withPrefix("Subtitle");
