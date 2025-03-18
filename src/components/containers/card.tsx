import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf, StyleProps, TVCProps } from "../../types/index.js";
import { withPrefix } from "../../util/system.js";
import React from "react";
import clsx from "clsx";
import { Icon } from "../icons/icon.js";
import { Title } from "../text/title.js";

const card = tv({
    base: "overflow-hidden",
    variants: {
        variant: {
            custom: "",
            outlined: "border",
            elevated: "shadow-sm",
        },
        flex: {
            true: "flex flex-col",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
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
        },
    },
    defaultVariants: {
        elevated: "0",
        rounded: "lg",
        variant: "outlined",
        bg: "1",
    },
});

export interface CardProps extends TVCProps<typeof card, "div"> {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    as?: any;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
    ({ children, shadow, className, border, bg, width, height, size, variant, rounded, flex, ...props }, ref) => {
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
                    flex,
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
            false: "pb-0!",
        },
        padding: {
            none: "",
            xs: "p-1.5",
            sm: "p-2 ",
            md: "p-3",
            lg: "p-5",
            xl: "p-7",
            "2xl": "p-10",
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
    titleProps?: PropsOf<typeof Title>;
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
    titleProps,
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
                    <Title variant="h4" {...titleProps}>
                        {title}
                    </Title>
                    {actions && <div className="ml-auto">{actions}</div>}
                </div>
            )}
            {children}
        </Comp>
    );
};

const cardBody = tv({
    base: "grow max-h-full",
    variants: {
        padding: {
            none: "",
            xs: "p-1.5",
            sm: "py-2 px-2.5",
            md: "py-3 px-3.5",
            lg: "py-5 px-6",
            xl: "py-7 px-8",
            "2xl": "p-12",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
        scroll: {
            true: "overflow-y-auto",
        },
        grow: {
            true: "grow",
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

export const CardBody: React.FC<CardBodyProps> = ({ children, className, flex, as, padding, grow, fullHeight, alignItems, scroll }) => {
    const Comp = as || "div";
    return <Comp className={cardBody({ className, padding, flex, grow, fullHeight, alignItems, scroll })}>{children}</Comp>;
};

const cardFooter = tv({
    base: "mt-auto justify-self-end",
    variants: {
        variant: {
            flex: "flex",
            default: "",
            actions: "flex justify-end",
        },
        border: {
            true: "border-t",
        },
        padding: {
            none: "",
            xs: "p-1.5",
            sm: "py-2 ",
            md: "py-3",
            lg: "py-5",
            xl: "py-7",
            "2xl": "py-10",
        },
    },
    defaultVariants: {
        padding: "md",
        border: false,
        variant: "default",
    },
});

interface CardFooterProps extends VariantProps<typeof cardFooter>, StyleProps {
    children?: React.ReactNode;
    as?: any;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, border, style, padding, as, variant }) => {
    const Comp = as || "div";

    return (
        <Comp className={cardFooter({ className, border, padding, variant })} style={style}>
            {children}
        </Comp>
    );
};
