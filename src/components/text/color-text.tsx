import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn/cn.util.js";
import { msz } from "@/util/react/variants.util.js";
import type { RichAsProps } from "@/types/index.js";

const colorTextVariants = cva("", {
    variants: {
        color: {
            error: "text-destructive",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
        },
        textSize: {
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
            "7xl": "text-7xl",
        },
        lineClamp: {
            none: "",
            "1": "line-clamp-1",
            "2": "line-clamp-2",
            "3": "line-clamp-3",
            "4": "line-clamp-4",
            "5": "line-clamp-5",
            "6": "line-clamp-6",
            "7": "line-clamp-7",
            "8": "line-clamp-8",
            "9": "line-clamp-9",
            "10": "line-clamp-10",
        },
        m: msz("m"),
        mx: msz("mx"),
        my: msz("my"),
        mt: msz("mt"),
        mr: msz("mr"),
        mb: msz("mb"),
        ml: msz("ml"),
        me: msz("me"),
        ms: msz("ms"),
    },
    defaultVariants: { color: "info" },
});

export type ColorTextProps<T extends ElementType = "p"> = RichAsProps<T> &
    VariantProps<typeof colorTextVariants>;

export { colorTextVariants };

export const ColorText = <T extends ElementType = "p">(props: ColorTextProps<T>) => {
    const {
        color,
        textSize,
        lineClamp,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        me,
        ms,
        className,
        children,
        as,
        ...restProps
    } = props;
    const Comp: any = as || "p";
    return (
        <Comp
            className={cn(
                colorTextVariants({ color, textSize, lineClamp, m, mx, my, mt, mr, mb, ml, me, ms }),
                className,
            )}
            {...restProps}
        >
            {children}
        </Comp>
    );
};
