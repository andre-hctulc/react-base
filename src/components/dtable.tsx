"use client";

import {
    type ColumnDef,
    type RowData,
    type TableFeatures,
    tableFeatures,
    type TableOptions,
    type TableState,
    useTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ComponentProps, ReactNode } from "react";
import { Empty, EmptyHeader, EmptyDescription } from "@/components/ui/empty.js";
import { cn } from "@/lib/utils";

const defaultFeatures = tableFeatures({});

export interface DTableProps<
    TData extends RowData,
    TFeatures extends TableFeatures = TableFeatures,
> extends ComponentProps<"div"> {
    columns: ColumnDef<TFeatures, TData, any>[];
    data: TData[];
    empty?: ReactNode;
    features?: TableFeatures;
    options?: TableOptions<TFeatures, TData>;
    selector?: (state: TableState<TFeatures>) => TableState<TFeatures>;
    error?: ReactNode;
}

export function DTable<TData extends RowData, TFeatures extends TableFeatures = TableFeatures>({
    columns,
    data,
    empty,
    features,
    className,
    options,
    selector,
    error,
    ...props
}: DTableProps<TData, TFeatures>) {
    const table = useTable<TFeatures, TData>(
        {
            features: features || defaultFeatures,
            columns,
            data,
            ...options,
        } as TableOptions<TFeatures, TData>,
        selector,
    );
    const rowModel = table.getRowModel();

    return (
        <div className={cn("overflow-hidden rounded border", className)} {...props}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {error ? (
                        <TableRow>
                            <TableCell colSpan={columns.length}>{error}</TableCell>
                        </TableRow>
                    ) : rowModel.rows?.length ? (
                        rowModel.rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getAllCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <table.FlexRender cell={cell} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {typeof empty === "string" || !empty ? (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyDescription>
                                                {empty || "No data available"}
                                            </EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                ) : (
                                    empty
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
