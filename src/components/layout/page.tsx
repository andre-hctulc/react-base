import { type FC, type ComponentProps } from "react";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { flexDirection, height, maxHeight, minHeight, type FlexDirection } from "../../util/style.js";

type SizeLike = keyof typeof height;

const widthMap = {
    xs: "max-w-xl mx-auto",
    sm: "max-w-2xl mx-auto",
    md: "max-w-3xl mx-auto",
    lg: "max-w-4xl mx-auto",
    xl: "max-w-5xl mx-auto",
    "2xl": "max-w-6xl mx-auto",
    "3xl": "max-w-7xl mx-auto",
    "4xl": "max-w-8xl mx-auto",
    "5xl": "max-w-8xl mx-auto",
    "6xl": "max-w-8xl mx-auto",
    "7xl": "max-w-8xl mx-auto",
    full: "w-full",
} as const;

const bgMap = {
    none: "",
    "1": "bg-paper",
    "2": "bg-paper-2",
    "3": "bg-paper-3",
    "4": "bg-paper-4",
} as const;

export interface PageProps extends ComponentProps<"div"> {
    sticky?: boolean;
    width?: keyof typeof widthMap;
    bg?: keyof typeof bgMap;
    flex?: FlexDirection;
    grow?: boolean;
    noShrink?: boolean;
    height?: SizeLike;
    maxHeight?: SizeLike;
    minHeight?: SizeLike;
}

/**
 * Page container. Generally there should only be one `Page` per route.
 */
export const Page: FC<PageProps> = (props) => {
    const {
        sticky,
        width = "md",
        bg,
        flex,
        grow,
        noShrink = true,
        height: h,
        maxHeight: mxh,
        minHeight: mnh,
        className,
        children,
        ...restProps
    } = props;

    return (
        <div
            className={cn(
                "box-border w-full min-h-0",
                sticky && "sticky top-0 z-10",
                collapse(widthMap, width),
                bg && collapse(bgMap, bg!),
                flex && collapse(flexDirection, flex!),
                grow && "grow",
                noShrink && "shrink-0",
                h && collapse(height, h!),
                mxh && collapse(maxHeight, mxh!),
                mnh && collapse(minHeight, mnh!),
                className,
            )}
            {...restProps}
        >
            {children}
        </div>
    );
};

/** {@link Page} alias */
export const PageLike = Page;
