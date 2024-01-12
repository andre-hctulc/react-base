"use client";

import useBlobUrl from "@react-client/hooks/others/use-blob-url";
import React from "react";
import LinkContainer from "../../../navigation/link-container";
import DownloadIcon from "@react-client/components/icons/collection/download";
import IconButton from "../icon-button";
import useSvgUrl from "@react-client/hooks/others/use-svg-url";

interface DownloadIconButtonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    outlined?: boolean;
    size?: "small" | "medium" | "large";
    src: string | Blob | SVGElement | null | undefined;
    donwloadName?: string;
    onClick?: React.MouseEventHandler;
    target?: React.HTMLAttributeAnchorTarget;
}

export default function DownloadIconButton(props: DownloadIconButtonProps) {
    const { url: blobUrl } = useBlobUrl(props.src instanceof Blob ? props.src : null);
    const { url: svgUrl } = useSvgUrl(props.src instanceof SVGElement ? props.src : null);
    const url = blobUrl || svgUrl || (typeof props.src === "string" ? props.src : undefined);
    const downloadName = React.useMemo(() => {
        if (props.donwloadName !== undefined) return props.donwloadName;
        else if (props.src instanceof File) return props.src.name;
    }, [props.donwloadName, props.src]);

    return (
        <LinkContainer target={props.target || "_blank"} download={downloadName} href={url}>
            <IconButton onClick={props.onClick} size={props.size} variant="contained" className={props.className} style={props.style}>
                <DownloadIcon />
            </IconButton>
        </LinkContainer>
    );
}
