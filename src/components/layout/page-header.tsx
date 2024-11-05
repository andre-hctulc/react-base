import clsx from "clsx";
import type React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { Title } from "../text/title";

const pageHeader = tv({
    base: "w-full px-4 md:px-8 pt-4 md:pt-7",
    variants: {},
});

interface PageHeaderProps extends VariantProps<typeof pageHeader> {
    title?: string;
    badges?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    pre?: React.ReactNode;
    className?: ClassValue;
    itemsCenter?: boolean;
}

/**
 * Use this inside a `Page` component to display a header with title, badges and actions.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    actions: actions,
    badges: badges,
    pre,
    children,
    className,
    ...props
}) => {
    return (
        <div className={pageHeader({ className })}>
            {pre}
            {(badges || actions || title) && (
                <div className={clsx("flex gap-3 py-2", props.itemsCenter && "items-center")}>
                    {title && <Title>{title}</Title>}
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
