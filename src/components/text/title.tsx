import { type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
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
    },
    defaultVariants: {
        variant: "h1",
        bold: false,
    },
});

export interface TitleProps extends TVCProps<typeof title, "h2"> {
    as?: any;
    icon?: ReactNode;
    iconProps?: Partial<PropsOf<typeof Icon>>;
}

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title: FC<TitleProps> = ({
    children,
    className,
    as,
    variant,
    underline,
    my,
    mb,
    mt,
    bold,
    icon,
    iconProps,
    ref,
    ...props
}) => {
    const Comp = as || variant || "h1";

    return (
        <Comp
            className={title({ className, variant, underline, my, mb, mt, bold })}
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
};
