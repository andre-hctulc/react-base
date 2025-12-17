"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { withLineClamp, type BaseTheme, type TProps, type WithLineClamp } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        textBlock: TextBlockTheme;
    }

    interface FlowbiteProps {
        textBlock: Partial<WithoutThemingProps<TextBlockProps>>;
    }
}

export interface TextBlockTheme extends BaseTheme, WithLineClamp {
    whiteSpace: Record<"normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "break-spaces", string>;
    wordBreak: Record<"normal" | "break-all" | "keep-all", string>;
    overflow: Record<"truncate" | "clip" | "ellipsis", string>;
    wrap: Record<"wrap" | "nowrap" | "balance" | "pretty", string>;
    indent: Record<"1" | "2" | "3" | "4" | "8" | "12" | "16" | "20", string>;
}

const textBlock = createTheme<TextBlockTheme>({
    base: "",
    whiteSpace: {
        normal: "whitespace-normal",
        nowrap: "whitespace-nowrap",
        pre: "whitespace-pre",
        "pre-line": "whitespace-pre-line",
        "pre-wrap": "whitespace-pre-wrap",
        "break-spaces": "whitespace-break-spaces",
    },
    wordBreak: {
        normal: "break-normal",
        "break-all": "break-all",
        "keep-all": "break-keep",
    },
    overflow: {
        truncate: "truncate",
        clip: "text-clip",
        ellipsis: "text-ellipsis",
    },
    wrap: {
        wrap: "text-wrap",
        nowrap: "text-nowrap",
        balance: "text-balance",
        pretty: "text-pretty",
    },
    indent: {
        "1": "indent-1",
        "2": "indent-2",
        "3": "indent-3",
        "4": "indent-4",
        "8": "indent-8",
        "12": "indent-12",
        "16": "indent-16",
        "20": "indent-20",
    },
    defaultVariants: {
        overflow: "ellipsis",
        wrap: "pretty",
    },
    ...withLineClamp,
});

interface TextBlockProps extends PropsOf<"p">, TProps<TextBlockTheme> {}

/**
 * ### Props
 *
 * - `maxLines` - Limit text to specific number of lines
 * - `indent` - Text indentation
 * - `wordBreak` - Word breaking behavior
 * - `whiteSpace` - Whitespace handling
 * - `wrap` - Text wrapping behavior
 * - `overflow` - Overflow handling (truncate, clip, ellipsis)
 *
 */
export const TextBlock: FC<TextBlockProps> = (props) => {
    const { className, children, restProps } = useResolveT("textBlock", textBlock, props);

    return (
        <p className={className} {...restProps}>
            {children}
        </p>
    );
};
