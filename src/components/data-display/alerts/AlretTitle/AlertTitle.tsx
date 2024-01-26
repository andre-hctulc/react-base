import Typography from "@react-client/components/text/Typography/Typography";
import clsx from "clsx";

export default function AlertTitle(props: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const classes = clsx("!my-0 text-sm font-medium", props.className);

    if (typeof props.children === "string")
        return (
            <Typography variant="h5" className={classes}>
                {props.children}
            </Typography>
        );
    else return <>{props.children}</>;
}
