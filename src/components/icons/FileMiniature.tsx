import clsx from "clsx";
import React from "react";
import type { ImageComponentProps, PropsOf } from "../../types";
import { setRef } from "../../util";
import Typography from "../text/Typography";
import FileEmblem from "./FileEmblem";
import Styled from "../others/Styled";
import Flex from "../layout/Flex";

interface FileMiniatureProps {
    icon?: React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<Element>;
    onTextClick?: React.MouseEventHandler<HTMLSpanElement>;
    children?: React.ReactNode;
    /** Wird verwendet, um dsa File Icon zu bestimmen und als `text` */
    fileName: string;
    /** defaults to `fileName` */
    text?: React.ReactNode;
    hoverEffect?: boolean;
    slotProps?: { text?: PropsOf<typeof Typography> };
    imageComponent?: React.ComponentType<ImageComponentProps>;
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
        <Flex
            onClick={props.onClick}
            ref={r => {
                setRef(anchor, r);
                setRef<any>(ref, r);
            }}
            className={clsx("rounded flex-shrink-0", props.hoverEffect && "hover:bg-action-hover", props.onClick && "cursor-pointer")}
            style={{ ...props.style, width: size, height: size, maxHeight: size, maxWidth: size }}
        >
            <Flex align="center" justify="center" grow className="overflow-hidden py-auto">
                <Styled size={iconSize}>{props.icon || <FileEmblem imageComponent={props.imageComponent} fileName={props.fileName} />}</Styled>
            </Flex>
            <Flex minW0 minH0 direction="row" align="center" justify="center" style={{ height: textSize, maxHeight: textSize }}>
                <Typography
                    truncate
                    tag="span"
                    variant="body2"
                    {...props.slotProps?.text}
                    onClick={props.onTextClick as any}
                    className={clsx("text-sm max-w-full align-middle", longName ? "text-xs" : "text-sm", props.slotProps?.text?.className)}
                >
                    {props.text || props.fileName}
                </Typography>
            </Flex>
            {props.children}
        </Flex>
    );
});

FileMiniature.displayName = "FileMiniature";

export default FileMiniature;
