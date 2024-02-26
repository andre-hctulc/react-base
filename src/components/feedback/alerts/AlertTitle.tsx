import clsx from "clsx";
import Typography from "../../text/Typography";

export default function AlertTitle(props: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    if (typeof props.children === "string")
        return (
            <Typography variant="h5" className={clsx("!my-0 text-sm font-medium", props.className)}>
                {props.children}
            </Typography>
        );
    else return <>{props.children}</>;
}
