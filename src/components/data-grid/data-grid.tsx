import clsx from "clsx";
import React from "react";
import { useMapArray } from "../../hooks";
import { resolvePropertyPath, setPropertyByPath } from "../../util";
import { Spinner } from "../data-display/spinner";
import { usePersistentState } from "../../hooks/others/use-persistent";
import { HideCols } from "./hide-cols";
import { RowActions } from "./row-actions";
import { Checkbox } from "../input/checkbox";
import { withPrefix } from "../../util/system";
import { Placeholder } from "../data-display/placeholder";

const DEFAULT_CELL_WIDTH = 100;

type CellRender<T extends object = any> = (cellValue: any, row: T, col: DataGridColDef<T>) => React.ReactNode;

export interface DataGridColDef<T extends object = any> {
    /**
     * Header label
     */
    label: React.ReactNode;
    /**
     * The key to access the data in the row object. Can be a nested key.
     *
     * Examples: `name`, `data.user.name`
     */
    key: string;
    /**
     * @default true
     */
    hidable?: boolean;
    sortable?: boolean;
    /**
     * @default 100
     */
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    renderValue?: CellRender<T>;
    className?: string;
    /**
     * Creates flex cells with centered alignment.
     */
    alignCenter?: boolean;
    /**
     * Current custom state of the column.
     */
    snapshot?: CellSnapshot;
    /**
     * Additional data attached to the column.
     */
    data?: any;
    stickyLeft?: boolean;
    stickyRight?: boolean;
    headerCellClassName?: string;
}

export interface CellSnapshot {
    width?: number;
}

interface DataGridProps<T extends object> {
    className?: string;
    style?: React.CSSProperties;
    rows: T[];
    loading?: boolean;
    cols: DataGridColDef<T>[];
    rowId: (row: T) => string;
    onRowClick?: (row: T, e: React.MouseEvent<HTMLDivElement>) => void;
    onCellClick?: (row: T, col: DataGridColDef<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    onSelectionChange?: (rows: T[]) => void;
    components?: {
        colsIcon?: React.ReactNode;
        moreIcon?: React.ReactNode;
        hideIcon?: React.ReactNode;
        showIcon?: React.ReactNode;
        empty?: React.ReactNode;
        loading?: React.ReactNode;
    };
    renderActions?: (row: T) => React.ReactNode;
    actionsCol?: boolean;
    defaultHideCols?: string[];
    selectable?: boolean;
    /**
     * Whether to show the select all checkbox when `selectable` is true.
     * @default true
     */
    selectAll?: boolean;
    /**
     * The storage to store data grid state. Defaults to memory storage.
     */
    storage?: {
        /**
         * @default
         * usePersistentState.memoryStorage
         */
        engine?: Storage;
        /**
         * @default
         * React.useId()
         */
        id?: string;
    };
}

/**
 * ### Caveats
 * - fixed column widths
 */
export const DataGrid = <T extends object>(props: DataGridProps<T>) => {
    const getRowId = props.rowId;
    const ranId = React.useId();
    const id = props.storage?.id ?? ranId;
    const [selection, setSelection] = React.useState<T[]>([]);
    const selectionSet = React.useMemo(() => new Set(selection.map((row) => getRowId(row))), [selection]);
    const [hiddenCols, setHiddenCols] = usePersistentState(
        withPrefix("data-grid-hide-cols_") + id,
        props.defaultHideCols || [],
        props.storage?.engine || usePersistentState.memoryStorage
    );
    const len = props.rows.length;
    const empty = len === 0;

    const cols = React.useMemo(() => {
        const c = [...props.cols];

        // Add actions col
        if (props.actionsCol) {
            c.push({
                label: (
                    <HideCols
                        cols={c}
                        hiddenCols={hiddenCols}
                        colsIcon={props.components?.colsIcon}
                        hideIcon={props.components?.hideIcon}
                        showIcon={props.components?.showIcon}
                        onChange={(colKey) => {
                            if (hiddenCols.includes(colKey)) {
                                setHiddenCols([...hiddenCols, colKey]);
                            } else {
                                setHiddenCols(hiddenCols.filter((key) => key !== colKey));
                            }
                        }}
                    />
                ),
                renderValue: (cell, row, col) => (
                    <RowActions
                        moreIcon={props.components?.moreIcon}
                        render={props.renderActions}
                        row={row}
                    />
                ),
                key: "$actions$",
                width: 50,
                className: "flex justify-center items-center",
                headerCellClassName: "flex justify-center items-center",
                stickyRight: true,
                hidable: false,
            });
        }

        // Add selectable col
        if (props.selectable) {
            c.unshift({
                label:
                    props.selectAll === false ? (
                        ""
                    ) : (
                        <Checkbox
                            size="sm"
                            value={selection.length === len}
                            onChange={(checked) => {
                                if (checked) setSelection(props.rows);
                                else setSelection([]);
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ),
                key: "$select$",
                width: 50,
                hidable: false,
                className: "flex justify-center items-center",
                headerCellClassName: "flex justify-center items-center",
                renderValue: (value, row, col) => (
                    <Checkbox
                        size="sm"
                        value={selectionSet.has(getRowId(row))}
                        onChange={(checked) => {
                            setSelection((prev) => {
                                if (checked) return [...prev, row];
                                else return prev.filter((r) => getRowId(r) !== getRowId(row));
                            });
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                ),
                stickyLeft: true,
            });
        }

        const hideSet = new Set(hiddenCols);

        return c.filter((col) => !hideSet.has(col.key));
    }, [
        props.cols,
        hiddenCols,
        props.actionsCol,
        props.selectable,
        props.selectAll,
        selectionSet,
        props.rows,
    ]);

    return (
        <div className={clsx("min-h-0 overflow-hidden", props.className)}>
            <div className="flex-grow overflow-x-auto relative flex flex-col" style={{}}>
                <div className="flex-shrink-0" style={{ minWidth: "min-content" }}>
                    <HeaderRow cols={cols} />
                    {!props.loading &&
                        len > 0 &&
                        props.rows.map((row) => (
                            <Row
                                selected={selectionSet.has(getRowId(row))}
                                key={props.rowId(row)}
                                row={row}
                                cols={cols}
                                hoverEffect
                                onClick={props.onRowClick && ((e) => props.onRowClick?.(row, e))}
                                onCellClick={
                                    props.onCellClick && ((col, e) => props.onCellClick?.(row, col, e))
                                }
                            />
                        ))}
                </div>
                {(empty || props.loading) && (
                    <Placeholder className="left-0">
                        {!props.loading
                            ? empty && (props.components?.empty || "No data found")
                            : props.components?.loading || <Spinner size="2xl" />}
                    </Placeholder>
                )}
            </div>
            <Footer {...props} />
        </div>
    );
};

DataGrid.colWidth = (col: DataGridColDef<any>) => {
    let width = col.snapshot?.width || col.width || DEFAULT_CELL_WIDTH;
    if (col.maxWidth) width = Math.min(width, col.maxWidth);
    if (col.minWidth) width = Math.max(width, col.minWidth);
    return width;
};

const Footer: React.FC<DataGridProps<any>> = ({ cols }) => {
    return <div></div>;
};

interface HeaderRowProps {
    cols: DataGridColDef<any>[];
}

const HeaderRow: React.FC<HeaderRowProps> = ({ cols }) => {
    const headerCols = useMapArray(cols, (col, index, arr) => {
        return {
            ...col,
            className: clsx("text-sm text-3", col.headerCellClassName),
            // Use label as renderValue when its nt a string, otherwise set renderValue to undefined
            renderValue:
                typeof col.label === "string"
                    ? () => <div className="py-2 truncate font-light">{col.label}</div>
                    : () => col.label,
        };
    });
    const headerRow = React.useMemo(() => {
        const result: any = {};
        cols.forEach((col) => {
            setPropertyByPath(result, col.key, col.label);
        });
        return result;
    }, [cols]);

    return <Row className="!w-full flex rounded-t-lg !border-b" row={headerRow} cols={headerCols} />;
};

interface RowProps<T extends object> {
    row: T;
    cols: DataGridColDef<T>[];
    className?: string;
    height?: number;
    hoverEffect?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onCellClick?: (col: DataGridColDef<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
    selected?: boolean;
}

const Row: React.FC<RowProps<any>> = ({ row, cols, className, hoverEffect, onClick, ...props }) => {
    return (
        <div
            className={clsx(
                "flex-shrink-0 flex relative border-b-[0.5px]",
                hoverEffect && "hover:bg-primary/5",
                onClick && "cursor-pointer",
                props.selected && "bg-primary/10",
                className
            )}
            style={props.style}
            onClick={onClick}
        >
            {cols.map((col) => (
                <Cell
                    cols={cols}
                    row={row}
                    key={col.key}
                    col={col}
                    value={resolvePropertyPath(row, col.key)}
                />
            ))}
        </div>
    );
};

interface CellProps {
    cols: DataGridColDef<any>[];
    col: DataGridColDef<any>;
    value: any;
    row: any;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Cell: React.FC<CellProps> = ({ value, col, onClick, cols, row, ...props }) => {
    const width = React.useMemo(() => DataGrid.colWidth(col), [col]);
    const renderer = col.renderValue || defaultValueRenderer;
    const stickyLeft = React.useMemo<number | undefined>(() => {
        if (!col.stickyLeft) return undefined;

        let left = 0;
        for (const c of cols) {
            if (c === col) break;
            if (c.stickyLeft) left += DataGrid.colWidth(c);
        }

        return left;
    }, [cols, col]);
    const stickyRight = React.useMemo<number | undefined>(() => {
        if (!col.stickyRight) return undefined;

        let right = 0;

        for (const c of cols.reverse()) {
            if (c === col) break;
            if (c.stickyRight) right += DataGrid.colWidth(c) + 1;
        }

        return right;
    }, [cols, col]);

    /* 
    NOTE **sticky**
    Sticky will only grasp when the element hits the edge on mount.
    Therefore we use order to make sure the sticky elements are always on the correct edge.
    For stickyLeft we set left 0 and order -1, for stickyRight we set right 0 and order 1.
    The default order is 0.
    */

    return (
        <div
            className={clsx(
                "box-border overflow-hidden px-1",
                (col.stickyLeft || col.stickyRight) && "z-10",
                col.stickyLeft && "sticky left-0 order-[-1]",
                col.stickyRight && "sticky right-0 order-[1] ml-auto",
                col.alignCenter && "flex items-center",
                col.className
            )}
            style={{ minWidth: width, maxWidth: width, left: stickyLeft, right: stickyRight }}
            onClick={onClick}
        >
            {renderer(value, row, col)}
        </div>
    );
};

const defaultValueRenderer: CellRender = (value: any, row: any, col: DataGridColDef<any>) => {
    return <div className="py-2 truncate font-light">{value != null ? value + "" : ""}</div>;
};
