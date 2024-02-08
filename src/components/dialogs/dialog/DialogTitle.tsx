import Typography from "../../text/Typography";

interface DialogTitleProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function DialogTitle(props: DialogTitleProps) {
    return (
        <Typography truncate tag={typeof props.children === "string" ? "h4" : "div"} className={props.className} alignCenter fontWeight="medium" style={props.style}>
            {props.children}
        </Typography>
    );
}
