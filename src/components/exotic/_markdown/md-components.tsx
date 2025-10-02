import { Title } from "@dre44/react-base";
import { Components } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MDComponents: Components = {
    code({ node, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
            <SyntaxHighlighter customStyle={{ background: "none" }} style={oneLight} language={match[1]}>
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    h1({ children, ...props }) {
        return (
            <Title variant="h1" {...props}>
                {children}
            </Title>
        );
    },
    h2({ children, ...props }) {
        return (
            <Title variant="h2" {...props}>
                {children}
            </Title>
        );
    },
    h3({ children, ...props }) {
        return (
            <Title variant="h3" {...props}>
                {children}
            </Title>
        );
    },
};
