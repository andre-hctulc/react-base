"use client";

import { tv } from "tailwind-variants";
import { type FC, type ReactNode, useEffect, useState } from "react";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import { SectionStart } from "./section-start.js";
import { Toolbar } from "./toolbar.js";
import { IconButton } from "../input/icon-button.js";
import { Placeholder } from "../data-display/placeholder.js";
import { Spinner } from "../data-display/spinner.js";
import { CollapseVScreen } from "../transitions/collapse.js";
import clsx from "clsx";
import { ChevronRightIcon } from "../icons/chevron-right.js";

const section = tv({
    base: "",
    variants: {
        my: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
        },
        mt: {
            none: "",
            sm: "mt-4",
            md: "mt-8",
            lg: "mt-12",
        },
        mb: {
            none: "",
            sm: "mb-4",
            md: "mb-8",
            lg: "mb-12",
        },
        size: {
            none: "",
            sm: "px-2.5 p-2",
            md: "px-5 p-4",
            lg: "px-7 p-6",
        },
        variant: {
            default: "",
            outlined: "bg-paper border rounded-lg",
            divider: "",
        },
        danger: {
            true: "border-error bg-error/10",
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
        variant: "default",
    },
});

type SectionProps<T extends ELEMENT = "section"> = WithTVProps<
    RichAsProps<T> & {
        title?: string;
        icon?: ReactNode;
        sectionStartProps?: PropsOf<typeof SectionStart>;
        /**
         * Actions are wrapped in a {@link Toolbar}. These are passed to the toolbar.
         */
        toolbarProps?: PropsOf<typeof Toolbar>;
        /**
         * @default true
         */
        openOnStartClick?: boolean;
        open?: boolean;
        /**
         * @default true
         */
        defaultOpen?: boolean;
        onOpenChange?: (open: boolean) => void;
        /**
         * Props of children wrapper
         */
        wrapperProps?: PropsOf<"div">;
        wrapperClassName?: string;
        loading?: ReactNode;
        /**
         * @default true
         */
        closeable?: boolean;
        openButtonProps?: PropsOf<typeof IconButton>;
        noBorder?: boolean;
    },
    typeof section
>;

/**
 * ### Props
 * - `title` - The title of the section
 * - `icon` - The icon to display next to the title
 * - `loading` - Show a loading spinner
 * - `first` - Remove top margin
 * - `openOnStartClick` - If true, clicking the section start will open the section
 * - `open` - Controlled open state
 * - `defaultOpen` - Default open state
 * - `loading`
 * - `closeable`
 */
export const Section: FC<SectionProps> = ({
    children,
    className,
    my,
    mt,
    mb,
    variant,
    loading,
    first,
    bg,
    flex,
    ref,
    sectionStartProps,
    as,
    title,
    toolbarProps,
    icon,
    openOnStartClick,
    defaultOpen,
    open,
    onOpenChange,
    wrapperProps,
    closeable,
    openButtonProps,
    wrapperClassName,
    danger,
    size,
    noBorder,
    ...props
}) => {
    const [isOpen, setOpen] = useState(defaultOpen ?? true);
    const Comp: any = as || "section";
    const _openOnStartClick = openOnStartClick !== false;
    const outlined = variant === "outlined";
    let sectionStartVariant: PropsOf<typeof SectionStart>["variant"];

    if (variant === "divider") {
        sectionStartVariant = noBorder ? "default" : "divider";
    } else {
        sectionStartVariant = closeable ? (noBorder ? "default" : "divider") : "default";
    }

    useEffect(() => {
        if (open !== undefined) {
            setOpen(open);
        }
    }, [open]);

    function handleOpenChange() {
        if (!closeable) {
            return;
        }

        if (open === undefined) {
            setOpen((prev) => !prev);
        }

        onOpenChange?.(!isOpen);
    }

    const titl = title ?? sectionStartProps?.title;
    const ico = icon ?? sectionStartProps?.icon;

    return (
        <Comp
            ref={ref}
            className={section({
                className,
                mt,
                my,
                mb,
                variant,
                first,
                bg,
                flex,
                danger,
                size: size ?? (outlined ? "md" : "none"),
            })}
            {...props}
        >
            {!!(titl || ico || sectionStartProps?.end || closeable) && (
                <SectionStart
                    variant={sectionStartVariant}
                    {...sectionStartProps}
                    onClick={(e) => {
                        // default true
                        if (_openOnStartClick) {
                            handleOpenChange();
                        }
                        sectionStartProps?.onClick?.(e);
                    }}
                    title={titl}
                    icon={ico}
                    className={clsx(
                        sectionStartProps?.className,
                        closeable && _openOnStartClick && "cursor-pointer"
                    )}
                    end={
                        <Toolbar stopEventPropagation {...toolbarProps}>
                            {sectionStartProps?.end}
                            {closeable && (
                                <IconButton
                                    {...openButtonProps}
                                    onClick={(e) => {
                                        handleOpenChange();
                                        openButtonProps?.onClick?.(e);
                                    }}
                                >
                                    <ChevronRightIcon className={clsx("transition", isOpen && "rotate-90")} />
                                </IconButton>
                            )}
                        </Toolbar>
                    }
                    iconProps={{
                        color: danger ? "error" : undefined,
                        ...sectionStartProps?.iconProps,
                    }}
                    subtitleProps={{
                        ...sectionStartProps?.subtitleProps,
                        className: clsx(danger && "!text-error", sectionStartProps?.subtitleProps?.className),
                    }}
                />
            )}
            <CollapseVScreen show={isOpen}>
                <div {...wrapperProps} className={clsx("pt-6", wrapperProps?.className, wrapperClassName)}>
                    {loading === true ? (
                        <Placeholder padding="sm" my="lg">
                            <Spinner size="2xl" />
                        </Placeholder>
                    ) : (
                        loading ?? children
                    )}
                </div>
            </CollapseVScreen>
        </Comp>
    );
};
