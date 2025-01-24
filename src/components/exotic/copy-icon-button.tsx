"use client";

import { useNotifications } from "../notifications";
import { IconButton } from "../input";
import type { PropsOf } from "../../types";
import { CopyIcon } from "../icons/copy";

interface CopyIconButtonProps extends PropsOf<typeof IconButton> {
    textToCopy: string | null;
    successText?: string;
}

export const CopyIconButton: React.FC<CopyIconButtonProps> = ({
    textToCopy,
    onClick,
    successText,
    children,
    ...props
}) => {
    const { notify } = useNotifications();

    return (
        <IconButton
            onClick={(e) => {
                onClick?.(e);

                if (textToCopy !== null) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        notify({ severity: "info", message: successText ?? "Copied" });
                    });
                }
            }}
            {...props}
        >
            {children ?? <CopyIcon />}
        </IconButton>
    );
};
