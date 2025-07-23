import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import { type FC } from "react";

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
            xs: "size-6 text-base",
            sm: "size-8 text-lg",
            md: "size-10 text-xl",
            lg: "size-14 text-2xl",
            xl: "size-16 text-3xl",
            auto: "",
            none: "",
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
    },
    defaultVariants: {
        shape: "circle",
        bg: "3",
        textColor: "2",
        size: "md",
    },
});

export interface AvatarProps extends TVCProps<typeof avatar, "div"> {
    as?: any;
    alt?: string;
}

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
    clickable,
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
                clickable: clickable ?? !!onClick,
            })}
            {...props}
        >
            {children}
        </Comp>
    );
};
