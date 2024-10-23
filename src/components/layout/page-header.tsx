import type React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";

const pageHeader = tv({
    base: "w-full px-4 md:px-8 py-3.5",
    variants: {},
});

interface PageHeaderProps extends VariantProps<typeof pageHeader> {
    title?: string;
    Badges?: React.ReactNode;
    Actions?: React.ReactNode;
    children?: React.ReactNode;
    Pre?: React.ReactNode;
    Post?: React.ReactNode;
    className?: ClassValue;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    Actions: actions,
    Badges: badges,
    Pre,
    Post,
    children,
    className,
}) => {
    return (
        <div className={pageHeader({ className })}>
            {Pre}
            {(badges || actions) && (
                <div className="flex items-center gap-3 py-2">
                    {badges && <div className="flex gap-3">{badges}</div>}
                    {actions && <div className="flex items-center gap-3 ml-auto">{actions}</div>}
                </div>
            )}
            {children}
            {title && <h2 className="text-lg font-medium">{title}</h2>}
            {Post}
        </div>
    );
};
