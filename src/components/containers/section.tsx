"use client";

import { tv } from "tailwind-variants";
import { type FC, type ReactNode, useEffect, useState } from "react";
import type { PropsOf, TVCProps } from "../../types/index.js";
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
        margin: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
        },
        variant: {},
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
        margin: "none",
        padding: "md",
    },
});

interface SectionProps extends TVCProps<typeof section, "section"> {
    title?: string;
    icon?: ReactNode;
    sectionStartProps?: PropsOf<typeof SectionStart>;
    as?: any;
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
    canClose?: boolean;
    openButtonProps?: PropsOf<typeof IconButton>;
}

/**
 * ### Props
 * - `title` - The title of the section
 * - `icon` - The icon to display next to the title
 * - `loading` - Show a loading spinner
 * - `first` - Remove top margin
 * - `openOnStartClick` - If true, clicking the section start will open the section
 * - `open` - Controlled open state
 * - `defaultOpen` - Default open state
 * - `loading` - Set to true, to show a loading spinner, or pass a loading component
 */
export const Section: FC<SectionProps> = ({
    children,
    className,
    margin,
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
    canClose,
    openButtonProps,
    wrapperClassName,
    ...props
}) => {
    const [isOpen, setOpen] = useState(defaultOpen ?? true);
    const Comp: any = as || "section";
    const _openOnStartClick = openOnStartClick !== false;
    const _canClose = canClose !== false;

    useEffect(() => {
        if (open !== undefined) {
            setOpen(open);
        }
    }, [open]);

    function handleOpenChange() {
        if (!_canClose) {
            return;
        }

        if (open === undefined) {
            setOpen((prev) => !prev);
        }

        onOpenChange?.(!isOpen);
    }

    return (
        <Comp ref={ref} className={section({ className, margin, variant, first, bg, flex })} {...props}>
            {loading && (
                <Placeholder my="md">
                    <Spinner size="2xl" />
                </Placeholder>
            )}
            <SectionStart
                {...sectionStartProps}
                onClick={(e) => {
                    // default true
                    if (_openOnStartClick) {
                        handleOpenChange();
                    }
                    sectionStartProps?.onClick?.(e);
                }}
                title={title ?? sectionStartProps?.title}
                icon={icon ?? sectionStartProps?.icon}
                className={clsx(sectionStartProps?.className, _openOnStartClick && "cursor-pointer")}
                actions={
                    <Toolbar stopEventPropagation {...toolbarProps}>
                        {sectionStartProps?.actions}
                        <IconButton
                            {...openButtonProps}
                            onClick={(e) => {
                                handleOpenChange();
                                openButtonProps?.onClick?.(e);
                            }}
                        >
                            <ChevronRightIcon className={clsx("transition", isOpen && "rotate-90")} />
                        </IconButton>
                    </Toolbar>
                }
            />
            <CollapseVScreen show={isOpen}>
                <div {...wrapperProps} className={clsx("pt-7", wrapperProps?.className, wrapperClassName)}>
                    {loading === true ? (
                        <Placeholder my="lg">
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
