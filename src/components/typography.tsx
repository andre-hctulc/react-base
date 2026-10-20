import { type FC, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.js";
import { Render, type RenderProps } from "./render.js";

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

export interface TypographyProps
    extends ComponentProps<"p">, VariantProps<typeof typographyVariants>, RenderProps {}

/** Text component for consistent typography styling. */
export const Typography: FC<TypographyProps> = ({
    textSize,
    center,
    underline,
    italic,
    lineHeight,
    className,
    children,
    render,
    ...props
}) => {
    return (
        <Render render={render}>
            <p
                className={cn(
                    typographyVariants({ textSize, center, underline, italic, lineHeight }),
                    className,
                )}
                {...props}
            >
                {children}
            </p>
        </Render>
    );
};
