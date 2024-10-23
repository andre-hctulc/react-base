import React from "react";
import { withPrefix } from "../../util/system";
import { type ClassValue, tv, type VariantProps } from "tailwind-variants";

const pageContent = tv({
    base: "w-full px-4 md:px-8 py-3.5 md:py-7",
    variants: {},
    defaultVariants: {
        size: "md",
    },
});

interface PageContentProps extends VariantProps<typeof pageContent> {
    children?: React.ReactNode;
    className?: ClassValue;
}

export const PageContent = React.forwardRef<HTMLElement, PageContentProps>(({ children, className }, ref) => {
    return (
        <main className={pageContent({ className })} ref={ref}>
            {children}
        </main>
    );
});

PageContent.displayName = withPrefix("PageContent");
