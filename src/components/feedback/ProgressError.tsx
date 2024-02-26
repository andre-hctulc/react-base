import clsx from "clsx";
import Typography from "../text/Typography";

interface ProgressErrorProps {
    children?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ProgressError(props: ProgressErrorProps) {
    return (
        <Typography className={clsx(props.className, "text-error")} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}
