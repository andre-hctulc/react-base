import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { lineClamp, withMargin } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";
import { Icon, type IconLike, type IconProps } from "../icons/icon.js";

const subtitleVariants = cva("text-t-2", {
    variants: {
        variant: {
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
        },
        bold: { true: "font-semibold", false: "font-medium" },
        underline: { true: "underline" },
    },
    defaultVariants: { variant: "h2", bold: false },
});

type MarginSize = keyof typeof withMargin.mt;
type LineClampKey = keyof typeof lineClamp;

export type SubtitleProps<T extends ElementType = "h2"> = RichAsProps<T> &
    VariantProps<typeof subtitleVariants> & {
        icon?: IconLike;
        iconProps?: IconProps;
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

export { subtitleVariants };

export const Subtitle = <T extends ElementType = "h2">(props: SubtitleProps<T>) => {
    const {
        variant = "h2",
        bold = false,
        underline,
        icon,
        iconProps,
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
    const Comp: any = as || variant;

    return (
        <Comp
            className={cn(
                subtitleVariants({ variant, bold, underline }),
                icon && "flex items-center",
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
            {icon && (
                <Icon noShrink inline {...iconProps} className={cn("mr-2", iconProps?.className)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
