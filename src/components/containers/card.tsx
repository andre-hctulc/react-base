import { tv } from "tailwind-variants";
import type { ELEMENT, RichAsProps, WithTVProps } from "../../types/index.js";

// TODO use rem

const card = tv({
    base: "transition overflow-hidden flex flex-col",
    variants: {
        variant: {
            custom: "",
            outlined: "border bg-paper",
            elevated: "shadow-md bg-paper",
            elevated_sm: "shadow-sm bg-paper",
            contrast: "bg-paper2",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            true: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        bg: {
            "1": "bg-paper",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
            "5": "bg-paper5",
            transparent: "transparent",
            auto: "",
        },
        rounded: {
            none: "",
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
        },
        border: {
            none: "",
            default: "border",
            thin: "border-[0.5px]",
            thicker: "border-[1.5px]",
        },
        width: {
            none: "",
            auto: "w-auto",
            xs: "w-[150px]",
            sm: "w-[250px]",
            md: "w-[350px]",
            lg: "w-[450px]",
            xl: "w-[550px]",
            "2xl": "w-[750px]",
            fit: "w-fit",
        },
        maxWidth: {
            xs: "max-w-[150px]",
            sm: "max-w-[250px]",
            md: "max-w-[350px]",
            lg: "max-w-[450px]",
            xl: "max-w-[550px]",
            "2xl": "max-w-[750px]",
        },
        height: {
            none: "",
            auto: "h-auto",
            xs: "h-[100px]",
            sm: "h-[150px]",
            md: "h-[230px]",
            lg: "h-[300px]",
            xl: "h-[400px]",
            "2xl": "h-[500px]",
            fit: "h-fit",
        },
        active: {
            true: "border border-primary ring-2 ring-offset-3 ring-primary",
            false: "",
        },
        hoverEffect: {
            true: "hover:border-primary cursor-pointer",
            false: "",
        },
    },
    defaultVariants: {
        elevated: "0",
        rounded: "lg",
        variant: "outlined",
        bg: "auto",
    },
});

type CardProps<T extends ELEMENT = "div"> = WithTVProps<
    RichAsProps<T> & {
        size?: "xs" | "sm" | "md" | "lg" | "xl" | "fit" | "none" | "2xl" | "auto";
        as?: any;
    },
    typeof card
>;

export const Card = <T extends ELEMENT = "div">({
    children,
    shadow,
    className,
    border,
    bg,
    width,
    height,
    size,
    variant,
    rounded,
    active,
    ref,
    hoverEffect,
    maxWidth,
    ...props
}: CardProps<T>) => {
    const Comp: any = props.as || "div";

    return (
        <Comp
            ref={ref as any}
            className={card({
                shadow,
                rounded,
                bg,
                className,
                border,
                width: width ?? size,
                height: height ?? size,
                variant,
                active,
                hoverEffect,
                maxWidth,
            })}
            {...props}
        >
            {children}
        </Comp>
    );
};
