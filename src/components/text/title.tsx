import { type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.js";
import { msz } from "@/util/react/variants.util.js";
import type { RichAsProps } from "@/types/index.js";
import { Icon, type IconLike, type IconProps } from "@/components/icons/icon.js";

const titleVariants = cva("", {
    variants: {
        variant: {
            h1: "text-2xl",
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
        },
        bold: { true: "font-semibold", false: "font-medium" },
        underline: { true: "underline" },
        truncate: { true: "truncate" },
        lineClamp: {
            none: "",
            "1": "line-clamp-1",
            "2": "line-clamp-2",
            "3": "line-clamp-3",
            "4": "line-clamp-4",
            "5": "line-clamp-5",
            "6": "line-clamp-6",
            "7": "line-clamp-7",
            "8": "line-clamp-8",
            "9": "line-clamp-9",
            "10": "line-clamp-10",
        },
        m: msz("m"),
        mx: msz("mx"),
        my: msz("my"),
        mt: msz("mt"),
        mr: msz("mr"),
        mb: msz("mb"),
        ml: msz("ml"),
        me: msz("me"),
        ms: msz("ms"),
    },
    defaultVariants: { variant: "h1", bold: false },
});

export type TitleProps<T extends ElementType = "h1"> = RichAsProps<T> &
    VariantProps<typeof titleVariants> & {
        icon?: IconLike;
        iconProps?: IconProps;
    };

export { titleVariants };

export const Title = <T extends ElementType = "h1">(props: TitleProps<T>) => {
    const {
        variant,
        bold,
        underline,
        truncate,
        icon,
        iconProps,
        lineClamp,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        me,
        ms,
        className,
        children,
        as,
        ...restProps
    } = props as any;
    const Comp: any = as || variant;

    return (
        <Comp
            className={cn(
                titleVariants({
                    variant,
                    bold,
                    underline,
                    truncate,
                    lineClamp,
                    m,
                    mx,
                    my,
                    mt,
                    mr,
                    mb,
                    ml,
                    me,
                    ms,
                }),
                icon && "flex items-center",
                className,
            )}
            {...restProps}
        >
            {icon && (
                <Icon noShrink inline {...iconProps} className={cn("mr-2.5", iconProps?.className)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
