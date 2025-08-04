import { tv } from "tailwind-variants";
import type { ELEMENT, RichAsProps, WithTVProps } from "../../types/index.js";

const typography = tv({
    base: "",
    variants: {
        variant: {
            primary: "text-base text-t1",
            secondary: "text-sm text-t2",
            tertiary: "text-sm text-t3",
            quaternary: "text-xs text-t4",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
        },
        center: {
            true: "text-center",
        },
        underline: {
            true: "underline",
        },
        italic: {
            true: "italic",
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
    defaultVariants: {},
});

export type TypographyProps<T extends ELEMENT = "p"> = WithTVProps<RichAsProps<T>, typeof typography>;

/**
 * Text. Used across components to consistently style text.
 */
export const Typography = <T extends ELEMENT = "p">({
    children,
    className,
    center,
    underline,
    italic,
    as,
    size,
    lineHeight,
    variant,
    ref,
    ...props
}: TypographyProps<T>) => {
    const Comp = as;

    return (
        <Comp
            ref={ref}
            className={typography({ className, center, underline, size, italic, lineHeight, variant })}
            {...props}
        >
            {children}
        </Comp>
    );
};
