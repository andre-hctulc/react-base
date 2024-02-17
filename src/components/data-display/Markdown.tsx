import clsx from "clsx";
import ReactMarkdown, { Components } from "react-markdown";
import Typography from "../text/Typography";
import React from "react";
import { joinPaths } from "../../system";

const comps: (data: { imagesBaseDir: string }, components?: Components) => Components = (data, components) => ({
    h1: props => (
        <Typography variant="h1" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    h2: props => (
        <Typography variant="h2" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    h3: props => (
        <Typography variant="h3" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    h4: props => (
        <Typography variant="h4" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    h5: props => (
        <Typography variant="h5" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    h6: props => (
        <Typography variant="h6" style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    p: props => (
        <Typography style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    span: props => (
        <Typography style={props.style} className={props.className}>
            {props.children}
        </Typography>
    ),
    ...components,
    img: props => {
        const src = joinPaths(data.imagesBaseDir, props.src);
        if (components?.img) {
            if (React.isValidElement(components.img)) return React.cloneElement<any>(components.img, { ...props, src });
            else return components.img as any;
        } else return <img alt="_" {...props} src={src} />;
    },
});

interface MarkdownProps {
    children: string;
    className?: string;
    style?: React.CSSProperties;
    /** @default "/" */
    imagesBaseDir?: string;
    components?: Components;
}

export default function Markdown(props: MarkdownProps) {
    return (
        <div className={clsx("Markdown", props.className)} style={props.style}>
            <ReactMarkdown components={comps({ imagesBaseDir: props.imagesBaseDir || "/" }, props.components)}>{props.children}</ReactMarkdown>
        </div>
    );
}
