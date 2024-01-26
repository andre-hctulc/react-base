import React from "react";
import ShortText from "../ShortText/ShortText";

export function bytesToText(bytes: number) {
    const tera = 1_000_000_000_000;
    const giga = 1_000_000_000;
    const mega = 1_000_000;
    const kilo = 1_000;

    let q: number;
    let unit: string;

    if (bytes > tera) {
        unit = "TB";
        q = tera;
    } else if (bytes > giga) {
        unit = "GB";
        q = giga;
    } else if (bytes > mega) {
        unit = "MB";
        q = mega;
    } else if (bytes > kilo) {
        unit = "KB";
        q = kilo;
    } else {
        unit = "Bytes";
        q = 1;
    }

    const rounded = Math.round((bytes / q) * 100) / 100;

    return `${rounded} ${unit}`;
}

/**
 * ### Props
 * - MUI's `Typography` props
 * - bytes
 * - after - Children werden nach dem `bytes` text gerendert, statt davor
 */
export default function BytesText(props: {
    bytes: number | string;
    after?: boolean;
    disabled?: boolean;
    className?: string;
    secondary?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}) {
    const text = React.useMemo(() => {
        if (typeof props.bytes === "string") return props.bytes;
        else return bytesToText(props.bytes);
    }, [props.bytes]);

    return (
        <ShortText disabled={props.disabled} className={props.className} secondary={props.secondary} style={props.style}>
            {!props.after && props.children}
            {text}
            {!!props.after && props.children}
        </ShortText>
    );
}
