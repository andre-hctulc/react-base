import type { CSSProperties, FC } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import { MDComponents } from "./md-components.js";
import "./markdown.module.css";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

interface MarkdownRendererProps extends Options {
    children: string;
    className?: string;
    style?: CSSProperties;
}

export const Markdown: FC<MarkdownRendererProps> = ({ children, components, className, style, ...props }) => {
    return (
        <div className={twMerge("RB_Markdown", className)} style={style}>
            <ReactMarkdown components={{ ...MDComponents, ...components }} {...props}>
                {children}
            </ReactMarkdown>
        </div>
    );
};
