import type { ElementType } from "react";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import {
    alignItems,
    flexDirection,
    flexWrap,
    height,
    justifyContent,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    type AlignItems,
    type FlexDirection,
    type FlexWrap,
    type JustifyContent,
} from "../../util/style.js";
import { withPrefix } from "../../util/system.js";
import type { RichAsProps } from "../../types/index.js";

type SizeLike = keyof typeof height;

export type FlexProps<T extends ElementType = "div"> = RichAsProps<T> & {
    direction?: FlexDirection;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    wrap?: FlexWrap;
    grow?: boolean;
    noShrink?: boolean;
    height?: SizeLike;
    maxHeight?: SizeLike;
    minHeight?: SizeLike;
    width?: SizeLike;
    maxWidth?: SizeLike;
    minWidth?: SizeLike;
};

export const Flex = <T extends ElementType = "div">(props: FlexProps<T>) => {
    const {
        direction,
        alignItems: ai,
        justifyContent: jc,
        wrap,
        grow,
        noShrink,
        height: h,
        maxHeight: mxh,
        minHeight: mnh,
        width: w,
        maxWidth: mxw,
        minWidth: mnw,
        className,
        children,
        as,
        ...restProps
    } = props;
    const Comp: any = as || "div";

    return (
        <Comp
            className={cn(
                "flex",
                direction && collapse(flexDirection, direction!),
                ai && collapse(alignItems, ai!),
                jc && collapse(justifyContent, jc!),
                wrap && collapse(flexWrap, wrap!),
                grow && "grow",
                noShrink && "shrink-0",
                h && collapse(height, h!),
                mxh && collapse(maxHeight, mxh!),
                mnh && collapse(minHeight, mnh!),
                w && collapse(width, w!),
                mxw && collapse(maxWidth, mxw!),
                mnw && collapse(minWidth, mnw!),
                className,
            )}
            {...restProps}
        >
            {children}
        </Comp>
    );
};

Flex.displayName = withPrefix("Flex");
