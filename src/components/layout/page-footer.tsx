import { type FC, type Ref } from "react";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";

const pageFooter = tv({
    base: "max-w-full box-border",
    variants: {
        position: {
            default: "mt-auto",
            absolute: "absolute bottom-0 left-0 w-full",
            fixed: "fixed bottom-0 left-0 w-full",
        },
        variant: {
            ghost: "",
            outlined: "bg-paper border-t",
            elevated: "bg-paper shadow-even-md",
        },
        shadow: {
            sm: "shadow-even-sm!",
            base: "shadow-even!",
            md: "shadow-even-md!",
            lg: "shadow-even-lg!",
        },
        noBorder: {
            true: "border-none",
        },
    },
    defaultVariants: {
        position: "default",
        variant: "ghost",
    },
});

const pageFooterInner = tv({
    base: "mx-auto h-full",
    variants: {
        innerWidth: {
            "4xs": "max-w-xl mx-auto",
            "3xs": "max-w-2xl mx-auto",
            "2xs": "max-w-3xl mx-auto",
            xs: "max-w-4xl mx-auto",
            sm: "max-w-5xl mx-auto",
            md: "max-w-6xl mx-auto",
            lg: "max-w-7xl mx-auto",
            xl: "max-w-8xl mx-auto",
            full: "w-full",
        },
        padding: {
            none: "",
            sm: "p-2 md:p-4",
            md: "p-3.5 md:p-7",
            lg: "p-5 md:p-9",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
    },
    defaultVariants: {
        innerWidth: "full",
        padding: "md",
    },
});

interface PageFooterProps
    extends VariantProps<typeof pageFooter>,
        StyleProps,
        VariantProps<typeof pageFooterInner> {
    children?: React.ReactNode;
    as?: any;
    ref?: Ref<HTMLElement>;
}

/**
 * ### Props
 * - `position` - Position of the footer
 * - `innerSize` - Inner size of the footer
 */
export const PageFooter: FC<PageFooterProps> = ({
    children,
    className,
    style,
    as,
    position,
    innerWidth,
    padding,
    variant,
    shadow,
    flex,
    ref,
}) => {
    const Comp = as || "div";

    return (
        <Comp
            style={style}
            className={pageFooter({
                className,
                position,
                shadow,
                variant,
            })}
            ref={ref}
        >
            <div className={pageFooterInner({ innerWidth, padding, flex })}>{children}</div>
        </Comp>
    );
};
