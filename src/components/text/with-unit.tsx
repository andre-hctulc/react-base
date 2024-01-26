// * SSR

import React from "react";
import Typography from "./typography";
import clsx from "clsx";
import { PropsOf } from "@react-client/types";
import Skeleton from "@react-client/components/data-display/loading/skeleton";
import Unit from "./unit";

interface WithUnitProps {
    className?: string;
    style?: React.CSSProperties;
    children: string | number | null | undefined;
    unit: string;
    variant?: PropsOf<typeof Typography>["variant"];
}

export default function WithUnit(props: WithUnitProps) {
    const classes = clsx("flex items-end", props.className);

    return (
        <Typography className={classes} style={props.style} tag="span" variant={props.variant}>
            {props.children === undefined ? <Skeleton>Wert</Skeleton> : props.children || ""}
            <Unit className="ml-1">{props.unit}</Unit>
        </Typography>
    );
}
