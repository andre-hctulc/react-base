import clsx from "clsx";
import { tv, type ClassValue } from "tailwind-variants";
import type { TVCProps, XStyleProps } from "../../types";

const card = tv({
    base: "rounded-lg",
    variants: {
        shadow: {
            none: "",
            sm: "shadow-sm",
            md: "shadow",
            lg: "shadow-md",
            xl: "shadow-lg",
        },
        elevated: {
            1: "bg-elevated-1",
            2: "bg-elevated-2",
            3: "bg-elevated-3",
        },
    },
    defaultVariants: {
        shadow: "none",
    },
});

interface CardProps extends TVCProps<typeof card, "div"> {
    border?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, shadow, className, border, elevated, ...props }) => {
    return (
        <div className={card({ shadow, elevated, className: [className, border && "border"] })} {...props}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children?: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, title, ...props }) => {
    return (
        <div className={clsx(className, "p-3 border-b")} style={props.style}>
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

interface CardBodyProps {
    children?: React.ReactNode;
    className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
    return <div className={clsx("py-2 px-2.5", className)}>{children}</div>;
};

interface CardFooterProps {
    children?: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};
