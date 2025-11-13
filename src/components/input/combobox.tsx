"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, PartialPropsOf, StyleProps } from "../../types/index.js";
import { XScroll } from "../shadow/x-scroll.js";
import { Icon } from "../icons/icon.js";
import { HiddenInput } from "./hidden-input.js";
import { useChoices } from "../../hooks/others/use-choices.js";
import { Placeholder } from "../data-display/placeholder.js";
import { CardBody } from "../containers/card-body.js";
import { MagnifyingGlassIcon } from "../icons/phosphor/magnifying-glass.js";
import { Center } from "../containers/center.js";
import { useRefOf, useResolveT } from "../../hooks/index.js";
import type { BaseTheme, TProps } from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteSizes } from "flowbite-react/types";
import {
    Badge,
    Card,
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
            "w-full rounded-lg bg-paper2 text-left text-sm cursor-pointer",
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
            on: "cursor-not-allowed text-t3",
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
    };

export interface SelectionParams<D = any> {
    selected: ComboboxOption<D>[];
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
export const Combobox = <V = string, D = any>(props: ComboboxProps<D>) => {
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
    } = restProps;
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
        isActiveChoice,
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
                    <Badge size="sm" key={String(sel.value)} icon={sel.icon} {...badgeProps}>
                        {sel.label}
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
            {firstSelected?.label}
        </span>
    );
    const hasOptions = activeOptions.length > 0;

    const loadingEl = <span className="text-t3 truncate">{loadingText ?? "Loading..."}</span>;

    const placeholderEl =
        typeof placeholder === "string" ? <span className="text-t3">{placeholder}</span> : placeholder;
    const _disabled = loading || readOnly || !!props.disabled;

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
    const cardWith = useMemo(() => {
        return root ? Math.round(root.clientWidth) : undefined;
    }, [root]);

    return (
        <div className={classNames.root} style={style} ref={setRoot}>
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
                    <CardBody {...cardProps} style={{ width: cardWith, ...cardProps?.style }}>
                        {searchActive && (
                            <div className={twMerge("h-10 flex", "border-b-[0.5px] border-divider-light")}>
                                <TextInput
                                    theme={{
                                        field: { input: { base: "rounded-b-none! border-0! ring-0!" } },
                                    }}
                                    icon={MagnifyingGlassIcon}
                                    placeholder="Search..."
                                    {...searchInputProps}
                                    type="search"
                                    className={twMerge("grow h-full!", searchInputProps?.className)}
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
                    <span className="absolute translate-y-[-50%] top-[50%] right-3 text-t2 text-base">
                        {icon || <ChevronDownIcon />}
                    </span>
                </button>
            </Popover>
        </div>
    );
};
