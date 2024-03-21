import React from "react";
import { alignClass, collapse, collapseWeak, styleProps } from "../../util";
import type { ParentProps, Size, StyleProps } from "../../types";

interface ToolbarProps extends StyleProps, ParentProps {
    id?: string;
    tag?: string;
    /** @default "medium" */
    spacing?: "small" | "medium" | "large" | "none";
    justify?: "start" | "end" | "center";
    grow?: boolean;
    /** @default "small" */
    padding?: "none" | Size;
    borderTop?: boolean;
    borderBottom?: boolean;
    /** @default "horizontal"  */
    variant?: "flow" | "horizontal" | "vertical";
    /** @default "none" for variant flow, "center" otherwise */
    align?: "start" | "end" | "center" | "none";
}

const Toolbar = React.forwardRef<HTMLElement, ToolbarProps>((props, ref) => {
    const paddingClasses = collapse(props.padding || "small", {
        none: "",
        small: "p-1",
        medium: "p-2",
        large: "p-3",
    });
    const variant = props.variant || "horizontal";
    const variantClasses = collapse(variant, {
        horizontal: "flex flex-row overflow-x-auto",
        vertical: "flex flex-col overflow-y-auto",
        flow: "flex flex-wrap",
    });
    const align = alignClass(props.align || (props.variant === "flow" ? "none" : "center"));
    const spacing = props.spacing || "medium";
    const spacingClass = collapseWeak(spacing, { small: "gap-1", medium: "gap-2", large: "gap-3" });
    const justifyClass = collapseWeak(props.justify, {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
    });
    const Comp: any = props.tag || "div";

    return (
        <Comp
            id={props.id}
            ref={ref}
            {...styleProps(
                {
                    className: [
                        "scrollbar-hidden pointer-events-auto flex-shrink-0",
                        align,
                        variantClasses,
                        spacingClass,
                        paddingClasses,
                        justifyClass,
                        props.borderTop && "border-t",
                        props.borderBottom && "border-b",
                        props.grow && "flex-grow",
                    ],
                },
                props
            )}
        >
            {props.children}
        </Comp>
    );
});

Toolbar.displayName = "Toolbar";

export default Toolbar;
