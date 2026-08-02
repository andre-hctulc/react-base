import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn/cn.util.js";
import type { RichAsProps } from "@/types/index.js";

const typographyVariants = cva("", {
    variants: {
        textSize: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
        },
        center: { true: "text-center" },
        underline: { true: "underline" },
        italic: { true: "italic" },
        lineHeight: {
            tight: "leading-tight",
            snug: "leading-snug",
            normal: "leading-normal",
            relaxed: "leading-relaxed",
            loose: "leading-loose",
        },
    },
});

export type TypographyProps<T extends ElementType = "p"> = RichAsProps<T> &
    VariantProps<typeof typographyVariants>;

export { typographyVariants };

/** Text component for consistent typography styling. */
export const Typography = <T extends ElementType = "p">(props: TypographyProps<T>) => {
    const { textSize, center, underline, italic, lineHeight, className, children, as, ...restProps } =
        props as any;
    const Comp: any = as || "p";
    return (
        <Comp
            className={cn(typographyVariants({ textSize, center, underline, italic, lineHeight }), className)}
            {...restProps}
        >
            {children}
        </Comp>
    );
};
