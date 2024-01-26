// * SSR

import SpinnerIcon from "@react-client/components/icons/collection/spinner";
import { DynamicSize, ThemeColor } from "@react-client/types";
import clsx from "clsx";

interface SpinnerProps {
    className?: string;
    style?: React.CSSProperties;
    color?: ThemeColor
    size?: DynamicSize;
}

export default function Spinner(props: SpinnerProps) {
    const classes = clsx("Spinner", props.className);
    return <SpinnerIcon color={props.color || "primary"} className={classes} size={props.size || 30} />;
}
