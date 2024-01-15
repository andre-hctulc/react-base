"use client";

import { rgbStrToHex } from "@react-client/util";
import clsx from "clsx";
import React from "react";

interface ColorSelectProps {
    tooltip: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    onChange?: (e: React.ChangeEvent, newColor: string) => void;
    disabled?: boolean;
}

export default function ColorSelect(props: ColorSelectProps) {
    const classes = clsx("flex-shrink-0 p-0 w-6 h-6", props.className);
    const value = React.useMemo(() => {
        if (props.value === undefined) return undefined;
        return rgbStrToHex(props.value);
    }, [props.value]);

    return <input className={classes} type="color" value={value} onChange={e => props.onChange?.(e, e.target.value)} disabled={props.disabled} style={props.style} />;
}
