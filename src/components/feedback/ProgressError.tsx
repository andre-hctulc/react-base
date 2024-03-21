import Typography from "../text/Typography";
import { StyleProps } from "../../types";

interface ProgressErrorProps extends StyleProps {
    children?: string;
}

export default function ProgressError(props: ProgressErrorProps) {
    return (
        <Typography className={[props.className, "text-error"]} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}
