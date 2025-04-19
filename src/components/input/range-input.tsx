"use client";

import { tv } from "tailwind-variants";
import React, { useId, useMemo, useState, type FC } from "react";
import type { PropsOf, TVCProps } from "../../types/index.js";
import type { InputLikeProps } from "./types.js";
import clsx from "clsx";

const rangeInput = tv({
    base: "",
    variants: {},
    defaultVariants: {},
});

interface RangeInputProps
    extends Omit<TVCProps<typeof rangeInput, "div">, "defaultValue" | "value" | "type" | "onChange">,
        InputLikeProps<number, React.ChangeEvent<HTMLDivElement>> {
    inputProps?: PropsOf<"input">;
    /**
     * List of marker positions or amount of partitions
     */
    markers?: number[] | number;
    min?: number;
    max?: number;
    step?: string | number;
    id?: string;
    /**
     * Show min/max and current value
     * @default true
     */
    labeled?: boolean;
}

/**
 * ### Props
 * - `markers` - Range markers
 * - `inputProps`
 * - `step`
 * - `min`
 * - `max`
 * - `showValue` - Show value
 * - `showMinMax` - Show min and max
 * - `raw` - Show only input
 */
export const RangeInput: FC<RangeInputProps> = ({
    style,
    name,
    required,
    readOnly,
    defaultValue,
    value,
    onChange,
    ref,
    className,
    inputProps,
    markers,
    max,
    min,
    step,
    id,
    labeled,
    ...props
}) => {
    const [val, setValue] = useState<number | undefined>(value ?? defaultValue);
    const markerPositions = useMemo(() => {
        if (Array.isArray(markers)) {
            return markers;
        }
        if (typeof markers === "number" && max) {
            const partitionSize = Math.round((max / markers) * 100) / 100;
            const positions = Array.from({ length: markers }, (_, i) => {
                const position = (min ?? 0) + i * partitionSize;
                return position > max ? max : position;
            });
            positions.push(max);
            return positions;
        }
        return null;
    }, [markers]);
    const listId = useId();

    const numText = (num: number) => {
        if (num % 1 === 0) {
            return num.toString();
        }
        return num.toFixed(2);
    };

    return (
        <div className={rangeInput({ className })} ref={ref} {...props}>
            {labeled !== false && (
                <div className="flex items-center mb-[2px] text-xs text-t3">
                    {min !== undefined && <span>{numText(min)}</span>}
                    <b className="ml-2 text-t2">{val}</b>
                    {max !== undefined && <span className="ml-auto">{numText(max)}</span>}
                </div>
            )}
            <input
                readOnly={readOnly}
                required={required}
                min={min}
                max={max}
                step={step}
                {...inputProps}
                list={markerPositions ? listId : undefined}
                id={id}
                type="range"
                value={value}
                defaultValue={defaultValue}
                name={name}
                className={clsx("w-full", inputProps?.className)}
                onChange={(e) => {
                    inputProps?.onChange?.(e);
                    setValue(e.target.valueAsNumber);
                    onChange?.({ value: e.target.valueAsNumber, ...e });
                }}
            />
            {markerPositions && (
                <datalist id={listId}>
                    {markerPositions.map((pos) => (
                        <option value={pos} label={String(pos)} />
                    ))}
                </datalist>
            )}
        </div>
    );
};
