import clsx from "clsx";
import type React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { Title } from "../text/title";
import type { PropsOf } from "../../types";

const pageHeader = tv({
    base: "w-full",
    variants: {
        px: {
            none: "",
            sm: "px-2 md:px-4",
            md: "px-4 md:px-8",
            lg: "px-8 md:px-12",
        },
        pt: {
            none: "",
            sm: "pt-2 md:pt-4",
            md: "pt-4 md:pt-7",
            lg: "pt-7 md:pt-10",
        },
        mb: {
            none: "",
            xs: "mb-4",
            sm: "mb-8",
            md: "mb-12",
            lg: "mb-16",
            xl: "mb-20",
        },
    },
    defaultVariants: {
        px: "md",
        pt: "md",
    },
});

interface PageHeaderProps extends VariantProps<typeof pageHeader> {
    title?: string;
    titleProps?: PropsOf<typeof Title>;
    badges?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    pre?: React.ReactNode;
    className?: ClassValue;
    center?: boolean;
}

/**
 * Use this inside a `Page` component to display a header with title, badges and actions.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    titleProps,
    actions,
    badges,
    pre,
    children,
    className,
    center,
    pt,
    px,
    mb,
}) => {
    return (
        <div className={pageHeader({ className, mb, pt, px })}>
            {pre}
            {(badges || actions || title) && (
                <div className={clsx("flex gap-3 py-2", center && "justify-center")}>
                    {title && <Title {...titleProps}>{title}</Title>}
                    {badges && <div className="flex gap-3">{badges}</div>}
                    {actions && (
                        <div className="flex flex-wrap flex-grow items-center justify-end">{actions}</div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};
