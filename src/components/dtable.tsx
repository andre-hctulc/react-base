"use client";

import {
    type Column,
    type ColumnDef,
    type ReactTable,
    type RowData,
    type TableFeatures,
    tableFeatures,
    type TableOptions,
    type TableState,
    useTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.js";
import { useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { Empty, EmptyHeader, EmptyDescription } from "@/components/ui/empty.js";
import { cn } from "@/lib/utils.js";
import { Spinner } from "@/components/ui/spinner.js";
import { Button } from "@/components/ui/button.js";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.js";
import {
    ArrowDownIcon,
    ArrowUpDownIcon,
    ArrowUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LucideFilter,
} from "lucide-react";
import { FieldFilter, type FieldFilterValueType } from "./field-filter.js";
import { Toggle } from "@/components/ui/toggle.js";

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
    /** Page sizes offered by the pagination control. */
    pageSizeOptions?: number[];
}

type AnyTable = ReactTable<any, any, any>;
type AnyColumn = Column<any, any>;

interface DTableHeaderProps {
    table: AnyTable;
}

function DTableHeader({ table }: DTableHeaderProps) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const column: AnyColumn = header.column as AnyColumn;
                        const headerContent = <table.FlexRender header={header} />;
                        const canSort =
                            typeof header.column.columnDef.header === "string" && column.getCanSort?.();
                        const sortDirection = column.getIsSorted?.();

                        return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder ? null : canSort ? (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="-ml-3 w-fit"
                                        onClick={column.getToggleSortingHandler?.()}
                                    >
                                        {headerContent}
                                        {sortDirection === "asc" ? (
                                            <ArrowUpIcon aria-hidden="true" />
                                        ) : sortDirection === "desc" ? (
                                            <ArrowDownIcon aria-hidden="true" />
                                        ) : (
                                            <ArrowUpDownIcon aria-hidden="true" />
                                        )}
                                    </Button>
                                ) : (
                                    headerContent
                                )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeader>
    );
}

interface DTableFiltersProps {
    table: AnyTable;
}

function DTableFilters({ table }: DTableFiltersProps) {
    const [open, setOpen] = useState(false);

    const filterableColumns = (table.getVisibleLeafColumns?.() ?? []).filter((column) =>
        column.getCanFilter?.(),
    );

    if (!filterableColumns.length) {
        return null;
    }

    return (
        <div className="flex flex-row gap-3">
            <div className="flex flex-wrap justify-end gap-3 grow">
                {open &&
                    filterableColumns.map((column) => {
                        const label =
                            typeof column.columnDef.header === "string" ? column.columnDef.header : column.id;
                        const filterMode = ((
                            column.columnDef as { meta?: { filterMode?: "simple" | "advanced" } }
                        ).meta?.filterMode ?? "simple") as "simple" | "advanced";
                        const filterValue = column.getFilterValue?.();
                        const filterState: { type: FieldFilterValueType; value: string } =
                            typeof filterValue === "object" && filterValue !== null && "type" in filterValue
                                ? {
                                      type: ((filterValue as { type?: string }).type ??
                                          "string") as FieldFilterValueType,
                                      value: String((filterValue as { value?: string }).value ?? ""),
                                  }
                                : {
                                      type: "string",
                                      value: filterValue == null ? "" : String(filterValue),
                                  };

                        return (
                            <FieldFilter
                                key={column.id}
                                label={label}
                                type={filterState.type}
                                value={filterState.value}
                                showTypeSelector={filterMode === "advanced"}
                                onTypeChange={(nextType: string) =>
                                    column.setFilterValue?.({
                                        type: nextType as FieldFilterValueType,
                                        value: filterState.value,
                                    })
                                }
                                onValueChange={(nextValue: string) =>
                                    column.setFilterValue?.({
                                        type: filterState.type,
                                        value: nextValue,
                                    })
                                }
                            />
                        );
                    })}
            </div>
            <div>
                <Toggle size="sm" pressed={open} onPressedChange={setOpen} variant="outline">
                    <LucideFilter className="group-aria-pressed/toggle:fill-foreground" />
                </Toggle>
            </div>
        </div>
    );
}

interface DTableFooterProps {
    table: AnyTable;
    dataLength: number;
    manualPagination?: boolean;
    pageSizeOptions: number[];
}

function DTableFooter({ table, dataLength, manualPagination, pageSizeOptions }: DTableFooterProps) {
    const pagination = table.state.pagination;
    const hasPagination = !!pagination && !!table.previousPage && !!table.nextPage;

    if (!hasPagination) {
        return null;
    }

    const pageCount = table.getPageCount?.();
    const canGoPrevious = table.getCanPreviousPage?.() ?? false;
    const canGoNext =
        (table.getCanNextPage?.() ?? false) && (!manualPagination || dataLength >= pagination.pageSize);

    return (
        <div className="flex flex-wrap items-center justify-end gap-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Rows per page
                <NativeSelect
                    size="sm"
                    value={String(pagination.pageSize)}
                    onChange={(event) => table.setPageSize?.(Number(event.target.value))}
                >
                    {pageSizeOptions.map((pageSize) => (
                        <NativeSelectOption key={pageSize} value={pageSize}>
                            {pageSize}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
            </label>
            <span className="min-w-20 text-center text-sm text-muted-foreground">
                Page {pagination.pageIndex + 1}
                {pageCount !== undefined && pageCount > 0 ? ` of ${pageCount}` : ""}
            </span>
            <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                title="Previous page"
                disabled={!canGoPrevious}
                onClick={() => table.previousPage?.()}
            >
                <ChevronLeftIcon aria-hidden="true" />
            </Button>
            <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                title="Next page"
                disabled={!canGoNext}
                onClick={() => table.nextPage?.()}
            >
                <ChevronRightIcon aria-hidden="true" />
            </Button>
        </div>
    );
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
    pageSizeOptions = [10, 20, 50],
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
    const interactiveTable = table as unknown as AnyTable;
    const manualPagination = (table.options as { manualPagination?: boolean }).manualPagination;

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <DTableFilters table={interactiveTable} />
            <div className="overflow-hidden rounded border">
                <Table>
                    <DTableHeader table={interactiveTable} />
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
            <DTableFooter
                table={interactiveTable}
                dataLength={dataList.length}
                manualPagination={manualPagination}
                pageSizeOptions={pageSizeOptions}
            />
        </div>
    );
}
