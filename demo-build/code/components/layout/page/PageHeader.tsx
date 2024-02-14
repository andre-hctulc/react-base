

import clsx from "clsx";
import React from "react";
import type { PropsOf } from "../../../types";
import { collapse } from "../../../util";
import { pageBarHeight } from "./PageBar";

interface PageHeaderProps {
    noPadding?: boolean;
    style?: React.CSSProperties;
    sticky?: boolean;
    children?: React.ReactNode;
    className?: string;
    pageHasBar?: boolean;
    noPointerEvents?: boolean;
    top?: number;
    /** @default "small" */
    width?: "fullWidth" | "fullWidth_large" | "fullWidth_small" | "small";
    slotProps?: { main?: PropsOf<"div"> };
    shadow?: boolean;
    height?: number;
}

function getStickyTop(props: PageHeaderProps): number | undefined {
    if (!props.sticky) return undefined;
    if (props.top) return props.top;
    if (props.pageHasBar) return pageBarHeight;
    else return 0;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>((props, ref) => {
    const top = getStickyTop(props);
    const variantClasses = collapse(props.width || "small", {
        small: "xl:justify-center",
        fullWidth_small: "xl:justify-center",
        fullWidth_large: "xl:justify-center",
        fullWidth: "",
    });
    const mainVariantClasses = collapse(props.width || "small", {
        small: "w-full max-w-[1500px]",
        fullWidth_small: "w-full max-w-[1500px]",
        fullWidth_large: "w-full max-w-[1700px]",
        fullWidth: "w-full",
    });

    return (
        <div
            ref={ref}
            className={clsx(
                "flex w-full",
                variantClasses,
                props.sticky && "sticky z-20",
                props.noPointerEvents && "pointer-events-none",
                !props.noPadding && "px-4 py-7",
                props.className,
                props.shadow && "shadow"
            )}
            style={{ top, height: props.height, maxHeight: props.height, ...props.style }}
        >
            <div {...props.slotProps?.main} className={clsx(mainVariantClasses, props.slotProps?.main?.className)}>
                {props.children}
            </div>
        </div>
    );
});

PageHeader.displayName = "PageHeader";

export default PageHeader;
