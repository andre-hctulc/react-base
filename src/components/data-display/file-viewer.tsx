import useBlobUrl from "@react-client/hooks/others/useBlobUrl";
import { FileExtension, fileExtension, fileNameMatchesMimeType, imageFileExtensions, jsonFileExtensions } from "@client-util/web-fs";
import clsx from "clsx";
import React from "react";
import Loading from "./loading/loading";
import Placeholder from "@react-client/components/data-display/loading/placeholder";

interface FileViewerProps {
    file: Blob | undefined;
    fileName: string;
    className?: string;
    style?: React.CSSProperties;
    onUnsupported?: () => void;
}

export default function FileViewer(props: FileViewerProps) {
    const fileUrl = useBlobUrl(props.file);
    const mimeType = props.file?.type;
    const { extension, typeMatchesExtension, supported } = React.useMemo(() => {
        const extension = fileExtension(props.fileName);
        const typeMatchesExtension = fileNameMatchesMimeType(props.fileName, props.file?.type || "application/octet-stream");
        const supportedTypes: FileExtension[] = [
            ...imageFileExtensions,
            "pdf",
            "md",
            "code-workspace",
            "json",
            "css",
            "sass",
            "scss",
            "html",
            "js",
            "jsx",
            "txt",
            "ts",
            "tsx",
        ];

        return {
            extension,
            typeMatchesExtension,
            supported: supportedTypes.includes(extension as FileExtension),
        };
    }, [props.fileName, props.file]);
    const classes = clsx(props.className);
    let main: React.ReactNode;

    if (!fileUrl) main = <Loading />;
    else if (!supported) main = <Placeholder>Datei-Typ nicht unterstützt</Placeholder>;
    else {
        main = "// TODO prismjs";
    }
    return (
        <div className={classes} style={props.style}>
            {main}
        </div>
    );
}
