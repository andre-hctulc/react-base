import { Checkbox as BaseCheckbox, type CheckboxProps as BaseCheckboxProps } from "@headlessui/react";
import type { InputLikeProps } from "./types";
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import type { StyleProps } from "../../types";
import { Icon } from "../icons";
import { CheckFactIcon } from "../icons/check-fat";

const checkbox = tv({
    base: "shrink-0 group block rounded-md ring-[1.5px] ring-inset",
    variants: {
        size: {
            sm: "size-5 text-sm!",
            md: "size-6 text-base!",
            lg: "size-8 text-lg!",
        },
        color: {
            default: "text-t2! ring-divider bg-paper2 hover:bg-paper2 data-checked:bg-paper3 data-checked:hover:bg-paper3/70",
            primary: "text-primary! ring-primary-500 bg-primary/10 hover:bg-primary/20 data-checked:bg-primary/20 data-checked:hover:bg-primary/15",
            secondary: "text-secondary! ring-secondary-500 bg-secondary/10 hover:bg-secondary/20 data-checked:bg-secondary/20 data-checked:hover:bg-secondary/15",
            accent: "text-accent! ring-accent-500 bg-accent/10 hover:bg-accent/20 data-checked:bg-accent/20 data-checked:hover:bg-accent/15",
            danger: "text-danger! ring-danger-500 bg-danger/10 hover:bg-danger/20 data-checked:bg-danger/20 data-checked:hover:bg-danger/15",
            warning: "text-warning! ring-warning-500 bg-warning/10 hover:bg-warning/20 data-checked:bg-warning/20 data-checked:hover:bg-warning/15",
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

export interface CheckboxProps
    extends InputLikeProps<boolean>,
        VariantProps<typeof checkbox>,
        Omit<BaseCheckboxProps, keyof InputLikeProps | "className" | "style" | "checked" | "defaultChecked" | "color">,
        StyleProps {
    icon?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ className, size, onChange, value, defaultValue, required, disabled, readOnly, color, icon, ...props }) => {
    const dis = readOnly || disabled;

    return (
        <BaseCheckbox
            disabled={dis}
            onChange={checked => onChange?.({ value: checked })}
            className={checkbox({ className, disabled: dis, color, size })}
            {...props}
            checked={value}
            defaultChecked={defaultValue}
        >
            <span className="group-data-checked:flex hidden items-center justify-center h-full">
                <Icon size="sm">{icon || <CheckFactIcon />}</Icon>
            </span>
        </BaseCheckbox>
    );
};
