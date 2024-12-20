"use client";

import { Switch as BaseSwitch } from "@headlessui/react";
import type { InputLikeProps } from "./input";
import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import type { PropsOf, XStyleProps } from "../../types";

const _switch = tv({
    base: "group relative flex  cursor-pointer rounded-full bg-3 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white",
    variants: {
        size: {
            sm: "h-5 w-11",
            md: "h-7 w-14",
            lg: "size-9 w-17",
        },
        color: {
            primary: "data-[checked]:bg-primary/70",
            secondary: "data-[checked]:bg-secondary/70",
            accent: "data-[checked]:bg-accent/70",
            error: "data-[checked]:bg-error/70",
            success: "data-[checked]:bg-success/70",
            warning: "data-[checked]:bg-warning/70",
            info: "data-[checked]:bg-info/70",
        },
    },
    defaultVariants: {
        size: "md",
        color: "primary",
    },
});

interface SwitchProps
    extends InputLikeProps<boolean>,
        VariantProps<typeof _switch>,
        Omit<
            PropsOf<typeof BaseSwitch>,
            keyof InputLikeProps | "className" | "style" | "color" | "checked" | "defaultChecked"
        >,
        XStyleProps {}

export const Switch: React.FC<SwitchProps> = ({
    className,
    onChange,
    value,
    defaultValue,
    color,
    size,
    disabled,
    ...props
}) => {
    return (
        <BaseSwitch
            checked={value}
            defaultChecked={defaultValue}
            onChange={(checked) => onChange?.({ value: checked })}
            className={_switch({ className, color, size })}
            disabled={disabled}
            {...props}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
        </BaseSwitch>
    );
};
