"use client";

import { type ElementType } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, StyleProps } from "../../types/index.js";
import clsx from "clsx";
import { HiddenInput } from "./hidden-input.js";
import { themeColor } from "../../util/style.js";
import { useChoices } from "../../hooks/others/use-choices.js";

const radioSwitch = tv({
    base: "rounded-full flex border overflow-hidden w-fit",
    variants: {
        bg: {
            paper: "bg-paper",
            transparent: "",
        },
        size: {
            sm: "text-sm h-6",
            md: "text-base h-8",
            lg: "text-lg h-10",
        },
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            error: "text-error",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
            neutral: "text-neutral",
            accent: "text-accent",
        },
        disabled: {
            true: "!cursor-not-allowed",
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
        size: "md",
        bg: "paper",
    },
});

export type RadioSwitchOption<V = string, D = any> = LabeledChoice<V, D> & {
    href?: string;
};

export interface RadioSwitchProps<V = string, D = any>
    extends InputLikeProps<V[], { options: RadioSwitchOption<V, D>[]; singleValue: V | undefined }>,
        VariantProps<typeof radioSwitch>,
        StyleProps {
    options: RadioSwitchOption<V, D>[];
    LinkComponent?: ElementType<{ href?: string }>;
    dense?: boolean;
    toggleMode?: boolean;
    multiple?: boolean;
}

export const RadioSwitch = <V = string, D = any>({
    options,
    className,
    style,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    required,
    size,
    color,
    name,
    LinkComponent,
    dense,
    bg,
    toggleMode,
    multiple,
}: RadioSwitchProps<V, D>) => {
    const { isActiveChoice, toggleChoice, activateChoice, choices, rawValues } = useChoices(options, {
        multiple,
        onChange: (value, choices) => {
            onChange?.({ value, options: choices, singleValue: value[0] });
        },
        value,
        defaultValue,
    });
    const { bgA } = themeColor(color || "primary");

    return (
        <div className={radioSwitch({ className, size, color, bg, disabled })} style={style}>
            {/* form compatibility */}
            {name && <HiddenInput required={required} name={name} value={rawValues} />}
            {choices.map((option, i) => {
                const optionDisabled = !!option.disabled;
                const canActivate = !disabled && !readOnly && !option.disabled;
                const active = isActiveChoice(option.value);
                const last = i === options.length - 1;
                const classes = clsx(
                    "text-center flex items-center gap-2 transition",
                    dense ? "px-2" : "px-4",
                    !last && "border-r border-divider/40",
                    optionDisabled ? "cursor-not-allowed" : "cursor-pointer",
                    active ? ["", bgA(5)] : canActivate ? "text-t2" : "text-t3",
                    canActivate && !active && "hover:bg-transparent1 active:bg-transparent2"
                );

                if (option.href) {
                    const Link = LinkComponent || "a";
                    return (
                        <Link
                            onClick={() => {
                                if (toggleMode) toggleChoice(option.value);
                                else activateChoice(option.value);
                            }}
                            key={String(option.value)}
                            href={option.href}
                            className={classes}
                        >
                            {option.icon}
                            {option.label}
                        </Link>
                    );
                }

                return (
                    <button
                        type="button"
                        onClick={() => {
                            if (toggleMode) toggleChoice(option.value);
                            else activateChoice(option.value);
                        }}
                        disabled={!canActivate}
                        key={String(option.value)}
                        className={classes}
                    >
                        {option.icon}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};
