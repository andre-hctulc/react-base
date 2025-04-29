import { type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import clsx from "clsx";

const subtitle = tv({
    base: "text-lg text-t2",
    variants: {
        variant: {
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
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
        bold: {
            true: "font-semibold",
            false: "font-medium",
        },
    },
    defaultVariants: {
        variant: "h2",
        bold: false,
    },
});

export interface SubtitleProps extends TVCProps<typeof subtitle, "h2"> {
    as?: any;
    icon?: ReactNode;
    iconProps?: Partial<PropsOf<typeof Icon>>;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Subtitle: FC<SubtitleProps> = ({
    children,
    className,
    as,
    variant,
    underline,
    my,
    mt,
    mb,
    icon,
    iconProps,
    ref,
    bold,
    ...props
}) => {
    const Comp = as || variant || "h2";

    return (
        <Comp
            className={subtitle({ className, underline, variant, my, mb, mt, bold })}
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
};
