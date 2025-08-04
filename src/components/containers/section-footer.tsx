import { tv } from "tailwind-variants";
import type { PropsOf, WithTVProps } from "../../types/index.js";
import type { Button } from "../input/button.js";
import { IconButton } from "../input/icon-button.js";
import { PencilIcon } from "../icons/pencil.js";
import clsx from "clsx";

const sectionFooter = tv({
    base: "mt-auto pt-5",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {},
});

type SectionFooterProps = WithTVProps<
    PropsOf<"div"> & {
        actions?: React.ReactNode;
        /**
         * use this in combination with `variant: "actions"` to show an edit button
         */
        editable?: boolean;
        editDisabled?: boolean;
        onEditClick?: (e: React.MouseEvent) => void;
        editIcon?: React.ReactNode;
        editButtonProps?: PropsOf<typeof Button>;
        editLoading?: boolean;
    },
    typeof sectionFooter
>;

export const SectionFooter: React.FC<SectionFooterProps> = ({
    children,
    className,
    actions,
    editable,
    editDisabled,
    onEditClick,
    editIcon,
    editLoading,
    editButtonProps,
    variant,
    ...props
}) => {
    return (
        <div className={sectionFooter({ className, variant })} {...props}>
            {children}
            {(actions || editable) && (
                <div className="ml-auto pl-3">
                    {actions}
                    {editable && (
                        <IconButton
                            color="primary"
                            loading={editLoading}
                            disabled={editDisabled}
                            onClick={onEditClick}
                            variant="text"
                            {...editButtonProps}
                            className={clsx("ml-4", editButtonProps?.className as any)}
                        >
                            {editIcon || <PencilIcon />}
                        </IconButton>
                    )}
                </div>
            )}
        </div>
    );
};
