import clsx from "clsx";
import React from "react";
import { collapse } from "../../util";

export type TextLikeTag = string;
export type TextVariant = "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "subtitle1" | "subtitle2";

interface TypographyProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    tag?: TextLikeTag;
    variant?: TextVariant;
    className?: string;
    secondary?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<Element>;
    truncate?: boolean;
    long?: boolean;
    alignCenter?: boolean;
    center?: boolean;
    italic?: boolean;
    defaultCursor?: boolean;
    fontWeight?: React.CSSProperties["fontWeight"];
    noMargin?: boolean;
    underline?: boolean;
}

const Typography = React.forwardRef<Element, TypographyProps>((props, ref) => {
    const [variantClasses, tag] = collapse(props.variant || "body1", {
        body2: ["text-sm", "p"],
        body1: ["text-base", "p"],
        h1: [["text-[27px] font-bold", !props.noMargin && "my-3"], "h1"],
        h2: [["text-[25px] font-bold", !props.noMargin && "my-3"], "h2"],
        h3: [["text-[22px] font-bold", !props.noMargin && "my-2"], "h3"],
        h4: [["text-[19px] font-medium", !props.noMargin && "my-2"], "h4"],
        h5: [["text-[16px] font-medium", !props.noMargin && "my-2"], "h5"],
        h6: [["text-[15px] font-medium", !props.noMargin && "my-2"], "h6"],
        caption: ["text-xs", "p"],
        subtitle1: ["text-xl", "h5"],
        subtitle2: ["text-[18.5px]", "h6"],
    });
    const Comp: any = props.tag || tag;

    return (
        <Comp
            ref={ref}
            onClick={props.onClick}
            className={clsx(
                "flex-shrink-0",
                variantClasses,
                props.underline && "underline",
                props.secondary && "text-text-secondary",
                props.disabled && "text-text-disabled",
                props.truncate && "truncate overflow-hidden",
                props.alignCenter && "flex items-center",
                props.center && "text-center",
                props.italic && "italic",
                props.defaultCursor && "cursor-default",
                props.long && "break-words overflow-auto scrollbar-hidden whitespace-normal max-w-full",
                props.className
            )}
            style={{ fontWeight: props.fontWeight, ...props.style }}
        >
            {props.children}
        </Comp>
    );
});

Typography.displayName = "Typography";

export default Typography;
