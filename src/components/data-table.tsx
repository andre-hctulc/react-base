"use client";

import {
    type ColumnDef,
    type RowData,
    type TableFeatures,
    tableFeatures,
    useTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ComponentProps, ReactNode } from "react";
import { Empty, EmptyContent, EmptyDescription } from "@/components/ui/empty.js";
import { cn } from "@/lib/utils";

const defaultFeatures = tableFeatures({});

interface DataTableProps<TData extends RowData> extends ComponentProps<"div"> {
    columns: ColumnDef<TableFeatures, TData, any>[];
    data: TData[];
    empty?: ReactNode;
    features?: TableFeatures;
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    empty,
    features,
    className,
    ...props
}: DataTableProps<TData>) {
    const table = useTable({
        features: features || defaultFeatures,
        columns,
        data,
    });
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
                    {rowModel.rows?.length ? (
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
                            <TableCell colSpan={columns.length} className="flex items-center justify-center">
                                {typeof empty === "string" || !empty ? (
                                    <Empty>
                                        <EmptyContent>
                                            <EmptyDescription>
                                                {empty || "No data available"}
                                            </EmptyDescription>
                                        </EmptyContent>
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
