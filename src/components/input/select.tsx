"use client";

import { useState, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, PartialPropsOf, StyleProps } from "../../types/index.js";
import { ChevronDownIcon } from "../icons/chevron-down.js";
import { Chip } from "../data-display/chip.js";
import { XScroll } from "../shadow/x-scroll.js";
import { Icon } from "../icons/icon.js";
import { Popover } from "../dialog/popover.js";
import { List, type ListItemDef } from "../containers/list.js";
import { HiddenInput } from "./hidden-input.js";
import { Card } from "../containers/card.js";
import { useChoices } from "../../hooks/others/use-choices.js";
import { Placeholder } from "../data-display/placeholder.js";

const select = tv({
    base: [
        "w-full rounded-lg bg-paper3 text-left text-sm cursor-pointer",
        "flex relative",
        "h-full w-full",
        "py-1.5 pr-9 pl-3 gap-3",
        "focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2",
    ],
    variants: {
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11text-base",
        },
        disabled: {
            true: "cursor-not-allowed text-t3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface RenderSelectedParams<V = string, D = any> {
    selected: SelectOption<V, D>[];
}

export interface SelectProps<V = string, D = any>
    extends InputLikeProps<V[], { options: SelectOption<V, D>[] }>,
        VariantProps<typeof select>,
        StyleProps {
    options: SelectOption<V, D>[];
    icon?: React.ReactNode;
    placeholder?: React.ReactNode;
    multiple?: boolean;
    renderSelected?: (params: RenderSelectedParams<V, D>) => React.ReactNode;
    loading?: boolean;
    /**
     * @default "Loading..."
     */
    loadingText?: string;
    emptyText?: string;
    empty?: ReactNode;
    popoverProps?: PartialPropsOf<typeof Popover>;
    placeholderProps?: PartialPropsOf<typeof Placeholder>;
}

export interface SelectOption<V = string, D = any> extends LabeledChoice<V, D> {
    defaultChecked?: boolean;
}

/**
 * ### Props
 * - `options` - The options to display in the dropdown
 * - `values` - The values of the options to be selected (controlled)
 * - `placeholder` - The placeholder to display when no option is selected
 * - `multiple` - Allow multiple options to be selected
 * - `renderSelected` - Custom render function for the selected options
 * - `loading` - Show a loading text
 * - `loadingText` - The text to display when loading
 * - `empty`
 * - `emptyText`
 */
export const Select = <V = string, D = any>({
    options,
    className,
    style,
    disabled,
    readOnly,
    placeholder,
    size,
    multiple,
    required,
    renderSelected,
    loadingText,
    loading,
    value,
    defaultValue,
    onChange,
    icon,
    name,
    id,
    emptyText,
    empty,
    popoverProps,
    placeholderProps,
}: SelectProps<V, D>) => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const { isActiveChoice, toggleChoice, choices, activeChoices, rawValues, activateChoice } = useChoices(
        options,
        {
            multiple,
            onChange: (value, choices) => {
                onChange?.({ value, options: choices });
            },
            value,
            defaultValue,
        }
    );
    const firstSelected: SelectOption<V, D> | undefined = activeChoices[0];
    const selectedEl = renderSelected ? (
        renderSelected({ selected: activeChoices })
    ) : multiple ? (
        <>
            {activeChoices.map((sel) => {
                return (
                    <Chip size="sm" key={String(sel.value)} className="bg-paper2!" icon={sel.icon}>
                        {sel.label}
                    </Chip>
                );
            })}
        </>
    ) : (
        <span className="truncate inline-flex items-center">
            {firstSelected?.icon && (
                <Icon color="neutral" className="mr-2">
                    {firstSelected?.icon}
                </Icon>
            )}
            {firstSelected?.label}
        </span>
    );

    const loadingEl = <span className="text-t3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-t3">{placeholder}</span> : placeholder;
    const _disabled = loading || readOnly || !!disabled;

    const getListItems = (options: SelectOption<V, D>[]) => {
        return choices.map<ListItemDef<SelectOption<V, D>>>((option) => {
            return {
                label: option.label,
                listItemProps: {
                    disabled: option.disabled,
                    icon: option.icon,
                    ...option.listItemProps,
                    // TODO optimize
                    active: multiple && isActiveChoice(option.value),
                },
                key: String(option.value),
                data: option,
            };
        });
    };

    return (
        <div className={className} style={style} ref={setRoot}>
            <HiddenInput id={id} name={name} value={rawValues} required={required} />
            <button
                type="button"
                disabled={_disabled}
                onClick={() => setOpen(true)}
                className={select({ size, disabled: _disabled })}
            >
                <XScroll hideScrollbar>
                    <div className="w-full h-full box-border overflow-x-auto flex items-center gap-1.5">
                        {loading ? loadingEl : activeChoices.length ? selectedEl : placeholderEl}
                    </div>
                </XScroll>
                <span className="absolute translate-y-[-50%] top-[50%] right-3 text-t2 text-base">
                    {icon || <ChevronDownIcon />}
                </span>
            </button>
            <Popover
                width="anchor"
                anchor={root}
                open={open}
                onClose={() => setOpen(false)}
                position="bottom"
                gap={1}
                {...popoverProps}
            >
                <Card variant="custom" bg="1" shadow="sm">
                    {!options.length &&
                        (empty ?? (
                            <Placeholder my="xs" {...placeholderProps}>
                                {emptyText ?? "No options available"}
                            </Placeholder>
                        ))}
                    {!!options.length && (
                        <List
                            padding="sm"
                            items={getListItems(options)}
                            onItemClick={(listItem) => {
                                const option: SelectOption<V, D> = listItem.data;
                                if (!option || option.disabled) return;

                                if (multiple) {
                                    toggleChoice(option.value);
                                } else {
                                    activateChoice(option.value);
                                    setOpen(false);
                                }
                            }}
                        />
                    )}
                </Card>
            </Popover>
        </div>
    );
};
