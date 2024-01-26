import Styled from "@react-client/components/others/Styled";
import { PropsOf } from "@react-client/types";
import clsx from "clsx";

/**
 * Kann entweder in `DialogHeader` oder direkt in `DialogTitle` verwendet werden.
 */
export default function DialogTitleIcon(props: PropsOf<typeof Styled>) {
    const classes = clsx("mr-3", props.className);

    return (
        <Styled size={20} {...props} className={classes}>
            {props.children}
        </Styled>
    );
}
