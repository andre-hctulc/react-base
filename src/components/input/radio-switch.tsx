"use client";

import React, { type ComponentType } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { InputLikeProps } from "./types.js";
import type { LabeledChoice, StyleProps } from "../../types/index.js";
import clsx from "clsx";
import { HiddenInput } from "./hidden-input.js";

const radioSwitch = tv({
    base: "rounded-full flex border overflow-hidden",
    variants: {
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
        },
    },
    defaultVariants: {
        color: "primary",
        size: "md",
    },
});

interface RadioSwitchProps<V = any, D = any>
    extends InputLikeProps<V, { option: LabeledChoice<V, D> & { href?: string } }>,
        VariantProps<typeof radioSwitch>,
        StyleProps {
    options: (LabeledChoice<V, D> & { href?: string })[];
    LinkComponent?: ComponentType<{ href?: string }>;
}

export const RadioSwitch = <V, D>({
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
        <div className={radioSwitch({ className, size, color })} style={style}>
            {/* form compatibility */}
            {name && <HiddenInput required={required} name={name} value={String(selected?.value || "")} />}
            {options.map((option, i) => {
                const canActivate = !disabled && !readOnly && !option.disabled;
                const active = selected?.value === option.value;
                const last = i === options.length - 1;
                const classes = clsx(
                    "text-center flex items-center gap-2 px-4 transition cursor-pointer",
                    active && "text-t2!",
                    last && "border-r",
                    canActivate && "hover:bg-transparent1 active:bg-transparent2"
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
