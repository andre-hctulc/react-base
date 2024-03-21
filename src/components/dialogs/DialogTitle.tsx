import { StyleProps } from "../../types";
import { styleProps } from "../../util";
import Typography from "../text/Typography";

interface DialogTitleProps extends StyleProps {
    children?: React.ReactNode;
}

export default function DialogTitle(props: DialogTitleProps) {
    return (
        <Typography
            truncate
            tag={typeof props.children === "string" ? "h4" : "div"}
            alignCenter
            fontWeight="medium"
            {...styleProps(props)}
        >
            {props.children}
        </Typography>
    );
}
