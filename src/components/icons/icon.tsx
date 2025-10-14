import { cloneElement, isValidElement, type FC, type ReactElement, type ReactNode, type Ref } from "react";
import { tv } from "tailwind-variants";
import clsx from "clsx";
import type { StyleProps, WithTVProps } from "../../types/index.js";

const icon = tv({
    base: "",
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
            "7xl": "text-7xl",
            "8xl": "text-8xl",
            "9xl": "text-9xl",
            none: "",
            inherit: "",
        },
        color: {
            none: "",
            primary: "text-primary",
            secondary: "text-secondary",
            accent: "text-accent",
            success: "text-success",
            error: "text-error",
            warning: "text-warning",
            info: "text-info",
            inherit: "text-inherit",
            neutral: "text-neutral",
            t2: "text-t2",
            t3: "text-t3",
            t4: "text-t4",
            black: "text-black",
            white: "text-white",
        },
        inline: {
            true: "inline",
            flex: "inline-flex",
        },
        noShrink: {
            true: "shrink-0",
            false: "",
        },
    },
    defaultVariants: {
        size: "inherit",
        color: "inherit",
    },
});

export type IconProps = WithTVProps<
    StyleProps & {
        children: ReactNode;
        strokeWidth?: number | string;
        height?: number | string;
        width?: number | string;
        fill?: string;
        ref?: Ref<any>;
    },
    typeof icon
>;

export const Icon: FC<IconProps> = ({
    className,
    children,
    size,
    color,
    inline,
    strokeWidth,
    height,
    width,
    fill,
    ref,
    noShrink,
    ...props
}) => {
    const classes = icon({ className, size, color, inline, noShrink });
    let additionalProps: any = {};

    if (!isValidElement(children))
        return (
            <span ref={ref} className={classes}>
                {children}
            </span>
        );

    if (strokeWidth !== undefined) additionalProps.strokeWidth = strokeWidth;
    if (height !== undefined) additionalProps.height = height;
    if (width !== undefined) additionalProps.width = width;
    if (fill !== undefined) additionalProps.fill = fill;

    return cloneElement(children as ReactElement, {
        ref,
        className: clsx(classes, ((children as ReactElement).props as any)?.className),
        ...additionalProps,
        ...props,
    });
};
