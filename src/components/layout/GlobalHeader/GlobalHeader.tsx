import clsx from "clsx";
import Stack from "../containers/Stack/Stack";

const globalHeaderHeight = 60;

interface GlobalHeaderProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function GlobalHeader(props: GlobalHeaderProps) {
    const classes = clsx("flex pr-3 flex-row bg-bg flex-shrink-0 top-0 sticky z-20", props.className);

    return (
        <Stack
            direction="row"
            align="center"
            tag="header"
            className={classes}
            style={{ ...props.style, height: globalHeaderHeight, maxHeight: globalHeaderHeight, minHeight: globalHeaderHeight }}
        >
            {props.children}
        </Stack>
    );
}

GlobalHeader.height = globalHeaderHeight;
