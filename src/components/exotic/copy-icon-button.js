"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useNotifications } from "../notifications";
import { IconButton } from "../input";
import { CopyIcon } from "../icons/copy";
export const CopyIconButton = ({ textToCopy, onClick, successText, children, ...props }) => {
    const { notify } = useNotifications();
    return (_jsx(IconButton, { onClick: (e) => {
            onClick?.(e);
            if (textToCopy !== null) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    notify({ severity: "info", message: successText ?? "Copied" });
                });
            }
        }, ...props, children: children ?? _jsx(CopyIcon, {}) }));
};
