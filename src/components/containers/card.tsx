import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import { type FC } from "react";

const card = tv({
    base: "overflow-hidden flex flex-col",
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
    },
    defaultVariants: {
        elevated: "0",
        rounded: "lg",
        variant: "outlined",
        bg: "auto",
    },
});

interface CardProps extends TVCProps<typeof card, "div"> {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "fit" | "none" | "2xl" | "auto";
    as?: any;
}

export const Card: FC<CardProps> = ({
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
    ref,
    ...props
}) => {
    const Comp = props.as || "div";

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
            })}
            {...props}
        >
            {children}
        </Comp>
    );
};
