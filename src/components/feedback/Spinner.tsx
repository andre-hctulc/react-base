import clsx from "clsx";
import type { ThemeColor, DynamicSize } from "../../types";
import SpinnerIcon from "../icons/collection/Spinner";

interface SpinnerProps {
    className?: string;
    style?: React.CSSProperties;
    color?: ThemeColor;
    size?: DynamicSize;
}

export default function Spinner(props: SpinnerProps) {
    return <SpinnerIcon color={props.color || "primary"} className={clsx("Spinner inline-block", props.className)} size={props.size || 30} />;
}
