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
        border: {
            true: "border-t",
            false: "",
        },
        size: {
            none: "",
            xs: "p-2",
            sm: "p-3 ",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
            "2xl": "p-10",
            "3xl": "p-14",
        },
    },
    defaultVariants: {
        size: "md",
        border: false,
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
    border,
    style,
    size,
    as,
    variant,
}) => {
    const Comp = as || "div";

    return (
        <Comp className={cardFooter({ className, border, size, variant })} style={style}>
            {children}
        </Comp>
    );
};
