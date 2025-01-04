import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf, StyleProps, TVCProps } from "../../types";
import { withPrefix } from "../../util/system";
import React from "react";
import clsx from "clsx";
import { Icon } from "../icons";

const card = tv({
    base: "overflow-hidden",
    variants: {
        variant: {
            custom: "",
            outlined: "border",
            elevated: "shadow",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        bg: {
            "1": "bg",
            "2": "bg-2",
            "3": "bg-3",
            "4": "bg-4",
            "5": "bg-5",
        },
        rounded: {
            none: "",
            sm: "rounded-sm",
            base: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
        },
        border: {
            none: "",
            border: "border",
            thin: "border-[0.5px]",
        },
        width: {
            none: "",
            auto: "w-auto",
            xs: "w-[150px]",
            sm: "w-[250px]",
            md: "w-[350px]",
            lg: "w-[450px]",
            xl: "w-[550px]",
        },
        height: {
            none: "",
            auto: "h-auto",
            xs: "h-[100px]",
            sm: "h-[150px]",
            md: "h-[230px]",
            lg: "h-[300px]",
            xl: "h-[400px]",
        },
    },
    defaultVariants: {
        elevated: "0",
        rounded: "lg",
        variant: "outlined",
        bg: "1",
    },
});

interface CardProps extends TVCProps<typeof card, "div"> {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    as?: any;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
    ({ children, shadow, className, border, bg, width, height, size, variant, ...props }, ref) => {
        const Comp = props.as || "div";

        return (
            <Comp
                ref={ref as any}
                className={card({
                    shadow,
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
    }
);

Card.displayName = withPrefix("Card");

const cardHeader = tv({
    variants: {
        border: {
            true: "border-b",
        },
        padding: {
            xs: "p-1.5",
            sm: "p-2 ",
            md: "p-3",
            lg: "p-5",
            xl: "p-7",
        },
    },
    defaultVariants: {
        padding: "md",
        border: true,
    },
});

interface CardHeaderProps extends VariantProps<typeof cardHeader> {
    children?: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
    badges?: React.ReactNode;
    actions?: React.ReactNode;
    style?: React.CSSProperties;
    innerProps?: PropsOf<"div">;
    icon?: React.ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    as?: any;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className,
    title,
    padding,
    border,
    badges,
    actions,
    innerProps,
    iconProps,
    icon,
    as,
    ...props
}) => {
    const renderInner = !!title || !!actions || !!badges || !!icon;
    const Comp = as || "div";

    return (
        <Comp className={cardHeader({ className, padding, border })} style={props.style}>
            {renderInner && (
                <div {...innerProps} className={clsx("flex items-center gap-3", innerProps?.className)}>
                    {icon && <Icon {...iconProps}>{icon}</Icon>}
                    {badges}
                    <span className="font-medium">{title}</span>
                    {actions && <div className="ml-auto">{actions}</div>}
                </div>
            )}
            {children}
        </Comp>
    );
};

const cardBody = tv({
    base: "grow",
    variants: {
        padding: {
            none: "",
            xs: "p-1.5",
            sm: "py-2 px-2.5",
            md: "py-3 px-3.5",
            lg: "py-5 px-6",
            xl: "py-7 px-8",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
        grow: {
            true: "flex-grow",
        },
        fullHeight: {
            true: "h-full",
        },
        alignItems: {
            center: "items-center",
            start: "items-start",
            end: "items-end",
        },
    },
    defaultVariants: {
        padding: "md",
    },
});

interface CardBodyProps extends VariantProps<typeof cardBody> {
    children?: React.ReactNode;
    className?: string;
    as?: any;
}

export const CardBody: React.FC<CardBodyProps> = ({
    children,
    className,
    flex,
    as,
    padding,
    grow,
    fullHeight,
    alignItems,
}) => {
    const Comp = as || "div";
    return (
        <Comp className={cardBody({ className, padding, flex, grow, fullHeight, alignItems })}>
            {children}
        </Comp>
    );
};

const cardFooter = tv({
    variants: {
        border: {
            true: "border-t",
        },
        padding: {
            xs: "p-1.5",
            sm: "py-2 ",
            md: "py-3",
            lg: "py-5",
            xl: "py-7",
        },
    },
    defaultVariants: {
        padding: "md",
        border: false,
    },
});

interface CardFooterProps extends VariantProps<typeof cardFooter>, StyleProps {
    children?: React.ReactNode;
    as?: any;
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    className,
    border,
    style,
    padding,
    as,
}) => {
    const Comp = as || "div";

    return (
        <Comp className={cardFooter({ className, border, padding })} style={style}>
            {children}
        </Comp>
    );
};
