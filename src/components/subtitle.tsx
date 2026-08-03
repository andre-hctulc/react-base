import { type FC, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.js";
import { msz } from "@/lib/variants.util.js";
import { Slot } from "radix-ui";
import { Icon, type IconLike, type IconProps } from "@/components/icon.js";

const subtitleVariants = cva("text-t-2", {
    variants: {
        variant: {
            h2: "text-xl",
            h3: "text-lg",
            h4: "text-base",
            h5: "text-sm",
        },
        bold: { true: "font-semibold", false: "font-medium" },
        underline: { true: "underline" },
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
    defaultVariants: { variant: "h2", bold: false },
});

export interface SubtitleProps extends ComponentProps<"h2">, VariantProps<typeof subtitleVariants> {
    asChild?: boolean;
    icon?: IconLike;
    iconProps?: IconProps;
}

export const Subtitle: FC<SubtitleProps> = (props) => {
    const {
        variant,
        bold,
        underline,
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
        asChild,
        ...restProps
    } = props;
    const Comp: any = asChild ? Slot : (variant as string);

    return (
        <Comp
            className={cn(
                subtitleVariants({ variant, bold, underline, lineClamp, m, mx, my, mt, mr, mb, ml, me, ms }),
                icon && "flex items-center",
                className,
            )}
            {...restProps}
        >
            {icon && (
                <Icon noShrink inline {...iconProps} className={cn("mr-2", iconProps?.className)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
