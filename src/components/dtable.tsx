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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.js";
import { useMemo, type ComponentProps, type ReactNode } from "react";
import { Empty, EmptyHeader, EmptyDescription } from "@/components/ui/empty.js";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner.js";

const defaultFeatures = tableFeatures({});

export interface DTableProps<
    TData extends RowData,
    TFeatures extends TableFeatures = TableFeatures,
> extends ComponentProps<"div"> {
    columns: ColumnDef<TFeatures, TData, any>[];
    /**
     * The data to be displayed in the table.
     * If undefined, the table will show a loading state.
     * If an empty array, it will show an empty state.
     */
    data: TData[] | undefined;
    features?: TableFeatures;
    options?: TableOptions<TFeatures, TData>;
    selector?: (state: TableState<TFeatures>) => TableState<TFeatures>;
    /** Error content to be displayed in the table. */
    error?: ReactNode;
    /** Empty state content to be displayed when there is no data. */
    empty?: ReactNode;
    /** Loading state content to be displayed when data is undefined. */
    loading?: ReactNode;
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
    loading,
    ...props
}: DTableProps<TData, TFeatures>) {
    const dataList = useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);
    const table = useTable<TFeatures, TData>(
        {
            features: features || defaultFeatures,
            columns,
            data: dataList,
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
                    ) : rowModel.rows.length ? (
                        rowModel.rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getAllCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <table.FlexRender cell={cell} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data ? (
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
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {loading || (
                                    <Empty>
                                        <Spinner className="size-8" />
                                    </Empty>
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
