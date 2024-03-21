import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface DialogContentProps extends StyleProps {
    children?: React.ReactNode;
}

export default function DialogContent(props: DialogContentProps) {
    return (
        <section {...styleProps({ className: "flex flex-col px-3 pb-2 pt-1" }, props)}>
            {props.children}
        </section>
    );
}
