import clsx from "clsx";
import type { StyleProps } from "../../types";
import SpinnerIcon from "../icons/collection/Spinner";

interface SpinnerProps extends StyleProps {
    size?: number;
}

export default function Spinner(props: SpinnerProps) {
    return (
        <SpinnerIcon
            size={props.size || 30}
            style={props.style}
            className={clsx("Spinner inline-block", props.className)}
        />
    );
}
