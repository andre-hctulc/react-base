"use client";

import clsx from "clsx";
import React from "react";
import Label from "./Label";
import IconButton from "../buttons/IconButton";
import HelperText from "../text/HelperText";
import { useFormInput } from "./JSForm";
import { getEventValue, type InputLikeProps } from "./Input";
import type { PropsOf, StyleProps } from "../../types";
import DataGrid, { DataGridColDef } from "../data-display/DataGrid";
import PlusIcon from "../icons/collection/Plus";
import XIcon from "../icons/collection/X";
import { styleProps } from "../../util";

export type InputListColDef<T extends object> = Omit<DataGridColDef<T>, "render"> & {
    required?: boolean;
    input: React.ReactElement<
        Pick<InputLikeProps, "value" | "onChange" | "noBorder" | "readOnly"> & { className?: string }
    >;
};

interface InputListProps<T extends object> extends StyleProps, InputLikeProps<T[]> {
    onChange?: (value: T[]) => void;
    addListener?: string;
    addButtonText?: string;
    cols: InputListColDef<T>[];
    rowId: (value: T) => string;
    slotProps?: {
        dataGrid?: Omit<PropsOf<typeof DataGrid>, "rows">;
        addDataGrid?: Omit<PropsOf<typeof DataGrid>, "rows">;
    };
    validateRow?: (row: Partial<T>) => boolean;
    autoHeight?: boolean;
    defaultRow: T;
}

const addColAndRemoveColWidth = 43;

export default function InputList<T extends object = any>(props: InputListProps<T>) {
    const { error, readOnly } = useFormInput(props, null);
    const [value, setValue] = React.useState<T[]>(props.defaultValue || []);
    const [currentRow, setCurrentRow] = React.useState<Partial<T>>(props.defaultRow);
    const currentRowIsValid = React.useMemo(() => {
        return props.validateRow ? props.validateRow(currentRow as T) : true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRow]);
    const cols = React.useMemo<DataGridColDef<any>[]>(() => {
        const removeItem = (row: T) => {
            const removeRowId = props.rowId(row);
            setValue(value.filter((r) => props.rowId(r) !== removeRowId));
        };
        const onChange = (key: string, newValue: any) => {
            editCurrentRow(key, newValue);
        };

        const endCol: DataGridColDef<any> = {
            heading: "",
            key: "__action",
            minWidth: addColAndRemoveColWidth,
            center: true,
            render: ({ row }) => {
                if (row === currentRow) {
                    return (
                        <IconButton
                            size="small"
                            disabled={!currentRowIsValid}
                            onClick={() => addRow(currentRow as T)}
                            className="self-center"
                        >
                            <PlusIcon />
                        </IconButton>
                    );
                } else {
                    return (
                        <IconButton className="self-center" size="small" onClick={() => removeItem(row)}>
                            <XIcon />
                        </IconButton>
                    );
                }
            },
        };

        const c: DataGridColDef<any>[] = props.cols.map((col) => ({
            ...col,
            render: ({ row, value }) => {
                const editing = row === currentRow;

                return React.cloneElement(col.input, {
                    ...col.input.props,
                    onChange: (e: any) => {
                        const value = getEventValue(e);
                        col.input.props.onChange?.(e);
                        onChange(col.key, value as any);
                    },
                    className: clsx(col.input.props.className, "w-full max-h-full min-h-0 border-0"),
                    noBorder: true,
                    readOnly: !editing || readOnly,
                    value: value,
                });
            },
        }));

        return [...c, endCol];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cols, currentRowIsValid, currentRow, value, readOnly]);
    const rows: any[] = [...value, currentRow];

    function editCurrentRow(name: string, value: any) {
        const copy = { ...currentRow };
        (copy as any)[name] = value;
        setCurrentRow(copy);
    }

    async function addRow(row: T) {
        // valdiate row
        let validated = true;
        if (props.validateRow) validated = await props.validateRow(row);
        if (!validated) return;

        // add row
        const newRowId = props.rowId(row);
        const newRows = [...value.filter((r) => props.rowId(r) !== newRowId), row];

        setCurrentRow({ ...props.defaultRow });
        setValue(newRows);
    }

    return (
        <div {...styleProps({ className: "flex flex-col overflow-hidden" }, props)}>
            {props.label && (
                <Label error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            <DataGrid
                autoHeight={props.autoHeight}
                rowId={props.rowId}
                cols={cols as any}
                {...props.slotProps?.dataGrid}
                rows={rows}
                className={clsx("", props.slotProps?.dataGrid?.className)}
            />
            <HelperText error={error} errorMessage={props.errorMessage}>
                {props.helperText}
            </HelperText>
        </div>
    );
}
