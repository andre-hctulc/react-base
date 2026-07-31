"use client";

import { cn } from "@/util/cn.js";
import type { PropsOf } from "../../types/index.js";
import type { FC, ReactNode } from "react";

export type RadioCardProps = PropsOf<"div"> & {
    active?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    params?: Partial<any>;
};

/**
 * A card-style radio option.
 */
export const RadioCard: FC<RadioCardProps> = ({
    active,
    disabled,
    readOnly,
    params,
    onClick,
    className,
    children,
    ...rootProps
}) => (
    <div
        className={cn(
            "transition border-[1.5px] rounded-lg bg-white dark:bg-gray-800",
            active ? "border-primary outline-0" : "outline-primary",
            disabled && "opacity-50",
            className,
        )}
        onClick={(e) => {
            params?.activate();
            onClick?.(e);
        }}
        {...rootProps}
    >
        {children}
    </div>
);
