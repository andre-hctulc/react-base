<<<<<<< HEAD
import CopyIconButton from "@components/common-buttons/copy-icon-button";
import Divider from "@react-client/components/layout/divider";
=======
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c
import clsx from "clsx";
import React from "react";
import ShortText from "./short-text";

interface URLCopy {
    className?: string;
    style?: React.CSSProperties;
    url: string;
}

const copySuccessMessage = "Link kopiert";

export default function URLCopy(props: URLCopy) {
    const classes = clsx("flex flex-row  items-center rounded border overflow-hidden bg-bg h-8 max-h-8", props.className);

    return (
        <span className={classes} style={{ letterSpacing: 0.5, ...props.style }}>
            <ShortText tag="span" alignCenter className="bg-bg-paper/40 flex-grow !text-[14px] h-full px-2">
                {props.url}
            </ShortText>
            <div className="border-l p-0.5 bg-bg-dark/40">
                {/* TODO <IconButton successMessage={copySuccessMessage} iconSize={16} size="small" text={props.url} /> */}
            </div>
        </span>
    );
}