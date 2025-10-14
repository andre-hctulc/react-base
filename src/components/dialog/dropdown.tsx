"use client";

import {
    cloneElement,
    type FC,
    type ReactElement,
    type ReactNode,
    type Ref,
    useEffect,
    useRef,
    useState,
} from "react";
import type { PartialPropsOf, PropsOf } from "../../types/index.js";
import { Card } from "../containers/card.js";
import { Popover } from "./popover.js";
import { List, type ListItemDef } from "../containers/list.js";
import { collapse } from "@dre44/util/objects";

export interface DropdownAnchorProps {
    disabled?: boolean;
    onClick?: (...args: any[]) => void;
    ref?: Ref<HTMLElement>;
}

interface DropdownProps {
    children: ReactElement<DropdownAnchorProps>;
    disabled?: boolean;
    /**
     * Rendered inside {@link Card}.
     */
    content?: ReactNode;
    /**
     * Rendered after {@link content} and the list ({@link menuItems}) inside {@link Card}.
     */
    endContent?: ReactNode;
    cardProps?: PropsOf<typeof Card>;
    popoverProps?: PartialPropsOf<typeof Popover>;
    /**
     * A list with these items is rendered inside the {@link Card} if this prop is provided.
     */
    menuItems?: ListItemDef[];
    listProps?: PartialPropsOf<typeof List>;
    /**
     * Default open state.
     */
    defaultOpen?: boolean;
    /**
     * Controlled open state.
     */
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    /**
     * Use {@link cardProps}, {@link listProps} and {@link popoverProps} for fine grained control over width.
     */
    width?: "auto" | "xs" | "anchor";
    /**
     * Popover `portal` prop.
     */
    portal?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
    children,
    disabled,
    content,
    cardProps,
    popoverProps,
    menuItems,
    listProps,
    endContent,
    defaultOpen,
    open,
    onClose,
    onOpen,
    width,
    portal,
}) => {
    const controlled = open !== undefined;
    const [isOpen, setOpen] = useState(open ?? defaultOpen ?? false);
    const anchor = useRef<HTMLElement>(null);
    const anchorProps: DropdownAnchorProps = {
        onClick: (...args) => {
            if (!controlled) {
                setOpen(true);
            }
            onOpen?.();
            children.props.onClick?.(...args);
        },
        ref: anchor,
        disabled: disabled || children.props.disabled,
    };
    const [cardWidth, popoverWidth] = collapse(width || "auto", {
        auto: [menuItems && !width ? "xs" : undefined, undefined],
        xs: ["xs", undefined],
        anchor: [undefined, "anchor"],
    } as const);

    useEffect(() => {
        if (open !== undefined) {
            setOpen(open);
        }
    }, [open]);

    // delete disabled from anchorProps if it's false
    // for compatibility with components that don't accept disabled prop
    if (!anchorProps.disabled) {
        delete anchorProps.disabled;
    }

    return (
        <>
            {cloneElement(children, anchorProps)}
            <Popover
                position="bottom-end"
                width={popoverWidth}
                portal={portal}
                {...popoverProps}
                anchor={anchor.current}
                open={isOpen}
                onClose={(e) => {
                    if (!controlled) {
                        setOpen(false);
                    }
                    popoverProps?.onClose?.(e);
                    onClose?.();
                }}
            >
                <Card width={cardWidth} variant="elevated_sm" {...cardProps}>
                    {content}
                    {!!menuItems?.length && <List padding="sm" items={menuItems} {...listProps} />}
                    {endContent}
                </Card>
            </Popover>
        </>
    );
};
