"use client";

import { isPlainObject } from "@dre44/util";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, WithTVProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { useAsSet } from "../../hooks/index.js";
import { CopyIconButton } from "../exotic/copy-icon-button.js";

const summary = tv({
    base: "w-full border-separate border-spacing-y-2",
});

export interface FieldModel {
    label?: ReactNode;
    icon?: ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    renderValue?: (value: any) => ReactNode;
    canCopy?: boolean;
}

export type SummaryModel<T extends object = any> = Partial<Record<string & keyof T, FieldModel>>;

type SummaryProps = WithTVProps<
    PropsOf<"table"> & {
        values: object;
        model?: SummaryModel;
        /**
         * @default "w-40"
         */
        labelWidth?: number | "auto";
        prefix?: string;
        nestedMargin?: number;
        fieldModels?: (key: string, value: string, path: string) => FieldModel;
        /**
         * Array of field paths to exclude from the summary.
         */
        excludeFields?: string[];
        /**
         * Array of field paths to include in the summary.
         * If provided, only these fields will be displayed, ignoring `excludeFields`.
         */
        includeFields?: string[];
        /**
         * Only include fields that are present in the model.
         */
        strictModel?: boolean;
        emptyPlaceholder?: string;
    },
    typeof summary
>;

export const Summary: FC<SummaryProps> = ({
    values,
    prefix,
    model,
    fieldModels,
    nestedMargin,
    labelWidth,
    excludeFields,
    emptyPlaceholder,
    className,
    strictModel,
    ...props
}) => {
    const entries = Object.entries(values);
    const excludeFieldsSet = useAsSet(excludeFields || []);
    const includeFieldsSet = useAsSet(props.includeFields || []);

    return (
        <table
            className={summary({ className })}
            style={nestedMargin !== undefined ? { marginLeft: nestedMargin } : undefined}
            {...props}
        >
            <tbody>
                {entries.map(([key, value]) => {
                    const path = prefix ? `${prefix}${key}` : key;
                    const dynamicModel = fieldModels?.(key, value, path);
                    const staticModel = model?.[path as keyof typeof model];
                    const fieldModel =
                        staticModel || dynamicModel ? { ...staticModel, ...dynamicModel } : undefined;

                    // Excluded?
                    if (
                        excludeFieldsSet.has(path) ||
                        (props.includeFields && !includeFieldsSet.has(path)) ||
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
                        <tr key={key} className="">
                            <td
                                style={{ width: labelWidth }}
                                className={clsx("pr-4 py-1 whitespace-nowrap", !labelWidth && "w-40")}
                            >
                                <div className="flex items-center">
                                    {fieldModel?.icon && (
                                        <Icon
                                            size="sm"
                                            color="neutral"
                                            {...fieldModel.iconProps}
                                            className={clsx("mr-2", fieldModel.iconProps?.className)}
                                        >
                                            {fieldModel.icon}
                                        </Icon>
                                    )}
                                    {!fieldModel?.label || typeof fieldModel.label === "string" ? (
                                        <span className="text-t2 text-sm">{fieldModel?.label ?? key}</span>
                                    ) : (
                                        fieldModel?.label
                                    )}
                                </div>
                            </td>
                            <td className="py-1">
                                {isObj ? (
                                    <Summary
                                        prefix={`${prefix || ""}${key}.`}
                                        values={value}
                                        style={{ marginLeft: 16 }}
                                        className={clsx(nestedMargin === undefined && "ml-4")}
                                    />
                                ) : (
                                    <div className="flex">
                                        <div className="grow min-w-0">
                                            {strValue !== undefined ? (
                                                <span className="text-sm">
                                                    {value == null ? (
                                                        <i className="text-t3">{emptyPlaceholder}</i>
                                                    ) : (
                                                        strValue
                                                    )}
                                                </span>
                                            ) : (
                                                renderedValue
                                            )}
                                        </div>
                                        {fieldModel?.canCopy && (
                                            <CopyIconButton
                                                size="sm"
                                                className="ml-2"
                                                textToCopy={String(value)}
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
