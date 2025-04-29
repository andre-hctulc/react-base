import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";
import type { FC, ReactNode } from "react";

const cardFooter = tv({
    base: "",
    variants: {
        variant: {
            flex: "flex",
            default: "",
            actions: "flex justify-end",
        },
        noBorder: {
            false: "border-t",
            true: "",
        },
        size: {
            none: "",
            xs: "p-1.5",
            sm: "p-2 ",
            md: "p-3",
            lg: "p-5",
            xl: "p-7",
            "2xl": "p-10",
        },
    },
    defaultVariants: {
        size: "md",
        noBorder: false,
        variant: "default",
    },
});

interface CardFooterProps extends VariantProps<typeof cardFooter>, StyleProps {
    children?: ReactNode;
    as?: any;
}

export const CardFooter: FC<CardFooterProps> = ({
    children,
    className,
    noBorder,
    style,
    size,
    as,
    variant,
}) => {
    const Comp = as || "div";

    return (
        <Comp className={cardFooter({ className, noBorder, size, variant })} style={style}>
            {children}
        </Comp>
    );
};
