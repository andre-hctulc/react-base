import type { ThemeColor, DynamicSize, StyleProps } from "../../types";
import SpinnerIcon from "../icons/collection/Spinner";
import { styleProps } from "../../util";

interface SpinnerProps extends StyleProps {
    color?: ThemeColor;
    size?: DynamicSize;
}

export default function Spinner(props: SpinnerProps) {
    return (
        <SpinnerIcon
            color={props.color || "primary"}
            size={props.size || 30}
            {...styleProps({ className: "Spinner inline-block" }, props)}
        />
    );
}
