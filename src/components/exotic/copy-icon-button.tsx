"use client";

import type { PropsOf } from "../../types/index.js";
import { CopyIcon } from "../icons/phosphor/copy.js";
import { IconButton } from "../input/icon-button.js";
import { useNotifications } from "../dialog/notifications.js";

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
