import { cn } from "@/util/cn.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz } from "@/util/react/variants.util.js";
import type { ElementType } from "react";
import type { RichAsProps } from "@/types/index.js";

const spacerVariants = cva("flex", {
    variants: {
        variant: {
            row: "",
            col: "flex-col",
        },
        wrap: {
            none: "flex-nowrap",
            normal: "flex-wrap",
            reverse: "flex-wrap-reverse",
        },
        gap: sz("gap"),
        rowGap: sz("row-gap"),
        colGap: sz("column-gap"),
    },
    defaultVariants: { variant: "row", gap: "md" },
});

export type SpacerProps<T extends ElementType = "div"> = RichAsProps<T> & VariantProps<typeof spacerVariants>;

export const Spacer = <T extends ElementType = "div">(props: SpacerProps<T>) => {
    const { variant, wrap, gap, rowGap, colGap, className, as, ...restProps } = props as any;
    const Comp: any = as || "div";
    return (
        <Comp
            className={cn(spacerVariants({ variant, wrap, gap, rowGap, colGap }), className)}
            {...restProps}
        />
    );
};
