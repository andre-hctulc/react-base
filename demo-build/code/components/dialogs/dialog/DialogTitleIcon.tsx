import clsx from "clsx";
import { PropsOf } from "../../../types";
import Styled from "../../others/Styled";

/**
 * Kann entweder in `DialogHeader` oder direkt in `DialogTitle` verwendet werden.
 */
export default function DialogTitleIcon(props: PropsOf<typeof Styled>) {
    return (
        <Styled size={20} {...props} className={clsx("mr-3", props.className)}>
            {props.children}
        </Styled>
    );
}
