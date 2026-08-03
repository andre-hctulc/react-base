import { cn } from "@/util/cn.util.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz } from "@/util/react/variants.util.js";
import { type FC, type ComponentProps } from "react";
import { Slot } from "radix-ui";

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

export interface SpacerProps extends ComponentProps<"div">, VariantProps<typeof spacerVariants> {
    asChild?: boolean;
}

export const Spacer: FC<SpacerProps> = (props) => {
    const { variant, wrap, gap, rowGap, colGap, className, asChild, ...restProps } = props;
    const Comp: any = asChild ? Slot : "div";
    return (
        <Comp
            className={cn(spacerVariants({ variant, wrap, gap, rowGap, colGap }), className)}
            {...restProps}
        />
    );
};
