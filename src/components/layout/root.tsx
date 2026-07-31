import type { FC, ComponentProps } from "react";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import {
    flexDirection,
    height,
    maxHeight,
    minHeight,
    overflow,
    withScroll,
    type FlexDirection,
    type Overflow,
} from "../../util/style.js";

type SizeLike = keyof typeof height;

const bgMap = {
    none: "",
    "1": "bg-paper",
    "2": "bg-paper-2",
    "3": "bg-paper-3",
    "4": "bg-paper-4",
} as const;

export interface RootProps extends ComponentProps<"div"> {
    direction?: FlexDirection;
    height?: SizeLike;
    maxHeight?: SizeLike;
    minHeight?: SizeLike;
    grow?: boolean;
    relative?: boolean;
    overflow?: keyof Overflow;
    scroll?: boolean;
    scrollY?: boolean;
    scrollX?: boolean;
    bg?: keyof typeof bgMap;
}

/** Flex container. Use as the contextual root container for your layout. */
export const Root: FC<RootProps> = (props) => {
    const {
        direction = "col",
        grow = true,
        relative,
        height: h,
        maxHeight: mxh,
        minHeight: mnh,
        overflow: ov,
        scroll,
        scrollY,
        scrollX,
        bg,
        className,
        children,
        ...restProps
    } = props;

    return (
        <div
            className={cn(
                "max-w-full box-border flex",
                collapse(flexDirection, direction),
                grow && "grow",
                relative && "relative",
                h && collapse(height, h!),
                mxh && collapse(maxHeight, mxh!),
                mnh && collapse(minHeight, mnh!),
                ov && collapse(overflow, ov!),
                scroll && withScroll.scroll.on,
                scrollY && withScroll.scrollY.on,
                scrollX && withScroll.scrollX.on,
                bg && collapse(bgMap, bg!),
                className,
            )}
            {...restProps}
        >
            {children}
        </div>
    );
};
