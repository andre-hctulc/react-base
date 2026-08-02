import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn/cn.util.js";
import type { RichAsProps } from "@/types/index.js";
import { type FC, type ElementType } from "react";
import { msz, sz } from "@/util/react/variants.util.js";

const toolbarVariants = cva("flex min-w-0", {
    variants: {
        direction: {
            row: "flex-row",
            row_reverse: "flex-row-reverse",
            col: "flex-col",
            col_reverse: "flex-col-reverse",
        },
        gap: sz("gap"),
        rowGap: sz("row-gap"),
        colGap: sz("column-gap"),
        p: sz("p"),
        px: sz("px"),
        py: sz("py"),
        pt: sz("pt"),
        pr: sz("pr"),
        pb: sz("pb"),
        pl: sz("pl"),
        alignItems: {
            auto: "",
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justifyContent: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        grow: { true: "grow", false: "" },
        noShrink: { true: "shrink-0", false: "" },
        wrap: {
            none: "flex-nowrap",
            normal: "flex-wrap",
            reverse: "flex-wrap-reverse",
        },
        scroll: { true: "overflow-auto", false: "" },
        scrollY: { true: "overflow-y-auto", false: "" },
        scrollX: { true: "overflow-x-auto", false: "" },
        m: msz("m"),
        mx: msz("mx"),
        my: msz("my"),
        mt: msz("mt"),
        mr: msz("mr"),
        mb: msz("mb"),
        ml: msz("ml"),
        mlAuto: { true: "ml-auto", false: "" },
    },
    defaultVariants: {
        gap: "md",
        alignItems: "center",
    },
});

export type ToolbarProps<T extends ElementType = "div"> = RichAsProps<T> &
    VariantProps<typeof toolbarVariants> & {
        stopEventPropagation?: boolean;
    };

/**
 * ### Props
 * - `stopEventPropagation`
 */
export const Toolbar: FC<ToolbarProps> = (props) => {
    const {
        direction,
        gap,
        rowGap,
        colGap,
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        alignItems,
        justifyContent,
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
    } = props;
    const Comp: any = as || "div";

    return (
        <Comp
            className={cn(
                toolbarVariants({
                    direction,
                    gap,
                    rowGap,
                    colGap,
                    p,
                    px,
                    py,
                    pt,
                    pr,
                    pb,
                    pl,
                    alignItems,
                    justifyContent,
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
                }),
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
