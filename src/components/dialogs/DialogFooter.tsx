import type { Size } from "../../types";
import Flex from "../layout/Flex";

interface DialogFooterProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    spacing?: Size;
    direction?: "row" | "col";
    style?: React.CSSProperties;
}

const tag = "footer";

export default function DialogFooter(props: DialogFooterProps) {
    return (
        <Flex
            id={props.id}
            tag={tag}
            direction={props.direction}
            style={props.style}
            className={["px-3 py-2 pt-2", props.className]}
        >
            {props.children}
        </Flex>
    );
}
