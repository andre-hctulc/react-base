import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { withPrefix } from "../../util/system";

const pageMenu = tv({
    base: "h-full max-h-full overflow-y-scroll w-full md:w-64",
    variants: {},
});

interface PageMenuProps extends VariantProps<typeof pageMenu> {
    children?: React.ReactNode;
    className?: ClassValue;
    style?: React.CSSProperties;
    hideOnSmallScreen?: boolean;
}

export const PageMenu = React.forwardRef<HTMLDivElement, PageMenuProps>(
    ({ children, className, style, hideOnSmallScreen }, ref) => {
        return (
            <div
                ref={ref}
                className={pageMenu({ className: [className, hideOnSmallScreen && "hidden md:block"] })}
                style={style}
            >
                {children}
            </div>
        );
    }
);

PageMenu.displayName = withPrefix("PageMenu");
