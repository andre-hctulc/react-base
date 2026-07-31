import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { lineClamp, textSize, withMargin } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";

const placeholderTextVariants = cva("text-center", {
    variants: {
        variant: {
            primary: "text-t-2",
            secondary: "text-t-3 text-sm",
            tertiary: "text-t-4 text-xs",
        },
        italic: { true: "italic" },
    },
    defaultVariants: { variant: "primary" },
});

type MarginSize = keyof typeof withMargin.mt;
type LineClampKey = keyof typeof lineClamp;

export type PlaceholderTextProps<T extends ElementType = "p"> = RichAsProps<T> &
    VariantProps<typeof placeholderTextVariants> & {
        textSize?: keyof typeof textSize;
        lineClamp?: LineClampKey;
        m?: MarginSize;
        mx?: MarginSize;
        my?: MarginSize;
        mt?: MarginSize;
        mr?: MarginSize;
        mb?: MarginSize;
        ml?: MarginSize;
        me?: MarginSize;
        ms?: MarginSize;
    };

export { placeholderTextVariants };

export const PlaceholderText = <T extends ElementType = "p">(props: PlaceholderTextProps<T>) => {
    const {
        variant = "primary",
        italic,
        textSize: ts,
        lineClamp: lc,
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
    } = props as any;
    const Comp: any = as || "p";
    return (
        <Comp
            className={cn(
                placeholderTextVariants({ variant, italic }),
                ts && collapse(textSize, ts!),
                lc && collapse(lineClamp, lc!),
                m && collapse(withMargin.m, m),
                mx && collapse(withMargin.mx, mx),
                my && collapse(withMargin.my, my),
                mt && collapse(withMargin.mt, mt),
                mr && collapse(withMargin.mr, mr),
                mb && collapse(withMargin.mb, mb),
                ml && collapse(withMargin.ml, ml),
                me && collapse(withMargin.me, me),
                ms && collapse(withMargin.ms, ms),
                className,
            )}
            {...restProps}
        >
            {children}
        </Comp>
    );
};
