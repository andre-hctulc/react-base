import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toolbar } from "../containers";
import { Button } from "../input";
/**
 * Cancel and confirm button for a dialog footer. Use  {@link DialogFooter} `variant="actions"` for the footer to align the buttons correctly.
 *
 * ### Props
 * - `form` - The form associated with the confirm button
 */
export const CancelConfirm = ({ onCancel, onConfirm, confirmText, cancelText, buttonProps, form, loading, danger, size, showCancel, confirmButtonProps, cancelButtonProps, disabled, className, gap, padding, }) => {
    return (_jsxs(Toolbar, { className: className, gap: gap, padding: padding, children: [showCancel !== false && (_jsx(CancelButton, { size: size, disabled: loading, ...buttonProps, ...cancelButtonProps, onClick: (e) => {
                    onCancel?.();
                    buttonProps?.onClick?.(e);
                    cancelButtonProps?.onClick?.(e);
                }, children: cancelText })), _jsx(ConfirmButton, { size: size, loading: loading, disabled: disabled, danger: danger, form: form, type: form ? "submit" : "button", ...buttonProps, ...confirmButtonProps, onClick: (e) => {
                    onConfirm?.();
                    buttonProps?.onClick?.(e);
                    confirmButtonProps?.onClick?.(e);
                }, children: confirmText || "Confirm" })] }));
};
/**
 * A cancel button for dialogs.
 */
export const CancelButton = (props) => {
    return (_jsx(Button, { variant: "text", color: "neutral", ...props, children: props.children || "Cancel" }));
};
/**
 * A confirm button for dialogs.
 */
export const ConfirmButton = ({ danger, ...props }) => {
    return (_jsx(Button, { color: danger ? "error" : "primary", ...props, children: props.children || "Confirm" }));
};
