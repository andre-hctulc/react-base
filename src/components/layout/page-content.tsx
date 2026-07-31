import { type FC, type ComponentProps } from "react";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import {
    alignItems,
    flexDirection,
    justifyContent,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    withPadding,
    type AlignItems,
    type FlexDirection,
    type JustifyContent,
} from "../../util/style.js";

type SizeLike = keyof typeof height;
type PadSize = keyof typeof withPadding.p;

export interface PageContentProps extends ComponentProps<"main"> {
    p?: PadSize;
    px?: PadSize;
    py?: PadSize;
    pt?: PadSize;
    pr?: PadSize;
    pb?: PadSize;
    pl?: PadSize;
    height?: SizeLike;
    maxHeight?: SizeLike;
    minHeight?: SizeLike;
    width?: SizeLike;
    maxWidth?: SizeLike;
    minWidth?: SizeLike;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    flex?: FlexDirection;
    grow?: boolean;
}

/** Use inside a `Page` component to display page content. */
export const PageContent: FC<PageContentProps> = (props) => {
    const {
        p = "lg",
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        height: h,
        maxHeight: mxh,
        minHeight: mnh,
        width: w = "full",
        maxWidth: mxw,
        minWidth: mnw,
        justifyContent: jc,
        alignItems: ai,
        flex,
        grow,
        className,
        children,
        ...restProps
    } = props;

    return (
        <main
            className={cn(
                "max-w-full box-border",
                collapse(withPadding.p, p),
                px && collapse(withPadding.px, px),
                py && collapse(withPadding.py, py),
                pt && collapse(withPadding.pt, pt),
                pr && collapse(withPadding.pr, pr),
                pb && collapse(withPadding.pb, pb),
                pl && collapse(withPadding.pl, pl),
                h && collapse(height, h!),
                mxh && collapse(maxHeight, mxh!),
                mnh && collapse(minHeight, mnh!),
                w && collapse(width, w!),
                mxw && collapse(maxWidth, mxw!),
                mnw && collapse(minWidth, mnw!),
                jc && collapse(justifyContent, jc!),
                ai && collapse(alignItems, ai!),
                flex && collapse(flexDirection, flex!),
                grow && "grow",
                className,
            )}
            {...restProps}
        >
            {children}
        </main>
    );
};
