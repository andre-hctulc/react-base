"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, PartialPropsOf, StyleProps } from "../../types/index.js";
import { XScroll } from "../shadow/x-scroll.js";
import { Icon } from "../icons/icon.js";
import { HiddenInput } from "./hidden-input.js";
import { useChoices } from "../../hooks/others/use-choices.js";
import { Placeholder } from "../placeholder/placeholder.js";
import { CardBody } from "../card/card-body.js";
import { MagnifyingGlassIcon } from "../icons/phosphor/magnifying-glass.js";
import { useRefOf, useResizeObserver, useResolveT } from "../../hooks/index.js";
import type { BaseTheme, TProps } from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteSizes } from "flowbite-react/types";
import {
    Badge,
    Checkbox,
    ChevronDownIcon,
    createTheme,
    ListGroup,
    ListGroupItem,
    Popover,
    TextInput,
    type BadgeProps,
} from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { Toolbar } from "../containers/toolbar.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        combobox: ComboboxTheme;
    }

    interface FlowbiteProps {
        combobox: Partial<WithoutThemingProps<ComboboxProps>>;
    }
}

interface ComboboxTheme {
    root: BaseTheme;
    button: BaseTheme & {
        disabled: FlowbiteBoolean;
        size: Pick<FlowbiteSizes, "sm" | "md" | "lg">;
    };
}

const combobox = createTheme<ComboboxTheme>({
    root: { base: "" },
    button: {
        base: twMerge([
            "w-full rounded-lg bg-paper-2 text-left text-sm cursor-pointer",
            "flex relative",
            "h-full w-full",
            "py-1.5 pr-9 pl-3 gap-3",
            "focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2",
        ]),
        size: {
            sm: "h-7 text-sm",
            md: "h-9 text-sm",
            lg: "h-11text-base",
        },
        disabled: {
            on: "cursor-not-allowed text-t-3",
            off: "",
        },
        defaultVariants: {
            size: "md",
        },
    },
});

export type ComboboxProps<D = any> = TProps<ComboboxTheme> &
    InputLikeProps<string[], { options: ComboboxOption<D>[]; singleValue: string | undefined }> &
    StyleProps & {
        /**
         * The options to display in the dropdown. Can be an array or a function that returns a options dynamically by a search value.
         */
        options:
            | ComboboxOption<D>[]
            | ((query: string) => Promise<ComboboxOption<D>[]> | ComboboxOption<D>[]);
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
        searchInputProps?: PartialPropsOf<typeof TextInput>;
        cardBodyProps?: PartialPropsOf<typeof CardBody>;
        /**
         * Use JSON serialization using the {@link HiddenInput}.
         *
         * By default for each selected option a hidden input is rendered.
         *
         * Enforces array value.
         */
        jsonSerialization?: boolean;
        badgeProps?: BadgeProps;
        showAmountSelected?: boolean;
        showSelectAll?: boolean;
        searchable?: boolean;
    };

export interface SelectionParams<D = any> {
    selected: ComboboxOption<D>[];
}

export interface ComboboxOption<D = any> extends LabeledChoice<string, D> {
    defaultChecked?: boolean;
    badgeText?: string;
}

function filterOptions<D>(options: ComboboxOption<D>[], searchText: string): ComboboxOption<D>[] {
    const searchLower = searchText.toLowerCase();
    return options.filter((opt) => {
        const label = typeof opt.label === "string" ? opt.label : String(opt.label);
        return label.toLowerCase().includes(searchLower);
    });
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
export const Combobox = <V extends any = string, D = any>(props: ComboboxProps<D>) => {
    const { children, classNames, restProps } = useResolveT("combobox", combobox, props);
    const {
        options,
        style,
        readOnly,
        placeholder,
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
        cardBodyProps: cardProps,
        allOptions,
        optionsUpdateTrigger,
        jsonSerialization,
        badgeProps,
        showAmountSelected,
        showSelectAll,
        searchable,
    } = restProps;

    const [open, setOpen] = useState(false);

    const searchActive = typeof options === "function" || !!searchable;
    const [searchValue, setSearchValue] = useState("");

    const [activeOptions, setActiveOptions] = useState<ComboboxOption<D>[]>(allOptions ?? []);
    const {
        toggleChoice,
        choices,
        activeValues,
        activeChoices,
        rawValues,
        activateChoice,
        setActiveChoices,
        isActiveChoice,
    } = useChoices(activeOptions, {
        multiple,
        onChange: (value, choices) => {
            onChange?.({ value, options: choices, singleValue: value[0] });
        },
        value,
        defaultValue,
    });
    const hasOptions = activeOptions.length > 0;

    const firstSelected: ComboboxOption<D> | undefined = activeChoices[0];
    const selectedEl = renderSelected ? (
        renderSelected({ selected: activeChoices })
    ) : multiple ? (
        <>
            {activeChoices.map((sel) => {
                return (
                    <Badge
                        size="sm"
                        key={String(sel.value)}
                        icon={sel.icon}
                        {...badgeProps}
                        className={twMerge("shrink-0", badgeProps?.className)}
                    >
                        {sel.badgeText ?? sel.label}
                    </Badge>
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
            {firstSelected?.badgeText ?? firstSelected?.label}
        </span>
    );

    const loadingEl = <span className="text-t-3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-t-3">{placeholder}</span> : placeholder;
    const _disabled = loading || readOnly || !!props.disabled;

    const optionsRef = useRefOf(options);

    useEffect(() => {
        const options = optionsRef.current;
        let interrupted = false;

        if (typeof options === "function") {
            const updateOpts = async () => {
                const res = await options(searchValue);
                if (interrupted) return;
                setActiveOptions(res);
            };
            updateOpts();
        } else {
            setActiveOptions(filterOptions(options, searchValue));
        }

        return () => {
            interrupted = true;
        };
    }, [searchValue, searchActive, optionsUpdateTrigger]);

    const rootRef = useRef<HTMLDivElement>(null);
    const [rootWidth, setRootWidth] = useState(0);

    useResizeObserver(rootRef, (entry) => {
        setRootWidth(entry.contentRect.width);
    });

    return (
        <div className={classNames.root} style={style} ref={rootRef}>
            <HiddenInput
                noJson={!jsonSerialization}
                id={id}
                name={name}
                value={rawValues}
                required={required}
            />
            <Popover
                popover="manual"
                placement="bottom-start"
                arrow={false}
                open={open}
                onOpenChange={setOpen}
                content={
                    <CardBody {...cardProps} style={{ width: rootWidth, ...cardProps?.style }}>
                        {searchActive && (
                            <div
                                className={twMerge(
                                    "sticky top-0 z-10 flex flex-col border-b-[0.5px] border-divider-light bg-paper2",
                                )}
                            >
                                <TextInput
                                    theme={{
                                        field: { input: { base: "rounded-b-none! border-0! ring-0!" } },
                                    }}
                                    icon={MagnifyingGlassIcon}
                                    placeholder="Search..."
                                    {...searchInputProps}
                                    type="search"
                                    className={twMerge("h-10", searchInputProps?.className)}
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        searchInputProps?.onChange?.(e);
                                    }}
                                />
                                {(showSelectAll ?? true) && activeOptions.length > 0 && (
                                    <Toolbar
                                        p="sm"
                                        pl="lg"
                                        className="border-t-[0.5px] border-divider-light"
                                        justifyContent="end"
                                    >
                                        <label className="flex gap-2 text-t2 text-sm items-center">
                                            Select all
                                            <Checkbox
                                                checked={activeOptions.length === activeChoices.length}
                                                onChange={() => {
                                                    if (activeOptions.length === activeChoices.length) {
                                                        setActiveChoices([]);
                                                    } else {
                                                        setActiveChoices(activeOptions.map((c) => c.value));
                                                    }
                                                }}
                                                form="**never"
                                            />
                                        </label>
                                    </Toolbar>
                                )}
                            </div>
                        )}
                        {!hasOptions &&
                            (empty ?? (
                                <Placeholder disabled italic py="md" {...placeholderProps}>
                                    {emptyText ?? "No options available"}
                                </Placeholder>
                            ))}
                        {hasOptions && (
                            <ListGroup className={twMerge("rounded-t-0 border-0")}>
                                {activeOptions.map((option) => {
                                    const active = isActiveChoice(option.value);
                                    const disabled = option.disabled || false;
                                    return (
                                        <ListGroupItem
                                            theme={{ link: { base: "gap-2 ring-0!" } }}
                                            disabled={disabled}
                                            icon={option.icon}
                                            onClick={() => {
                                                if (!option || disabled) return;

                                                if (multiple) {
                                                    toggleChoice(option.value);
                                                    return;
                                                }

                                                activateChoice(option.value);
                                                setOpen(false);
                                            }}
                                            key={option.value}
                                        >
                                            <Checkbox
                                                readOnly={disabled}
                                                checked={active}
                                                form="**never"
                                                onChange={() => {}}
                                            />
                                            {option.label}
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        )}
                    </CardBody>
                }
                {...popoverProps}
            >
                <button
                    type="button"
                    disabled={_disabled}
                    onClick={() => setOpen(true)}
                    className={classNames.button}
                >
                    <XScroll hideScrollbar>
                        <div className="w-full h-full box-border overflow-x-auto flex items-center gap-1.5">
                            {loading ? loadingEl : activeChoices.length ? selectedEl : placeholderEl}
                        </div>
                    </XScroll>
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-t-2 text-base">
                        {icon || <ChevronDownIcon />}
                    </span>
                </button>
            </Popover>
            {showAmountSelected && activeChoices.length > 0 && (
                <span className="text-xs text-t2">{activeChoices.length} selected</span>
            )}
        </div>
    );
};
