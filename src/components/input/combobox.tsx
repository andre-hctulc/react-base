"use client";

import { useEffect, useState, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, PartialPropsOf, StyleProps } from "../../types/index.js";
import { ChevronDownIcon } from "../icons/phosphor/chevron-down.js";
import { Chip } from "../data-display/chip.js";
import { XScroll } from "../shadow/x-scroll.js";
import { Icon } from "../icons/icon.js";
import { Popover } from "../dialog/popover.js";
import { List, type ListItemDef } from "../containers/list.js";
import { HiddenInput } from "./hidden-input.js";
import { Card } from "../containers/card.js";
import { useChoices } from "../../hooks/others/use-choices.js";
import { Placeholder } from "../data-display/placeholder.js";
import { Input } from "./input.js";
import { CardBody } from "../containers/card-body.js";
import { MagnifyingGlassIcon } from "../icons/phosphor/magnifying-glass.js";
import { Center } from "../containers/center.js";
import clsx from "clsx";
import { useRefOf } from "../../hooks/index.js";

const combobox = tv({
    base: [
        "w-full rounded-lg bg-paper2 text-left text-sm cursor-pointer",
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

export interface SelectionParams<D = any> {
    selected: ComboboxOption<D>[];
}

export interface ComboboxProps<D = any>
    extends InputLikeProps<string[], { options: ComboboxOption<D>[]; singleValue: string | undefined }>,
        VariantProps<typeof combobox>,
        StyleProps {
    /**
     * The options to display in the dropdown. Can be an array or a function that returns a options dynamically by a search value.
     */
    options: ComboboxOption<D>[] | ((query: string) => Promise<ComboboxOption<D>[]> | ComboboxOption<D>[]);
    /**
     * All possible options, used for rendering selected values when `options` is a function.
     */
    allOptions?: ComboboxOption<D>[];
    icon?: ReactNode;
    placeholder?: ReactNode;
    multiple?: boolean;
    // We provide this feature to prevent necessity of `options` memoization
    /**
     * Trigger to update options when `options` is a function.
     */
    optionsUpdateTrigger?: any;
    renderSelected?: (params: SelectionParams<D>) => ReactNode;
    loading?: boolean;
    /**
     * @default "Loading..."
     */
    loadingText?: string;
    emptyText?: string;
    empty?: ReactNode;
    popoverProps?: PartialPropsOf<typeof Popover>;
    placeholderProps?: PartialPropsOf<typeof Placeholder>;
    searchInputProps?: PartialPropsOf<typeof Input>;
    cardProps?: PartialPropsOf<typeof Card>;
    /**
     * Use JSON serialization using the {@link HiddenInput}.
     * 
     * By default for each selected option a hidden input is rendered.
     *
     * Enforces array value.
     */
    jsonSerialization?: boolean;
}

export interface ComboboxOption<D = any> extends LabeledChoice<string, D> {
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
export const Combobox = <V = string, D = any>({
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
    searchInputProps,
    cardProps,
    allOptions,
    optionsUpdateTrigger,
    jsonSerialization,
}: ComboboxProps<D>) => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const searchActive = typeof options === "function";
    const [searchValue, setSearchValue] = useState("");
    const [activeOptions, setActiveOptions] = useState<ComboboxOption<D>[]>([]);
    const {
        toggleChoice,
        choices,
        activeValues,
        activeChoices,
        rawValues,
        activateChoice,
        setActiveChoices,
    } = useChoices(allOptions || activeOptions, {
        multiple,
        onChange: (value, choices) => {
            onChange?.({ value, options: choices, singleValue: value[0] });
        },
        value,
        defaultValue,
    });
    const firstSelected: ComboboxOption<D> | undefined = activeChoices[0];
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
    const hasOptions = activeOptions.length > 0;

    const loadingEl = <span className="text-t3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-t3">{placeholder}</span> : placeholder;
    const _disabled = loading || readOnly || !!disabled;

    const getListItems = (options: ComboboxOption<D>[]) => {
        return activeOptions.map<ListItemDef<ComboboxOption<D>>>((option) => {
            return {
                label: option.label,
                listItemProps: {
                    disabled: option.disabled,
                    icon: option.icon,
                    value: option.value,
                    ...option.listItemProps,
                },
                key: String(option.value),
                data: option,
            };
        });
    };

    const optionsRef = useRefOf(options);

    useEffect(() => {
        const optionsFunc = optionsRef.current;
        if (!searchActive || typeof optionsFunc !== "function") {
            return;
        }

        let interrupted = false;

        const updateOpts = async () => {
            const res = await optionsFunc(searchValue);
            if (interrupted) return;
            setActiveOptions(res);
        };

        updateOpts();

        return () => {
            interrupted = true;
        };
    }, [searchValue, searchActive, optionsUpdateTrigger]);

    return (
        <div className={className} style={style} ref={setRoot}>
            <HiddenInput
                noJson={!jsonSerialization}
                id={id}
                name={name}
                value={rawValues}
                required={required}
            />
            <button
                type="button"
                disabled={_disabled}
                onClick={() => setOpen(true)}
                className={combobox({ size, disabled: _disabled })}
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
                <Card variant="custom" bg="1" shadow="sm" borderColor="light" border="thin" {...cardProps}>
                    <CardBody size="none">
                        {searchActive && (
                            <div className={clsx("h-10 flex", "border-b-[0.5px] border-divider-light")}>
                                <Center className="pl-3">
                                    <Icon color="t3">
                                        <MagnifyingGlassIcon />
                                    </Icon>
                                </Center>
                                <Input
                                    variant="ghost"
                                    placeholder="Search..."
                                    {...searchInputProps}
                                    type="search"
                                    className={clsx("grow !h-full", searchInputProps?.className)}
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        searchInputProps?.onChange?.(e);
                                    }}
                                />
                            </div>
                        )}
                        {!hasOptions &&
                            (empty ?? (
                                <Placeholder disabled italic py="xs" {...placeholderProps}>
                                    {emptyText ?? "No options available"}
                                </Placeholder>
                            ))}
                        {hasOptions && (
                            <List
                                className={clsx("")}
                                selectable={multiple}
                                multiple={multiple}
                                padding="sm"
                                items={getListItems(activeOptions)}
                                onChange={({ value }) => {
                                    if (!multiple) {
                                        return;
                                    }
                                    setActiveChoices(value);
                                }}
                                defaultValue={activeValues}
                                onItemClick={(listItem) => {
                                    if (multiple) {
                                        return;
                                    }

                                    const option: ComboboxOption<D> | undefined = listItem.data;
                                    if (!option || option.disabled) return;

                                    activateChoice(option.value);
                                    setOpen(false);
                                }}
                            />
                        )}
                    </CardBody>
                </Card>
            </Popover>
        </div>
    );
};
