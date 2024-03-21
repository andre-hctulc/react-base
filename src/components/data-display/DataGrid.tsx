"use client";

import clsx from "clsx";
import React from "react";
import XIcon from "../icons/collection/X";
import IconButton from "../buttons/IconButton";
import Pagination from "../navigation/Pagination";
import { useDev } from "../../providers/DevProvider";
import Typography from "../text/Typography";
import Loading from "../feedback/Loading";
import Placeholder from "../feedback/Placeholder";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

export type CellChangeListener<M = any> = (rowParams: GridRowParams<M>, data: any) => void;

interface DataGridContext<D = undefined, M = any> {
    changeCell: (rowParams: GridRowParams<M>, colKey: string, data?: any) => void;
    addCellChangeListener: (
        cellKey: string,
        listener: (rowParams: GridRowParams<M>, data: any) => void
    ) => void;
    removeCellChangeListener: (cellKey: string, listener: CellChangeListener<M>) => void;
    data: D;
    editable: boolean;
}

const DataGridContext = React.createContext<DataGridContext | null>(null);

export function useDataGrid<D = undefined, M = any>() {
    const ctx = React.useContext<DataGridContext<D, M> | null>(DataGridContext as any);
    return ctx;
}

export type DataGridColDef<M extends object, K extends string = string> = {
    grow?: number;
    shrink?: number;
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    render?: (data: { value: K extends keyof M ? M[K] : undefined } & GridRowParams<M>) => React.ReactNode;
    key: K;
    heading: React.ReactNode;
    className?: string;
    headerCellClassName?: string;
    cellClassName?: string;
    cellStyle?: React.CSSProperties;
    center?: boolean;
    stickyRight?: boolean;
    stickyLeft?: boolean;
    onCellClick?: (params: GridRowParams<M>) => void;
};

export type GridRowParams<M> = { row: M; rowId: string };

export interface DataGridProps<M extends object> extends StyleProps {
    // * Zellen
    cols: DataGridColDef<M>[];
    /** Spalten, die ausgeschlossen werden sollen. */
    skipCols?: (keyof M)[];
    /** Spalten, die ausgeschlossen werden sollen. */
    pickCols?: (keyof M)[];
    /**
     * Wird hier eine _Row_ zurückgegeben, triggert dies für diese Zeile ein `onRowChange` mit den neuen Daten.
     */
    onCellChange?: (row: GridRowParams<M>, colKey: string, data: any) => void | M;
    // * Rows
    rows: M[];
    canSelectRow?: (rowParams: GridRowParams<M>) => boolean;
    canDeleteRow?: (rowParams: GridRowParams<M>) => boolean;
    onSelectedRowsChange?: (selectedRows: M[]) => void;
    onRowClick?: (rowParams: GridRowParams<M>) => void;
    onRowChange?: (rowParams: GridRowParams<M>) => void;
    onDeleteRows?: (rowParams: GridRowParams<M>[]) => void;
    noHeaderRow?: boolean;
    /** @defaul 32 */
    rowHeight?: number;
    /** @defaul 32 */
    headerRowHeight?: number;
    rowId: (row: M) => string;
    noRowDividers?: boolean;
    /** Diese Daten werden im `DataGridContext` bereitgestellt */
    contextData?: any;
    pagination?: { max: number; searchParam?: string; onPageChange?: () => void };
    // Auto Zellen ---
    deletable?: boolean;
    selectable?: boolean;
    // Editierbar?
    editable?: boolean;
    // Sonstiges --
    loading?: boolean;
    slots?: { loading?: React.ReactNode; empty?: React.ReactNode; deleteIcon?: React.ReactElement };
    debug?: boolean;
    /** Verhindert divider für die letzte Zeile */
    autoHeight?: boolean;
    /**
     * Steuert, ob der _Alle Ausgewählten löschen_ `IconButton` angezeigt wird
     * @default true
     * */
    deleteAllSelected?: boolean;
    /**
     * Steuert, ob der _Alle auswählen_ `IconButton` angezeigt wird
     * @default true
     * */
    selectAll?: boolean;
}

function getColStyle(col: DataGridColDef<any>): React.CSSProperties {
    return {
        maxWidth: col.maxWidth,
        width: col.width,
        flexGrow: col.grow,
        flexShrink: col.shrink,
        minWidth: col.minWidth,
    };
}

const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps<any>>((props, ref) => {
    const { devMode } = useDev();
    const rowId = (row: GridRowParams<any>) => props.rowId(row);
    const cellChangeListeners = React.useRef<Map<string, Set<CellChangeListener>>>(new Map());
    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedRowsSet = React.useMemo<Set<string>>(
        () => new Set(selectedRows.map((row) => rowId(row))),
        [selectedRows]
    );
    const selectedRowsInited = React.useRef(false);
    const allChecked = React.useMemo(
        () => selectedRows.length === props.rows.length,
        [selectedRows.length, props.rows.length]
    );
    const canSelectSomeRow = React.useMemo(
        () => props.rows.some((row) => !props.canSelectRow || props.canSelectRow({ row, rowId: rowId(row) })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.rows, props.canSelectRow]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const canDeleteSomeRow = React.useMemo(
        () => props.rows.some((row) => !props.canDeleteRow || props.canDeleteRow({ row, rowId: rowId(row) })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.rows, props.canDeleteRow]
    );
    const cols = React.useMemo<DataGridColDef<any>[]>(() => {
        // given cols
        let cols: DataGridColDef<any>[] = props.cols;

        // filter given cols
        if (props.skipCols || props.pickCols) {
            const skipSet = new Set(props.skipCols || []);
            const pickSet = new Set(props.pickCols || []);
            cols = cols.filter(
                (col) => !skipSet.has(col.key as any) && (!props.pickCols || pickSet.has(col.key))
            );
        }

        // select col
        if (props.selectable)
            cols = [
                {
                    width: 50,
                    minWidth: 50,
                    shrink: 0,
                    center: true,
                    stickyLeft: true,
                    render: (row) => (
                        <input
                            type="checkbox"
                            disabled={props.canSelectRow && !props.canSelectRow(row)}
                            checked={selectedRowsSet.has(row.rowId)}
                            onChange={() => toggleSelectedRow(row.row)}
                        />
                    ),
                    key: "__select",
                    heading:
                        props.selectAll === false ? undefined : (
                            <input
                                disabled={!canSelectSomeRow}
                                type="checkbox"
                                className="mx-auto"
                                checked={allChecked}
                                onChange={(e) => {
                                    if (e.currentTarget.checked) setSelectedRows(props.rows);
                                    else setSelectedRows([]);
                                }}
                            />
                        ),
                },
                ...cols,
            ];

        // delete col
        if (props.deletable)
            cols.push({
                width: 35,
                minWidth: 35,
                shrink: 0,
                stickyRight: true,
                cellClassName: "flex-col justify-center flex",
                render: (row) => (
                    <IconButton
                        disabled={props.canDeleteRow && !props.canDeleteRow(row)}
                        size="small"
                        onClick={() => {
                            props.onDeleteRows?.([row]);
                        }}
                    >
                        {props.slots?.deleteIcon || <XIcon />}
                    </IconButton>
                ),
                key: "__delete",
                heading:
                    props.deleteAllSelected === false ? undefined : (
                        <IconButton
                            className="mx-auto"
                            disabled={!canDeleteSomeRow || !selectedRows.length}
                            size="small"
                            onClick={() => {
                                props.onDeleteRows?.(selectedRows);
                            }}
                        >
                            {props.slots?.deleteIcon || <XIcon />}
                        </IconButton>
                    ),
            });

        return cols;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cols, props.selectable, props.canSelectRow, selectedRowsSet]);
    const debug = devMode && props.debug;
    const isEmpty = !props.loading && !props.rows.length;

    React.useEffect(() => {
        if (!selectedRowsInited.current) selectedRowsInited.current = true;
        else props.onSelectedRowsChange?.(selectedRows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRows]);

    function toggleSelectedRow(row: any) {
        const rId = rowId(row);
        if (selectedRows.some((r) => rowId(r) === rId))
            setSelectedRows(selectedRows.filter((r) => rowId(r) !== rId));
        else setSelectedRows(selectedRows.concat(row));
    }

    function addCellChangeListener(colKey: string, listener: CellChangeListener) {
        const set = cellChangeListeners.current.get(colKey);
        if (!set) cellChangeListeners.current.set(colKey, new Set([listener]));
        else set.add(listener);
    }

    function removeCellChangeListener(colKey: string, listener: CellChangeListener) {
        const set = cellChangeListeners.current.get(colKey);
        set?.delete(listener);
    }

    function changeCell(row: GridRowParams<any>, colKey: string, data?: any) {
        const newRow = props.onCellChange?.(row, colKey, data);
        if (newRow) props.onRowChange?.({ row: newRow, rowId: row.rowId });
        const listeners = cellChangeListeners.current.get(colKey);
        listeners?.forEach((listener) => listener(row, data));
    }

    return (
        <DataGridContext.Provider
            value={{
                addCellChangeListener,
                editable: !!props.editable,
                removeCellChangeListener,
                changeCell,
                data: props.contextData,
            }}
        >
            <div
                ref={ref}
                {...styleProps(
                    { className: "flex flex-col border rounded min-w-0 min-h-0 overflow-hidden" },
                    props
                )}
            >
                {!props.loading && (
                    <div
                        style={{ flexGrow: isEmpty ? 0 : 1 }}
                        className="overflow-y-auto overflow-x-auto flex flex-row flex-grow min-w-0 max-w-full min-h-0"
                    >
                        {cols.map((col, i) => {
                            const isFirstCell = i === 0;
                            const cs = getColStyle(col);
                            const rowHeight = props.rowHeight || 32;
                            const headerRowHeight = props.headerRowHeight || 32;
                            const heightStyle: React.CSSProperties = {
                                height: rowHeight,
                                maxHeight: rowHeight,
                                minHeight: rowHeight,
                            };
                            const headerHeightStyle: React.CSSProperties = {
                                height: headerRowHeight,
                                maxHeight: headerRowHeight,
                                minHeight: headerRowHeight,
                            };

                            return (
                                <div
                                    key={col.key}
                                    className={clsx(
                                        "bg-bg flex flex-col box-border min-w-0",
                                        col.stickyRight && "right-0 sticky",
                                        col.stickyLeft && "left-0 sticky z-10",
                                        col.className,
                                        debug && "border border-common-red "
                                    )}
                                    style={cs}
                                >
                                    {/* Header Zelle */}
                                    {!props.noHeaderRow && (
                                        <div
                                            style={headerHeightStyle}
                                            className={clsx(
                                                "flex items-center top-0 sticky border-b shadow",
                                                !isFirstCell && "border-l",
                                                debug && "border border-common-green",
                                                col.headerCellClassName
                                            )}
                                        >
                                            {typeof col.heading === "string" ? (
                                                <Typography
                                                    truncate
                                                    tag="strong"
                                                    className="px-2 text-sm max-w-full"
                                                >
                                                    {col.heading}
                                                </Typography>
                                            ) : (
                                                col.heading
                                            )}
                                        </div>
                                    )}
                                    {/* Zellen */}
                                    {props.rows.map((row, i) => {
                                        const rowId = props.rowId(row);
                                        const value = (row as any)[col.key];
                                        const custom = col.render
                                            ? col.render({ value, row, rowId })
                                            : undefined;
                                        const isLastRow = i === props.rows.length - 1;

                                        return (
                                            <div
                                                className={clsx(
                                                    "flex items-center",
                                                    debug && "border border-common-blue",
                                                    !(props.autoHeight && isLastRow) &&
                                                        !props.noRowDividers &&
                                                        "border-b",
                                                    !isFirstCell && "border-l",
                                                    col.center && "justify-center",
                                                    (props.onRowClick || col.onCellClick) && "cursor-pointer",
                                                    col.onCellClick && "hover:underline",
                                                    col.cellClassName
                                                )}
                                                style={{ ...heightStyle, ...col.cellStyle }}
                                                key={rowId}
                                                onClick={() => {
                                                    props.onRowClick?.({ row, rowId });
                                                    col.onCellClick?.({ row, rowId });
                                                }}
                                            >
                                                {typeof custom === "string" || !custom ? (
                                                    <Typography
                                                        truncate
                                                        variant="body2"
                                                        className="px-1 max-w-full"
                                                    >
                                                        {col.render ? custom : value}
                                                    </Typography>
                                                ) : (
                                                    custom
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                )}
                {props.loading && (props.slots?.loading === undefined ? <Loading /> : props.slots.loading)}
                {isEmpty &&
                    (props.slots?.empty === undefined ? (
                        <Placeholder py>Keine Daten vorhanden</Placeholder>
                    ) : (
                        props.slots.empty
                    ))}
                {props.pagination && (
                    <Pagination
                        className="border-t px-2 !py-2"
                        searchParam={props.pagination.searchParam}
                        max={props.pagination.max}
                    ></Pagination>
                )}
            </div>
        </DataGridContext.Provider>
    );
});

DataGrid.displayName = "DataGrid";

export default DataGrid;
