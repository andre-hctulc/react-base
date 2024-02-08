

import { collapse, collapseOrVanish } from "u/src/helpers";
import clsx from "clsx";
import React from "react";

interface ToolbarProps {
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    children?: React.ReactNode;
    tag?: string;
    /** @default "medium" */
    spacing?: "small" | "medium" | "large" | "none";
    justify?: "start" | "end" | "center";
    grow?: boolean;
    /** @default "small" */
    padding?: "none" | "small" | "large";
    borderTop?: boolean;
    borderBottom?: boolean;
    /** @default "horizontal"  */
    variant?: "flow" | "horizontal" | "vertical";
}

const Toolbar = React.forwardRef<HTMLElement, ToolbarProps>((props, ref) => {
    const paddingClasses = collapse(props.padding || "small", { none: "", small: "p-1", large: "px-3 py-2" });
    const variant = props.variant || "horizontal";
    const variantClasses = collapse(variant, {
        horizontal: "items-center flex flex-row overflow-x-auto",
        vertical: "items-center flex flex-col overflow-y-auto",
        flow: "flex flex-wrap",
    });
    const spacing = props.spacing || "medium";
    const spacingClass =
        spacing === "none"
            ? null
            : variant === "flow"
            ? collapseOrVanish(spacing, { medium: "gap-2", small: "gap-[4px]", large: "gap-3.5" })
            : variant === "horizontal"
            ? collapseOrVanish(spacing, { medium: "space-x-2", small: "space-x-[4px]", large: "space-x-3.5" })
            : collapseOrVanish(spacing, { medium: "space-y-2", small: "space-y-[4px]", large: "space-y-3.5" });
    const justifyClass = collapseOrVanish(props.justify, { start: "justify-start", end: "justify-end", center: "justify-center" });
    const Comp: any = props.tag || "div";

    return (
        <Comp
            id={props.id}
            ref={ref}
            className={clsx(
                "pointer-events-auto flex-shrink-0",
                variantClasses,
                spacingClass,
                paddingClasses,
                justifyClass,
                props.borderTop && "border-t",
                props.borderBottom && "border-b",
                props.grow && "flex-grow",
                props.className
            )}
            style={props.style}
        >
            {props.children}
        </Comp>
    );
});

Toolbar.displayName = "Toolbar";

export default Toolbar;
