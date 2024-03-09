import clsx from "clsx";
import type { Size } from "../../types";
import Flex from "../layout/Flex";
import Toolbar from "../feedback/Toolbar";

interface DialogFooterProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    justify?: "end" | "start" | "center";
    toolbar?: boolean;
    spacing?: Size;
    direction?: "row" | "col";
    style?: React.CSSProperties;
}

const tag = "footer";

export default function DialogFooter(props: DialogFooterProps) {
    const classes = clsx("px-3 py-2 pt-2", props.className);

    if (props.toolbar)
        return (
            <Toolbar id={props.id} tag={tag} spacing={props.spacing} style={props.style} className={classes} justify={props.justify}>
                {props.children}
            </Toolbar>
        );

    return (
        <Flex id={props.id} tag={tag} justify={props.justify} style={props.style} className={classes} direction={props.direction}>
            {props.children}
        </Flex>
    );
}
