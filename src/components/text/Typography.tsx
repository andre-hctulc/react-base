import React from "react";
import { collapse, eventProps } from "../../util";
import type { ChildrenProps, EventProps, StyleProps } from "../../types";
import clsx from "clsx";

export type TextLikeTag = string;
export type TextVariant =
    | "body1"
    | "body2"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "caption"
    | "subtitle1"
    | "subtitle2";

interface TypographyProps extends StyleProps, EventProps, ChildrenProps {
    tag?: TextLikeTag;
    draggable?: boolean;
    variant?: TextVariant;
    secondary?: boolean;
    disabled?: boolean;
    truncate?: boolean;
    long?: boolean;
    alignCenter?: boolean;
    textCenter?: boolean;
    textAlign?: "right" | "left" | "center";
    italic?: boolean;
    defaultCursor?: boolean;
    fontWeight?: React.CSSProperties["fontWeight"];
    noMargin?: boolean;
    underline?: boolean;
    // Siehe https://tailwindcss.com/docs/display
    /** @default "block" */
    dispaly?: "inline" | "inline_block" | "block";
    fontSize?: number;
}

const Typography = React.forwardRef<Element, TypographyProps>((props, ref) => {
    const [variantClasses, tag] = collapse(
        props.variant || "body1",
        {
            body2: ["text-sm", "p"],
            body1: ["text-base", "p"],
            h1: [["text-[27px] font-bold", !props.noMargin && "my-3"], "h1"],
            h2: [["text-[25px] font-bold", !props.noMargin && "my-3"], "h2"],
            h3: [["text-[22px] font-bold", !props.noMargin && "my-2"], "h3"],
            h4: [["text-[19px] font-medium", !props.noMargin && "my-2"], "h4"],
            h5: [["text-[16px] font-medium", !props.noMargin && "my-2"], "h5"],
            h6: [["text-[15px] font-medium", !props.noMargin && "my-2"], "h6"],
            caption: ["text-xs", "p", "inline_block"],
            subtitle1: ["text-xl", "h5"],
            subtitle2: ["text-[18.5px]", "h6"],
        },
        ["text-base", "p", "inline_block"]
    );
    const display = collapse(props.dispaly || "block", {
        inline: "inline",
        inline_block: "inline-block",
        block: "block",
    });
    const Comp: any = props.tag || tag;

    return (
        <Comp
            ref={ref}
            draggable={props.draggable}
            {...eventProps(props)}
            style={{ fontWeight: props.fontWeight, fontSize: props.fontSize, ...props.style }}
            className={clsx(
                "flex-shrink-0",
                display,
                variantClasses,
                props.underline && "underline",
                props.secondary && "text-text-secondary",
                props.disabled && "text-text-disabled",
                props.truncate && "truncate overflow-hidden",
                props.alignCenter && "flex items-center",
                props.textCenter && "text-center",
                props.textAlign === "right"
                    ? "text-right"
                    : props.textAlign === "left"
                    ? "text-left"
                    : props.textAlign === "center" && "text-center",
                props.italic && "italic",
                props.defaultCursor && "cursor-default",
                props.long && "break-words overflow-auto scrollbar-hidden whitespace-normal max-w-full",
                props.className
            )}
        >
            {props.children}
        </Comp>
    );
});

Typography.displayName = "Typography";

export default Typography;
