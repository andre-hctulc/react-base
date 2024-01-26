<<<<<<< HEAD:src/components/dialogs/dialog/dialog-title-icon.tsx
import Styled from "@react-client/components/others/styled";
import type { PropsOf } from "@react-client/types";
=======
import Styled from "@react-client/components/others/Styled";
import type { PropsOf } from "@react-client/util";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c:src/components/dialogs/dialog/DialogTitleIcon/DialogTitleIcon.tsx
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
