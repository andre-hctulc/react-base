import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface DialogHeaderProps extends StyleProps {
    children?: React.ReactNode;
    /** @default "row" */
    direction?: "row" | "col";
}

export default function DialogHeader(props: DialogHeaderProps) {
    return (
        <header
            {...styleProps(
                { className: ["flex p-3", props.direction === "col" ? "flex-col" : "flex-row items-center"] },
                props
            )}
        >
            {props.children}
        </header>
    );
}
