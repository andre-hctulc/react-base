import type { PropsOf } from "../../types/index.js";
import { Toolbar } from "../containers/toolbar.js";
import { Button } from "../input/button.js";

interface CancelConfirmProps {
    className?: string;
    gap?: PropsOf<typeof Toolbar>["gap"];
    padding?: PropsOf<typeof Toolbar>["padding"];
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    buttonProps?: PropsOf<typeof Button>;
    form?: string;
    confirmButtonProps?: PropsOf<typeof ConfirmButton>;
    cancelButtonProps?: PropsOf<typeof CancelButton>;
    loading?: boolean;
    danger?: boolean;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    /**
     * @default true
     */
    showCancel?: boolean;
    children?: React.ReactNode;
}

/**
 * Cancel and confirm button for a dialog footer. Use  {@link DialogFooter} `variant="actions"` for the footer to align the buttons correctly.
 *
 * ### Props
 * - `form` - The form associated with the confirm button
 */
export const CancelConfirm: React.FC<CancelConfirmProps> = ({
    onCancel,
    onConfirm,
    confirmText,
    cancelText,
    buttonProps,
    form,
    loading,
    danger,
    size,
    showCancel,
    confirmButtonProps,
    cancelButtonProps,
    disabled,
    className,
    gap,
    padding,
}) => {
    return (
        <Toolbar className={className} gap={gap} padding={padding}>
            {showCancel !== false && (
                <CancelButton
                    size={size}
                    disabled={loading}
                    {...buttonProps}
                    {...cancelButtonProps}
                    onClick={(e) => {
                        onCancel?.();
                        buttonProps?.onClick?.(e);
                        cancelButtonProps?.onClick?.(e);
                    }}
                >
                    {cancelText}
                </CancelButton>
            )}
            <ConfirmButton
                size={size}
                loading={loading}
                disabled={disabled}
                danger={danger}
                form={form}
                type={form ? "submit" : "button"}
                {...buttonProps}
                {...confirmButtonProps}
                onClick={(e) => {
                    onConfirm?.();
                    buttonProps?.onClick?.(e);
                    confirmButtonProps?.onClick?.(e);
                }}
            >
                {confirmText || "Confirm"}
            </ConfirmButton>
        </Toolbar>
    );
};

interface CancelButtonProps extends PropsOf<typeof Button> {}

/**
 * A cancel button for dialogs.
 */
export const CancelButton: React.FC<CancelButtonProps> = (props) => {
    return (
        <Button variant="text" color="neutral" {...props}>
            {props.children || "Cancel"}
        </Button>
    );
};

interface ConfirmButtonProps extends PropsOf<typeof Button> {
    danger?: boolean;
}

/**
 * A confirm button for dialogs.
 */
export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ danger, ...props }) => {
    return (
        <Button color={danger ? "error" : "primary"} {...props}>
            {props.children || "Confirm"}
        </Button>
    );
};
