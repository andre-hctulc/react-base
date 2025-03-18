import clsx from "clsx";
import type React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { Title } from "../text/title.js";
import type { PropsOf } from "../../types/index.js";
import type { Page } from "./page.js";

const pageHeader = tv({
    base: "w-full",
    variants: {
        padding: {
            none: "",
            sm: "p-2 md:p-4 pb-0 md:pb-0",
            md: "p-3.5 md:p-7 pb-0 md:pb-0",
            lg: "p-5 md:p-9 pb-0 md:pb-0",
        },
        mb: {
            none: "",
            xs: "mb-4",
            sm: "mb-8",
            md: "mb-12",
            lg: "mb-16",
            xl: "mb-20",
        },
        mt: {
            none: "",
            xs: "mt-4",
            sm: "mt-8",
            md: "mt-12",
            lg: "mt-16",
            xl: "mt-20",
        },
    },
    defaultVariants: {
        padding: "md",
    },
});

interface PageHeaderProps extends VariantProps<typeof pageHeader> {
    title?: React.ReactNode;
    titleProps?: PropsOf<typeof Title>;
    badges?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    pre?: React.ReactNode;
    className?: ClassValue;
    center?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Use this inside a {@link Page} component to display a header with title, badges and actions.
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
    mb,
    padding,
}) => {
    return (
        <div className={pageHeader({ className, mb, padding })}>
            {pre}
            {(badges || actions || title) && (
                <div className={clsx("flex gap-3 py-2", center && "justify-center")}>
                    {title && <Title {...titleProps}>{title}</Title>}
                    {badges && <div className="flex gap-3">{badges}</div>}
                    {actions && <div className="flex flex-wrap grow items-center justify-end">{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
