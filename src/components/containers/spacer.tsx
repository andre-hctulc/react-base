import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { flexWrap, withGap, type FlexWrap } from "../../util/style.js";
import type { ElementType } from "react";
import type { RichAsProps } from "../../types/index.js";

const variantMap = {
    row: "",
    col: "flex-col",
} as const;

type GapSize = keyof typeof withGap.gap;

export type SpacerProps<T extends ElementType = "div"> = RichAsProps<T> & {
    variant?: keyof typeof variantMap;
    wrap?: FlexWrap;
    gap?: GapSize;
    rowGap?: GapSize;
    colGap?: GapSize;
};

/**
 * Flex container with gap between children.
 *
 * ### Props
 * - `variant` - "row" (default) | "col"
 * - `gap`
 * - `wrap`
 * - `as`
 */
export const Spacer = <T extends ElementType = "div">(props: SpacerProps<T>) => {
    const { variant = "row", wrap, gap = "md", rowGap, colGap, className, as, ...restProps } = props as any;
    const Comp: any = as || "div";
    return (
        <Comp
            className={cn(
                "flex",
                collapse(variantMap, variant),
                wrap && collapse(flexWrap, wrap!),
                collapse(withGap.gap, gap),
                rowGap && collapse(withGap.rowGap, rowGap),
                colGap && collapse(withGap.colGap, colGap),
                className,
            )}
            {...restProps}
        />
    );
};
