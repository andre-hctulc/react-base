import clsx from "clsx";
import { ThemeColor, DynamicSize } from "../../../types";
import SpinnerIcon from "../../icons/collection/Spinner";

interface SpinnerProps {
    className?: string;
    style?: React.CSSProperties;
    color?: ThemeColor;
    size?: DynamicSize;
}

export default function Spinner(props: SpinnerProps) {
    const classes = clsx("Spinner", props.className);
    return <SpinnerIcon color={props.color || "primary"} className={classes} size={props.size || 30} />;
}
