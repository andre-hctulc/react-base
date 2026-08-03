import { type ComponentProps, type FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.js";

const textBlockVariants = cva("", {
    variants: {
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
        lines: {
            "1": "line-clamp-1",
            "2": "line-clamp-2",
            "3": "line-clamp-3",
            "4": "line-clamp-4",
            "5": "line-clamp-5",
            "6": "line-clamp-6",
        },
    },
    defaultVariants: { overflow: "ellipsis", wrap: "pretty" },
});

export interface TextBlockProps extends ComponentProps<"p">, VariantProps<typeof textBlockVariants> {}

export const TextBlock: FC<TextBlockProps> = ({
    whiteSpace,
    wordBreak,
    overflow = "ellipsis",
    wrap = "pretty",
    indent,
    lines,
    className,
    children,
    ...restProps
}) => (
    <p
        className={cn(textBlockVariants({ whiteSpace, wordBreak, overflow, wrap, indent, lines }), className)}
        {...restProps}
    >
        {children}
    </p>
);
