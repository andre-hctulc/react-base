import clsx from "clsx";
import Typography from "../text/Typography";

interface ProgressSuccessProps {
    children?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ProgressSuccess(props: ProgressSuccessProps) {
    return (
        <Typography className={clsx(props.className, "text-success")} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}
