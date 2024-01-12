import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { fileExtension } from "@client-util/web-fs";

interface FileEmblemProps {
    fileName: string;
    src?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
    /** Setzt `style.opacity` auf _0.6_ */
    disabled?: boolean;
}

function getFileSrc(fileName: string) {
    const extension = fileExtension(fileName);
    const baseSrc = "/icons/fs";

    switch (extension) {
        case "js":
        case "css":
        case "xml":
        case "txt":
        case "pdf":
        case "zip":
        case "mp3":
        case "txt":
        case "ts":
        case "json":
        case "jpg":
        case "png":
        case "exe":
        case "mp4":
            return `${baseSrc}/${extension}.png`;
        case "jpeg":
            return `${baseSrc}/jpg.png`;
        default:
            return `${baseSrc}/blank.png`;
    }
}

const defaultSize = 50;

const FileEmblem = React.forwardRef<HTMLImageElement, FileEmblemProps>((props, ref) => {
    const src = props.src || getFileSrc(props.fileName);
    const classes = clsx("flex-shrink-0", props.className);

    return (
        <Image
            ref={ref}
            style={{ opacity: props.disabled ? 0.6 : undefined, ...props.style }}
            className={classes}
            height={props.size || defaultSize}
            width={props.size || defaultSize}
            src={src}
            alt={props.fileName}
        />
    );
});

FileEmblem.displayName = "FileIcon";

export default FileEmblem;
