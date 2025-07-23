import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf } from "../../types/index.js";
import type { FC } from "react";

const badge = tv({
    base: "flex items-center justify-center overflow-hidden shrink-0",
    variants: {
        size: {
            dot: "size-2",
            xs: "size-3 text-[7px]",
            sm: "size-4 text-[10px]",
            md: "size-5 text-xs",
            lg: "size-6 text-sm",
            xl: "size-8",
            custom: "",
        },
        fontWeight: {
            bold: "font-bold",
            medium: "font-medium",
            normal: "",
            thin: "font-thin",
        },
        color: {
            primary: "bg-primary text-primary-contrast",
            secondary: "bg-secondary text-secondary-contrast",
            accent: "bg-accent text-accent-contrast",
            success: "bg-success text-success-contrast",
            error: "bg-error text-error-contrast",
            warning: "bg-warning text-warning-contrast",
            info: "bg-info text-info-contrast",
            neutral: "bg-neutral text-neutral-contrast",
        },
        block: {
            true: "block",
        },
        shape: {
            circle: "rounded-full",
            square: "rounded-sm",
            sharp: "",
            rounded: "rounded-xl",
        },
    },
    defaultVariants: {
        color: "primary",
        shape: "circle",
        block: false,
        size: "sm",
    },
});

interface BadgeProps extends VariantProps<typeof badge>, Omit<PropsOf<"span">, "color"> {
    max?: number;
    as?: any;
}

export const Badge: FC<BadgeProps> = ({
    children,
    max,
    className,
    shape,
    color,
    block,
    as,
    size,
    fontWeight,
    ...props
}) => {
    const child =
        typeof children === "number"
            ? Math.min(children, max ?? 99)
            : typeof children === "string"
            ? children?.substring(0, 2)
            : children;
    const Comp = as || "span";

    return (
        <Comp className={badge({ className, shape, color, block, size, fontWeight })} {...props}>
            {size !== "dot" && child}
        </Comp>
    );
};
