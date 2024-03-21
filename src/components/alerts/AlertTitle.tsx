import Typography from "../text/Typography";
import { ParentProps, StyleProps } from "../../types";

interface AlertTitleProps extends StyleProps, ParentProps {}

export default function AlertTitle(props: AlertTitleProps) {
    if (typeof props.children === "string")
        return (
            <Typography
                variant="h5"
                className={["!my-0 text-sm font-medium", props.className]}
                style={props.style}
            >
                {props.children}
            </Typography>
        );
    else return <>{props.children}</>;
}
