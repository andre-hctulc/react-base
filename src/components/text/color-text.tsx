import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { lineClamp, textSize, withMargin } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";

const colorTextVariants = cva("", {
    variants: {
        color: {
            error: "text-destructive",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
        },
    },
    defaultVariants: { color: "info" },
});

type MarginSize = keyof typeof withMargin.mt;
type LineClampKey = keyof typeof lineClamp;

export type ColorTextProps<T extends ElementType = "p"> = RichAsProps<T> &
    VariantProps<typeof colorTextVariants> & {
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

export { colorTextVariants };

export const ColorText = <T extends ElementType = "p">(props: ColorTextProps<T>) => {
    const {
        color = "info",
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
                colorTextVariants({ color }),
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
