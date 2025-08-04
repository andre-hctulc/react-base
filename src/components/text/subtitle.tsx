import { type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import clsx from "clsx";

const subtitle = tv({
    base: "text-t2",
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

type SubtitleProps<T extends ELEMENT = "h2"> = WithTVProps<
    RichAsProps<T> & {
        icon?: ReactNode;
        iconProps?: Partial<PropsOf<typeof Icon>>;
    },
    typeof subtitle
>;

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Subtitle = <T extends ELEMENT = "h2">({
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
}: SubtitleProps<T>) => {
    const Comp: any = as || variant || "h2";

    return (
        <Comp
            className={subtitle({
                className: [icon && "flex items-center", className],
                underline,
                variant,
                my,
                mb,
                mt,
                bold,
            })}
            ref={ref as any}
            {...props}
        >
            {icon && (
                <Icon
                    size="inherit"
                    inline
                    {...(iconProps as any)}
                    className={clsx("mr-2", iconProps?.className)}
                >
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
