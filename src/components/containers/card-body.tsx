import { tv, type VariantProps } from "tailwind-variants";
import { type FC, type ReactNode } from "react";

const cardBody = tv({
    base: "grow max-h-full min-h-0 overflow-auto not-first:pt-0 not-last:pb-0",
    variants: {
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
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
        scroll: {
            true: "overflow-y-auto",
        },
        grow: {
            true: "grow",
        },
        fullHeight: {
            true: "h-full",
        },
        alignItems: {
            center: "items-center",
            start: "items-start",
            end: "items-end",
        },
    },
    defaultVariants: {
        size: "md",
        embedded: false,
    },
});

interface CardBodyProps extends VariantProps<typeof cardBody> {
    children?: ReactNode;
    className?: string;
    as?: any;
}

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const CardBody: FC<CardBodyProps> = ({
    children,
    className,
    flex,
    as,
    size,
    grow,
    fullHeight,
    alignItems,
    scroll,
}) => {
    const Comp = as || "div";
    return (
        <Comp className={cardBody({ className, size, flex, grow, fullHeight, alignItems, scroll })}>
            {children}
        </Comp>
    );
};
