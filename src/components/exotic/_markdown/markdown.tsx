import { CSSProperties, FC } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import { MDComponents } from "./md-components.js";
import clsx from "clsx";
import "./markdown.module.css";

interface MarkdownRendererProps extends Options {
    children: string;
    className?: string;
    style?: CSSProperties;
}

export const Markdown: FC<MarkdownRendererProps> = ({ children, components, className, style, ...props }) => {
    return (
        <div className={clsx("RB_Markdown", className)} style={style}>
            <ReactMarkdown components={{ ...MDComponents, ...components }} {...props}>
                {children}
            </ReactMarkdown>
        </div>
    );
};
