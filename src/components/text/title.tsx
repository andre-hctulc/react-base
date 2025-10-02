import { type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { ELEMENT, PartialPropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";

const title = tv({
    base: "",
    variants: {
        variant: {
            h1: "text-2xl gap-4.5",
            h2: "text-xl gap-4",
            h3: "text-lg gap-3.5",
            h4: "text-base gap-3",
            h5: "text-sm gap-2.5",
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
        flex: {
            true: "flex items-center",
        },
    },
    defaultVariants: {
        variant: "h1",
        bold: false,
    },
});

export type TitleProps<T extends ELEMENT = "h1"> = WithTVProps<
    RichAsProps<T> & {
        icon?: ReactNode;
        iconProps?: PartialPropsOf<typeof Icon>;
    },
    typeof title
>;

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title = <T extends ELEMENT = "h1">({
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
}: TitleProps<T>) => {
    const Comp: any = as || variant || "h1";

    return (
        <Comp
            className={title({
                className,
                variant,
                underline,
                my,
                mb,
                mt,
                bold,
                flex: !!icon,
            })}
            ref={ref as any}
            {...props}
        >
            {icon && (
                <Icon inline {...(iconProps as any)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
