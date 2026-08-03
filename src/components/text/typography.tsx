import { type FC, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.util.js";
import { Slot } from "radix-ui";

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

export interface TypographyProps extends ComponentProps<"p">, VariantProps<typeof typographyVariants> {
    asChild?: boolean;
}

/** Text component for consistent typography styling. */
export const Typography: FC<TypographyProps> = (props) => {
    const { textSize, center, underline, italic, lineHeight, className, children, asChild, ...restProps } =
        props as any;
    const Comp: any = asChild ? Slot : "p";
    return (
        <Comp
            className={cn(typographyVariants({ textSize, center, underline, italic, lineHeight }), className)}
            {...restProps}
        >
            {children}
        </Comp>
    );
};
