"use client";

import React, { type ComponentType } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, StyleProps } from "../../types/index.js";
import clsx from "clsx";
import { HiddenInput } from "./hidden-input.js";
import { themeColor } from "../../util/style.js";

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
    },
    defaultVariants: {
        color: "primary",
        size: "md",
        bg: "paper",
    },
});

export interface RadioSwitchProps<V = string, D = any>
    extends InputLikeProps<V, { option: LabeledChoice<V, D> & { href?: string } }>,
        VariantProps<typeof radioSwitch>,
        StyleProps {
    options: (LabeledChoice<V, D> & { href?: string })[];
    LinkComponent?: ComponentType<{ href?: string }>;
    dense?: boolean;
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
}: RadioSwitchProps<V, D>) => {
    const controlled = value !== undefined;
    // capture selected state to display in the button
    const [selected, setSelected] = React.useState<LabeledChoice<V, D> | null>(() => {
        if (value !== undefined || defaultValue !== undefined) {
            const val = value ?? defaultValue;
            const found = options.find(({ value }) => value === val);
            if (found) return found;
        }
        return null;
    });
    const { bgA } = themeColor(color || "primary");
    const activate = (option: LabeledChoice<V, D>) => {
        if (!controlled) setSelected(option);
        onChange?.({ value: option.value, option });
    };

    React.useEffect(() => {
        if (value) {
            const newOption = options.find(({ value: val }) => val === value);
            if (newOption) {
                setSelected(newOption);
            }
        }
    }, [value, options]);

    return (
        <div className={radioSwitch({ className, size, color, bg })} style={style}>
            {/* form compatibility */}
            {name && <HiddenInput required={required} name={name} value={String(selected?.value || "")} />}
            {options.map((option, i) => {
                const canActivate = !disabled && !readOnly && !option.disabled;
                const active = selected?.value === option.value;
                const last = i === options.length - 1;
                const classes = clsx(
                    "text-center flex items-center gap-2 transition cursor-pointer",
                    dense ? "px-2" : "px-4",
                    !last && "border-r border-divider/40",
                    active ? ["", bgA(5)] : "text-t2",
                    canActivate && !active && "hover:bg-transparent1 active:bg-transparent2"
                );

                if (option.href) {
                    const Link = LinkComponent || "a";
                    return (
                        <Link
                            onClick={() => {
                                activate(option);
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
                            activate(option);
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
