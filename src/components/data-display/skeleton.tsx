import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import "./skeleton.css";
import { withPrefix } from "../../util/system";

const skeleton = tv({
    base: [withPrefix("Skeleton"), "animate-skeleton"],
    variants: {
        shape: {
            rounded_sm: "rounded-xs",
            rounded_base: "rounded-sm",
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

interface SkeletonProps extends VariantProps<typeof skeleton> {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    /**
     * @default true
     */
    childrenVisible?: boolean;
    height?: number;
    maxHeight?: number;
    size?: number;
    minHeight?: number;
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    as?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    children,
    className,
    shape,
    style,
    childrenVisible,
    height,
    width,
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    padding,
    size,
    as,
}) => {
    const Comp = as || "div";

    return (
        <Comp
            data-children-visible={childrenVisible ?? true}
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
            {children}
        </Comp>
    );
};
