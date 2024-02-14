import clsx from "clsx";
import type { ParentProps, StyleProps } from "../../../types";
import Typography from "../../text/Typography";

interface ProgressBarTextProps extends StyleProps, ParentProps<string> {}

export default function ProgressBarText(props: ProgressBarTextProps) {
    return (
        <Typography style={props.style} truncate className={clsx("absolute h-full max-w-full", props.className)} alignCenter tag="span">
            {props.children}
        </Typography>
    );
}
