import Typography from "@react-client/components/text/typography";
import { joinPaths } from "@client-util/web-fs";
import clsx from "clsx";
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";

const comps: (data: { imagesBaseDir: string }) => Components = data => ({
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
    img: props => {
        const src = joinPaths(data.imagesBaseDir, props.src);
        return <Image width={500} height={500} src={src} alt={props.alt || ""} />;
    },
});

interface MarkdownProps {
    children: string;
    className?: string;
    style?: React.CSSProperties;
    /** @default "/" */
    imagesBaseDir?: string;
}

export default function Markdown(props: MarkdownProps) {
    const classes = clsx("Markdown", props.className);

    return (
        <div className={classes} style={props.style}>
            <ReactMarkdown components={comps({ imagesBaseDir: props.imagesBaseDir || "/" })}>{props.children}</ReactMarkdown>
        </div>
    );
}
