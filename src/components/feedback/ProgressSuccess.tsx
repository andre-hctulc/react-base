import Typography from "../text/Typography";
import { StyleProps } from "../../types";

interface ProgressSuccessProps extends StyleProps {
    children?: string;
}

export default function ProgressSuccess(props: ProgressSuccessProps) {
    return (
        <Typography className={["text-success", props.className]} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}
