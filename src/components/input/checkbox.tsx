"use client";

import type { InputLikeProps } from "./types.js";
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import type { PropsOf, StyleProps, WithTVProps } from "../../types/index.js";
import { CheckFactIcon } from "../icons/phosphor/check-fat.js";

const checkbox = tv({
    base: "shrink-0 group relative inline-flex items-center justify-center rounded-md ring-[1.5px] ring-inset appearance-none",
    variants: {
        size: {
            sm: "size-5 text-sm!",
            md: "size-6 text-base!",
            lg: "size-8 text-lg!",
        },
        color: {
            default:
                "text-t2! ring-divider bg-paper2 hover:bg-paper2 data-[checked=true]:bg-paper3 data-[checked=true]:hover:bg-paper3/70",
            primary:
                "text-primary! ring-primary-500 bg-primary/10 hover:bg-primary/20 data-[checked=true]:bg-primary/20 data-[checked=true]:hover:bg-primary/15",
            secondary:
                "text-secondary! ring-secondary-500 bg-secondary/10 hover:bg-secondary/20 data-[checked=true]:bg-secondary/20 data-[checked=true]:hover:bg-secondary/15",
            accent: "text-accent! ring-accent-500 bg-accent/10 hover:bg-accent/20 data-[checked=true]:bg-accent/20 data-[checked=true]:hover:bg-accent/15",
            danger: "text-danger! ring-danger-500 bg-danger/10 hover:bg-danger/20 data-[checked=true]:bg-danger/20 data-[checked=true]:hover:bg-danger/15",
            warning:
                "text-warning! ring-warning-500 bg-warning/10 hover:bg-warning/20 data-[checked=true]:bg-warning/20 data-[checked=true]:hover:bg-warning/15",
        },
        disabled: {
            false: "cursor-pointer",
            true: "cursor-not-allowed",
        },
    },
    defaultVariants: {
        size: "md",
        color: "default",
        disabled: false,
    },
});

export type CheckboxProps = WithTVProps<
    Omit<PropsOf<"input">, "value" | "defaultValue" | "checked" | "defaultChecked" | "onChange" | "type"> &
        InputLikeProps<boolean> &
        VariantProps<typeof checkbox> &
        StyleProps & {
            icon?: React.ReactNode;
        },
    typeof checkbox
>;

export const Checkbox: React.FC<CheckboxProps> = ({
    className,
    size,
    onChange,
    value,
    defaultValue,
    color,
    icon,
    onClick,
    style,
    ...props
}) => {
    const disabled = props.readOnly || props.disabled;
    const _icon = icon || <CheckFactIcon className="w-3.5 h-3.5" />;

    return (
        <label className={checkbox({ className, disabled, color, size })} style={style}>
            <input
                type="checkbox"
                onChange={(e) => onChange?.({ value: e.currentTarget.checked })}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(e);
                }}
                checked={value}
                defaultChecked={defaultValue}
                disabled={disabled}
                {...props}
                className="peer absolute inset-0 opacity-0 cursor-inherit"
            />
            {/* icon is only visible when checked */}
            <span className="hidden peer-checked:inline">{_icon}</span>
        </label>
    );
};
