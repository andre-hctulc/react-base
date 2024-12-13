import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps, TVCProps } from "../../types";
import { withPrefix } from "../../util/system";
import React from "react";

const card = tv({
    base: "bg overflow-hidden",
    variants: {
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        elevated: {
            "0": "",
            "1": "bg-2",
            "2": "bg-3",
            "3": "bg-4",
            "4": "bg-5",
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
    },
    defaultVariants: {
        elevated: "0",
        rounded: "lg",
    },
});

interface CardProps extends TVCProps<typeof card, "div"> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, shadow, className, border, elevated, ...props }, ref) => {
        return (
            <div ref={ref} className={card({ shadow, elevated, className, border })} {...props}>
                {children}
            </div>
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
            none: "",
            sm: "p-2",
            md: "p-3",
            lg: "p-4",
            responsive: "p-2 md:p-3 lg:p-4",
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
    extra?: React.ReactNode;
    style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    className,
    title,
    padding,
    border,
    ...props
}) => {
    return (
        <div className={cardHeader({ className, padding, border })} style={props.style}>
            {(title || props.extra) && (
                <div className="flex items-center">
                    <span className="font-medium">{title}</span>
                    {props.extra && <div className="ml-auto pl-1">{props.extra}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

const cardBody = tv({
    variants: {
        padding: {
            none: "",
            sm: "py-1 px-1.5",
            md: "py-2 px-2.5",
            lg: "py-3 px-3.5",
            responsive: "py-1 px-1.5 md:py-2 md:px-2.5 lg:py-3 lg:px-3.5",
        },
        flex: {
            col: "flex flex-col",
            row: "flex flex-row",
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

export const CardBody: React.FC<CardBodyProps> = ({ children, className, flex, as, padding }) => {
    const Comp = as || "div";
    return <Comp className={cardBody({ className, padding, flex })}>{children}</Comp>;
};

const cardFooter = tv({
    variants: {
        border: {
            true: "border-t",
        },
        padding: {
            none: "",
            sm: "p-2",
            md: "p-3",
            lg: "p-4",
            responsive: "p-2 md:p-3 lg:p-4",
        },
    },
    defaultVariants: {
        padding: "md",
        border: false,
    },
});

interface CardFooterProps extends VariantProps<typeof cardFooter>, StyleProps {
    children?: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, border, style, padding }) => {
    return (
        <div className={cardFooter({ className, border, padding })} style={style}>
            {children}
        </div>
    );
};
