import CopyIconButton from "@react-client/components/input/buttons/common-buttons/copy-icon-button";
import Divider from "@react-client/components/layout/divider";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import ShortText from "./short-text";
import Copy from "@react-client/components/input/copy";

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
                <CopyIconButton successMessage={copySuccessMessage} iconSize={16} size="small" text={props.url} />
            </div>
        </span>
    );
}
