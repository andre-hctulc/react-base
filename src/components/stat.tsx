"use client";

import { cn } from "@/lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { useMemo, type FC, type ComponentProps, type ComponentType } from "react";
import { Slot } from "radix-ui";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { Icon, type IconLike } from "./icon.js";
import { Skeleton } from "@/components/ui/skeleton.js";

const statVariants = cva("bg-paper-2 rounded-lg", {
    variants: {
        size: {
            xs: "text-xs p-1",
            sm: "text-sm p-2",
            md: "text-base p-2.5",
            lg: "text-lg p-3",
            xl: "text-xl p-4",
            "2xl": "text-2xl p-5",
        },
        color: {
            default: "",
            primary: "bg-primary-50 text-primary-700",
            secondary: "bg-secondary-50 text-secondary-700",
            success: "bg-success-50 text-success-700",
            error: "bg-error-50 text-error-700",
            danger: "bg-danger-50 text-danger-700",
            warning: "bg-warning-50 text-warning-700",
            info: "bg-info-50 text-info-700",
            blue: "bg-blue-50 text-blue-700",
            green: "bg-green-50 text-green-700",
            red: "bg-red-50 text-red-700",
            gray: "bg-gray-50 text-gray-700",
        },
        shadow: {
            none: "shadow-none",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
            inner: "shadow-inner",
        },
        border: {
            true: "border",
            false: "border-0",
            thin: "border-[0.5px]",
            thinnest: "border-[0.5px]",
            thicker: "border-[1.5px]",
            thick: "border-2",
        },
        fitWidth: { true: "w-fit", false: "" },
        fitHeight: { true: "h-fit", false: "" },
    },
    defaultVariants: { size: "md", border: true, fitWidth: true },
});
interface StatProps extends Omit<ComponentProps<"div">, "color">, VariantProps<typeof statVariants> {
    asChild?: boolean;
    valueParser?: (value: any) => string;
    value: any;
    description?: string;
    descriptionProps?: ComponentProps<"p">;
    textProps?: ComponentProps<"p">;
    icon?: IconLike;
    LinkComponent?: any;
    linkProps?: ComponentProps<"a">;
    href?: string;
    skeletonProps?: ComponentProps<typeof Skeleton>;
    unit?: string;
    iconProps?: ComponentProps<typeof Icon>;
    unitProps?: ComponentProps<"span">;
}

/**
 * ### Props
 * - `value`
 * - `description`
 * - `valueParser`
 * - `loading`
 * - `as`
 * - `href`
 * - `LinkComponent`
 */
export const Stat: FC<StatProps> = (props) => {
    const {
        size,
        color,
        shadow,
        border,
        fitWidth,
        fitHeight,
        valueParser,
        value,
        description,
        descriptionProps,
        textProps,
        icon,
        linkProps,
        children,
        href,
        LinkComponent,
        asChild,
        skeletonProps,
        unit,
        unitProps,
        iconProps,
        className,
        ...rootProps
    } = props;

    const Comp: any = asChild ? Slot : "div";
    const MainComp: any = href ? LinkComponent || "a" : "div";
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(value) : String(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const isDefaultColor = !color || color === "default";
    const mainProps: any = { ...textProps };

    if (href) {
        Object.assign(mainProps, linkProps);
        mainProps.href = href;
    }

    return (
        <Comp
            className={cn(statVariants({ size, color, shadow, border, fitWidth, fitHeight }), className)}
            {...rootProps}
        >
            <MainComp {...mainProps} className={cn("font-medium text-[1em]", textProps?.className)}>
                {icon && (
                    <Icon
                        color={isDefaultColor ? "neutral" : "inherit"}
                        inline
                        {...iconProps}
                        className={cn("mr-2", iconProps?.className)}
                    >
                        {icon}
                    </Icon>
                )}
                {unit && (
                    <span {...unitProps} className={cn("ml-1 text-[1.2em]", unitProps?.className)}>
                        {unit}
                    </span>
                )}
            </MainComp>
            {description && (
                <p
                    {...descriptionProps}
                    className={cn("text-[0.9em]", isDefaultColor && "text-t-2", descriptionProps?.className)}
                >
                    {description}
                </p>
            )}
            {children}
        </Comp>
    );
};
