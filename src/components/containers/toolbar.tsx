"use client";

import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import {
    alignItems,
    flexDirection,
    flexGrow,
    flexWrap,
    justifyContent,
    withGap,
    withMargin,
    withPadding,
    withScroll,
    type AlignItems,
    type FlexDirection,
    type FlexWrap,
    type JustifyContent,
} from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";
import { type FC, type ElementType } from "react";

type GapSize = keyof typeof withGap.gap;
type PadSize = keyof typeof withPadding.p;
type MarginSize = keyof typeof withMargin.m;

export type ToolbarProps<T extends ElementType = "div"> = RichAsProps<T> & {
    direction?: FlexDirection;
    gap?: GapSize;
    rowGap?: GapSize;
    colGap?: GapSize;
    p?: PadSize;
    px?: PadSize;
    py?: PadSize;
    pt?: PadSize;
    pr?: PadSize;
    pb?: PadSize;
    pl?: PadSize;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    grow?: boolean;
    noShrink?: boolean;
    wrap?: FlexWrap;
    scroll?: boolean;
    scrollY?: boolean;
    scrollX?: boolean;
    m?: MarginSize;
    mx?: MarginSize;
    my?: MarginSize;
    mt?: MarginSize;
    mr?: MarginSize;
    mb?: MarginSize;
    ml?: MarginSize;
    mlAuto?: boolean;
    stopEventPropagation?: boolean;
};

/**
 * ### Props
 * - `stopEventPropagation`
 */
export const Toolbar: FC<ToolbarProps> = (props) => {
    const {
        direction,
        gap = "md",
        rowGap,
        colGap,
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        alignItems: ai = "center",
        justifyContent: jc,
        grow,
        noShrink,
        wrap,
        scroll,
        scrollY,
        scrollX,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        mlAuto,
        stopEventPropagation,
        onClick,
        className,
        children,
        as,
        ref,
        ...restProps
    } = props as any;
    const Comp: any = as || "div";

    return (
        <Comp
            className={cn(
                "flex min-w-0",
                direction && collapse(flexDirection, direction!),
                collapse(withGap.gap, gap),
                rowGap && collapse(withGap.rowGap, rowGap),
                colGap && collapse(withGap.colGap, colGap),
                p && collapse(withPadding.p, p),
                px && collapse(withPadding.px, px),
                py && collapse(withPadding.py, py),
                pt && collapse(withPadding.pt, pt),
                pr && collapse(withPadding.pr, pr),
                pb && collapse(withPadding.pb, pb),
                pl && collapse(withPadding.pl, pl),
                ai && collapse(alignItems, ai!),
                jc && collapse(justifyContent, jc!),
                grow && "grow",
                noShrink && "shrink-0",
                wrap && collapse(flexWrap, wrap!),
                scroll && "overflow-auto",
                scrollY && "overflow-y-auto",
                scrollX && "overflow-x-auto",
                m && collapse(withMargin.m, m),
                mx && collapse(withMargin.mx, mx),
                my && collapse(withMargin.my, my),
                mt && collapse(withMargin.mt, mt),
                mr && collapse(withMargin.mr, mr),
                mb && collapse(withMargin.mb, mb),
                ml && collapse(withMargin.ml, ml),
                mlAuto && "ml-auto",
                className,
            )}
            ref={ref}
            onClick={
                stopEventPropagation
                    ? (e: React.MouseEvent<any>) => {
                          e.stopPropagation();
                          onClick?.(e);
                      }
                    : onClick
            }
            {...restProps}
        >
            {children}
        </Comp>
    );
};
