import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { Subtitle } from "../text/subtitle.js";
import { Icon } from "../icons/icon.js";
import { Button } from "../input/button.js";
import { PencilIcon } from "../icons/pencil.js";
import clsx from "clsx";
import { Placeholder } from "../data-display/placeholder.js";
import { Spinner } from "../data-display/spinner.js";
import React from "react";
import { withPrefix } from "../../util/system.js";
import { IconButton } from "../input/icon-button.js";

const section = tv({
    base: "py-4 box-border",
    variants: {
        padding: {
            none: "",
            sm: "px-3 py-2.5",
            md: "py-5 px-6",
            lg: "py-8 px-8",
        },
        margin: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
        },
        variant: {
            plain: "",
            outlined: "border rounded-md",
            danger: "border-[0.5px] border-error rounded-md bg-error/5",
            elevated: "bg-paper2 rounded-md",
        },
        first: {
            true: "mt-0!",
        },
        bg: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
    },
    defaultVariants: {
        variant: "outlined",
        margin: "md",
        padding: "md",
    },
});

interface SectionProps extends TVCProps<typeof section, "section"> {
    title?: string;
    titleProps?: PropsOf<typeof Subtitle>;
    icon?: React.ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    loading?: boolean;
}

/**
 * ### Props
 * - `title` - The title of the section
 * - `icon` - The icon to display next to the title
 * - `loading` - Show a loading spinner
 * - `first` - Remove top margin
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
    (
        {
            children,
            className,
            margin,
            variant,
            padding,
            title,
            titleProps,
            icon,
            iconProps,
            loading,
            first,
            bg,
            flex,
            ...props
        },
        ref
    ) => {
        const isDanger = variant === "danger";

        return (
            <section
                ref={ref}
                className={section({ className, margin, variant, padding, first, bg, flex })}
                {...props}
            >
                {loading && (
                    <Placeholder my="md">
                        <Spinner size="2xl" />
                    </Placeholder>
                )}
                {(title || icon) && !loading && (
                    <div className="flex gap-3 items-center pb-5">
                        {icon && (
                            <Icon color={isDanger ? "error" : "neutral"} {...iconProps}>
                                {icon}
                            </Icon>
                        )}
                        <Subtitle
                            variant="h3"
                            {...titleProps}
                            className={clsx(isDanger && "text-error", titleProps?.className as any)}
                        >
                            {title}
                        </Subtitle>
                    </div>
                )}
                {!loading && children}
            </section>
        );
    }
);

const sectionFooter = tv({
    base: "mt-auto p-2 pt-4",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {},
});

Section.displayName = withPrefix("Section");

interface SectionFooterProps extends TVCProps<typeof sectionFooter, "div"> {
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
}

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
