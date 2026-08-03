"use client";

import type { FC, ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/cn.util.js";
import { Icon } from "@/components/icons/icon.js";
import { useAsSet } from "@/hooks/iterables/use-as-set.js";
import { ClipboardIconButton } from "@/components/input/clipboard-icon-button.js";

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
    !!val &&
    typeof val === "object" &&
    !Array.isArray(val) &&
    Object.getPrototypeOf(val) === Object.prototype;

export interface FieldModel {
    label?: ReactNode;
    icon?: ReactNode;
    iconProps?: ComponentProps<typeof Icon>;
    renderValue?: (value: any) => ReactNode;
    canCopy?: boolean;
}

export type SummaryModel<T extends object = any> = Partial<Record<string & keyof T, FieldModel>>;

export interface SummaryProps extends ComponentProps<"table"> {
    values: object;
    model?: SummaryModel;
    /** @default "w-40" */
    labelWidth?: number | "auto";
    prefix?: string;
    nestedMargin?: number;
    fieldModels?: (key: string, value: string, path: string) => FieldModel;
    /** Array of field paths to exclude from the summary. */
    excludeFields?: string[];
    /**
     * Array of field paths to include in the summary.
     * If provided, only these fields will be displayed, ignoring `excludeFields`.
     */
    includeFields?: string[];
    /** Only include fields that are present in the model. */
    strictModel?: boolean;
    emptyPlaceholder?: string;
}

export const Summary: FC<SummaryProps> = ({
    className,
    values,
    prefix,
    model,
    fieldModels,
    nestedMargin,
    labelWidth,
    excludeFields,
    emptyPlaceholder,
    strictModel,
    includeFields,
    ...rootProps
}) => {
    const entries = Object.entries(values);
    const excludeFieldsSet = useAsSet(excludeFields || []);
    const includeFieldsSet = useAsSet(includeFields || []);

    return (
        <table
            className={cn("w-full border-separate border-spacing-y-2", className)}
            style={nestedMargin !== undefined ? { marginLeft: nestedMargin } : undefined}
            {...rootProps}
        >
            <tbody>
                {entries.map(([key, value]) => {
                    const path = prefix ? `${prefix}${key}` : key;
                    const dynamicModel = fieldModels?.(key, value, path);
                    const staticModel = model?.[path as keyof typeof model];
                    const fieldModel =
                        staticModel || dynamicModel ? { ...staticModel, ...dynamicModel } : undefined;

                    if (
                        excludeFieldsSet.has(path) ||
                        (includeFields && !includeFieldsSet.has(path)) ||
                        (strictModel && !fieldModel)
                    ) {
                        return null;
                    }

                    const isObj = isPlainObject(value);
                    const renderedValue = fieldModel?.renderValue ? fieldModel.renderValue(value) : undefined;
                    const strValue =
                        typeof renderedValue === "string"
                            ? renderedValue
                            : !renderedValue
                              ? String(value)
                              : undefined;

                    return (
                        <tr key={key}>
                            <td
                                style={{ width: labelWidth }}
                                className={cn("pr-4 py-1 whitespace-nowrap", !labelWidth && "w-40")}
                            >
                                <div className="flex items-center">
                                    {fieldModel?.icon && (
                                        <Icon
                                            size="sm"
                                            color="neutral"
                                            {...fieldModel.iconProps}
                                            className={cn("mr-2", fieldModel.iconProps?.className)}
                                        >
                                            {fieldModel.icon}
                                        </Icon>
                                    )}
                                    {fieldModel?.label && typeof fieldModel.label !== "string" ? (
                                        fieldModel.label
                                    ) : (
                                        <span className="text-t-2 text-sm">{fieldModel?.label ?? key}</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-1">
                                {isObj ? (
                                    <Summary
                                        prefix={`${prefix || ""}${key}.`}
                                        values={value}
                                        model={model}
                                        fieldModels={fieldModels}
                                        excludeFields={excludeFields}
                                        includeFields={includeFields}
                                        strictModel={strictModel}
                                        emptyPlaceholder={emptyPlaceholder}
                                        labelWidth={labelWidth}
                                        style={{ marginLeft: 16 }}
                                        className={cn(nestedMargin === undefined && "ml-4")}
                                    />
                                ) : (
                                    <div className="flex gap-2">
                                        <div className="grow min-w-0">
                                            {strValue !== undefined ? (
                                                <span className="text-sm">
                                                    {value == null ? (
                                                        <i className="text-t-3">{emptyPlaceholder}</i>
                                                    ) : (
                                                        strValue
                                                    )}
                                                </span>
                                            ) : (
                                                renderedValue
                                            )}
                                        </div>
                                        {fieldModel?.canCopy && (
                                            <ClipboardIconButton
                                                valueToCopy={value}
                                                className="h-7 w-7 p-0"
                                            />
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
