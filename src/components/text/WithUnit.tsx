import React from "react";
import Typography from "./Typography";
import clsx from "clsx";
import Unit from "./Unit";
import { PropsOf } from "../../types";
import Skeleton from "../data-display/feedback/Skeleton";

interface WithUnitProps {
    className?: string;
    style?: React.CSSProperties;
    children: string | number | null | undefined;
    unit: string;
    variant?: PropsOf<typeof Typography>["variant"];
}

export default function WithUnit(props: WithUnitProps) {
    return (
        <Typography className={clsx("flex items-end", props.className)} style={props.style} tag="span" variant={props.variant}>
            {props.children === undefined ? <Skeleton>Wert</Skeleton> : props.children || ""}
            <Unit className="ml-1">{props.unit}</Unit>
        </Typography>
    );
}
