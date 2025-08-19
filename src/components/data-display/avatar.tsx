import { tv } from "tailwind-variants";
import { type FC } from "react";
import type { ELEMENT, RichAsProps, WithTVProps } from "../../types/index.js";

const avatar = tv({
    base: "flex items-center justify-center overflow-hidden shrink-0 aspect-square transition",
    variants: {
        shape: {
            circle: "rounded-full",
            square: "rounded-sm",
        },
        bg: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
            none: "",
        },
        size: {
            xs: "size-6 text-sm",
            sm: "size-8 text-base",
            md: "size-10 text-lg",
            lg: "size-14 text-xl",
            xl: "size-16 text-2xl",
            auto: "",
            none: "",
        },
        border: {
            true: "border-[1.5px]",
            false: "",
        },
        padding: {
            sm: "p-1",
            md: "p-2",
            lg: "p-3",
            xl: "p-4",
            "2xl": "p-5",
            "50%": "p-[50%]",
        },
        bold: {
            true: "font-medium",
        },
        clickable: {
            true: "cursor-pointer hover:brightness-95 active:brightness-90",
            false: "",
        },
        textColor: {
            "1": "text-t1",
            "2": "text-t2",
            "3": "text-t3",
            "4": "text-t4",
        },
        shadow: {
            xs: "shadow-xs",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
    },
    defaultVariants: {
        shape: "circle",
        bg: "3",
        textColor: "2",
        size: "md",
    },
});

type AvatarProps<T extends ELEMENT = "div"> = WithTVProps<
    RichAsProps<T> & {
        alt?: string;
    },
    typeof avatar
>;

export const Avatar: FC<AvatarProps> = ({
    alt,
    className,
    size,
    shape,
    padding,
    children,
    as,
    bold,
    textColor,
    ref,
    onClick,
    border,
    clickable,
    shadow,
    ...props
}) => {
    const Comp: any = as || "div";

    return (
        <Comp
            ref={ref}
            onClick={onClick}
            className={avatar({
                size,
                shape,
                padding,
                className,
                textColor,
                bold,
                border,
                shadow,
                clickable: clickable ?? !!onClick,
            })}
            {...props}
        >
            {children}
        </Comp>
    );
};
