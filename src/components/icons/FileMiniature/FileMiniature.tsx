// * SSR

import Stack from "@react-client/components/layout/containers/Stack/Stack";
import ShortText from "@react-client/components/text/ShortText/ShortText";
import clsx from "clsx";
import React from "react";
import FileEmblem from "../FileEmblem/FileEmblem";
import { setRef } from "@react-client/util";
import Styled from "@react-client/components/others/Styled";
import { PropsOf } from "@react-client/types";

interface FileMiniatureProps {
    icon?: React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onTextClick?: React.MouseEventHandler<HTMLSpanElement>;
    children?: React.ReactNode;
    /** Wird verwendet, um dsa File Icon zu bestimmen und als `text` */
    fileName: string;
    /** defaults to `fileName` */
    text?: React.ReactNode;
    hoverEffect?: boolean;
    slotProps?: { text?: PropsOf<typeof ShortText> };
}

const size = 80;
const textSize = 20;
const iconSize = 50;

function isLongName(text: React.ReactNode) {
    const long = 9;
    let arr: any[];
    let sum = 0;

    if (React.isValidElement(text) && text.type === React.Fragment) arr = React.Children.toArray(text.props.children);
    else arr = React.Children.toArray(text);

    arr.forEach(item => {
        if (typeof item === "string") sum += item.length;
        // Falls kein string, asl 1 Zeichen zählen
        else sum += 1;
    });

    return sum > long;
}

const FileMiniature = React.forwardRef<HTMLDivElement, FileMiniatureProps>((props, ref) => {
    const longName = isLongName(props.text);
    const anchor = React.useRef<HTMLDivElement>(null);

    return (
        <Stack
            onClick={props.onClick}
            ref={r => {
                setRef(anchor, r);
                setRef<any>(ref, r);
            }}
            className={clsx("rounded flex-shrink-0", props.hoverEffect && "hover:bg-action-hover", props.onClick && "cursor-pointer")}
            style={{ ...props.style, width: size, height: size, maxHeight: size, maxWidth: size }}
        >
            <Stack align="center" justify="center" grow className="overflow-hidden py-auto">
                <Styled size={iconSize}>{props.icon || <FileEmblem fileName={props.fileName} />}</Styled>
            </Stack>
            <Stack minW0 minH0 direction="row" align="center" justify="center" style={{ height: textSize, maxHeight: textSize }}>
                <ShortText
                    truncate
                    tag="span"
                    variant="body2"
                    {...props.slotProps?.text}
                    onClick={props.onTextClick}
                    className={clsx("text-sm max-w-full align-middle", longName ? "text-xs" : "text-sm", props.slotProps?.text?.className)}
                >
                    {props.text || props.fileName}
                </ShortText>
            </Stack>
            {props.children}
        </Stack>
    );
});

FileMiniature.displayName = "FileMiniature";

export default FileMiniature;
