import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import type { FC } from "react";

const textBlockProps = tv({
    base: "",
    variants: {
        maxLines: {
            none: "",
            1: "line-clamp-1",
            2: "line-clamp-2",
            3: "line-clamp-3",
            4: "line-clamp-4",
            5: "line-clamp-5",
            6: "line-clamp-6",
            7: "line-clamp-7",
            8: "line-clamp-8",
            9: "line-clamp-9",
            10: "line-clamp-10",
        },
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
    },
    defaultVariants: {
        overflow: "ellipsis",
        wrap: "pretty",
    },
});

export interface TextBlockProps extends TVCProps<typeof textBlockProps, "p"> {}

/**
 * ### Props
 *
 * - `maxLines`
 * - `ellipsis`
 * - `indent`
 * - `wordBreak`
 * - `whiteSpace`
 * - `wrap`
 * - `overflow`
 *
 */
export const TextBlock: FC<TextBlockProps> = ({
    className,
    children,
    wordBreak,
    whiteSpace,
    wrap,
    overflow,
    maxLines,
    indent,
    ...props
}) => {
    return (
        <p
            className={textBlockProps({ className, indent, wordBreak, whiteSpace, wrap, overflow, maxLines })}
            {...props}
        >
            {children}
        </p>
    );
};
