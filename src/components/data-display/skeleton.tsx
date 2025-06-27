import { tv, type VariantProps } from "tailwind-variants";
import "./skeleton.css";
import { withPrefix } from "../../util/system.js";
import type { FC } from "react";

const skeleton = tv({
    base: [withPrefix("Skeleton"), "animate-skeleton"],
    variants: {
        shape: {
            rounded_xs: "rounded-xs",
            rounded_sm: "rounded-sm",
            rounded_md: "rounded-md",
            rounded_lg: "rounded-lg",
            rounded_xl: "rounded-xl",
            rounded_2xl: "rounded-2xl",
            rounded_3xl: "rounded-3xl",
            circle: "rounded-full",
            square: "rounded-[1px]",
        },
        padding: {
            none: "",
            xs: "p-0.5",
            sm: "p-1",
            md: "p-2.5",
            lg: "p-5",
            xl: "p-8",
        },
    },
    defaultVariants: {
        shape: "rounded_md",
    },
});

export interface SkeletonProps extends VariantProps<typeof skeleton> {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    /**
     * The content is always rendered, but hidden.
     * Does not work for text nodes.
     * @default false
     */
    occupy?: boolean;
    height?: number;
    maxHeight?: number;
    size?: number;
    minHeight?: number;
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    as?: any;
    /**
     * Is skeleton active?
     *
     * `false`: Render children as received
     *
     * @default true
     */
    active?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({
    children,
    className,
    shape,
    style,
    occupy,
    height,
    width,
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    padding,
    size,
    as,
    active,
}) => {
    const Comp = as || "div";

    if (active === false) {
        return children;
    }

    return (
        <Comp
            data-children-occupy-space={occupy}
            className={skeleton({ className, shape, padding })}
            style={{
                height: height ?? size,
                minHeight,
                maxHeight,
                width: width ?? size,
                minWidth,
                maxWidth,
                ...style,
            }}
        >
            {occupy && children}
        </Comp>
    );
};
