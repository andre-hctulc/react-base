import clsx from "clsx";
import React from "react";
import { useMapArray } from "../../hooks";
import { resolvePropertyPath, setPropertyByPath } from "../../util";
import { Spinner } from "./spinner";

const DEFAULT_CELL_WIDTH = 100;

export interface DataGridColDef<T> {
    label: string;
    /**
     * The key to access the data in the row object. Can be a nested key.
     *
     * Examples: `name`, `data.user.name`
     */
    key: string;
    sortable?: boolean;
    /**
     * @default 100
     */
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    renderValue?: (cellValue: any, col: DataGridColDef<T>, row: T) => React.ReactNode;
    className?: string;
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
}

export interface CellSnapshot {
    width?: number;
}

interface DataGridProps<T extends object> {
    className?: string;
    style?: React.CSSProperties;
    data: T[];
    loading?: boolean;
    Empty?: React.ReactNode;
    Loading?: React.ReactNode;
    cols: DataGridColDef<T>[];
    rowId: (row: T) => string;
    emptyText?: string;
    rowHeight?: number;
    actions?: any;
    onRowClick?: (row: T, e: React.MouseEvent<HTMLDivElement>) => void;
    onCellClick?: (row: T, col: DataGridColDef<T>, e: React.MouseEvent<HTMLDivElement>) => void;
}

export function DataGrid<T extends object>(props: DataGridProps<T>) {
    const empty = props.data.length === 0;
    const [cols, colsLeft, colsRight] = React.useMemo(() => {
        const cols: DataGridColDef<any>[] = [];
        const colsLeft: DataGridColDef<any>[] = [];
        const colsRight: DataGridColDef<any>[] = [];

        props.cols.forEach((col) => {
            cols.push(col);
            if (col.stickyLeft) colsLeft.push(col);
            if (col.stickyRight) colsRight.push(col);
        });

        return [cols, colsLeft, colsRight];
    }, []);
    // /**
    //  * Calc padding right to compensate absolute (sticky right) positioned columns.
    //  * This padding must be added as a right padding to the rows.
    //  */
    // const pr = React.useMemo(() => {
    //     return colsRight.reduce((acc, col) => acc + DataGrid.colWidth(col), 0);
    // }, [colsRight]);

    return (
        <div className={clsx("min-h-0 rounded-lg overflow-hidden", props.className)}>
            <div className="flex-grow overflow-x-auto relative" style={{}}>
                <div className="flex-shrink-0" style={{ width: "min-content" }}>
                    <HeaderRow {...props} />
                    {!props.loading && props.data.length > 0 && (
                        <>
                            {props.data.map((row) => (
                                <Row
                                    key={props.rowId(row)}
                                    row={row}
                                    cols={props.cols}
                                    hoverEffect
                                    onClick={props.onRowClick && ((e) => props.onRowClick?.(row, e))}
                                    onCellClick={
                                        props.onCellClick && ((col, e) => props.onCellClick?.(row, col, e))
                                    }
                                />
                            ))}
                        </>
                    )}
                </div>
                {(empty || props.loading) && (
                    <div className="left-0 sticky flex justify-center items-center py-10">
                        {!props.loading &&
                            props.data.length === 0 &&
                            (props.Empty || <p className="text-2">{props.emptyText || "No data found"}</p>)}
                        {props.loading && (props.Loading || <Spinner size="2xl" />)}
                    </div>
                )}
            </div>
            <Footer {...props} />
        </div>
    );
}

DataGrid.colWidth = (col: DataGridColDef<any>) => {
    let width = col.snapshot?.width || col.width || DEFAULT_CELL_WIDTH;
    if (col.maxWidth) width = Math.min(width, col.maxWidth);
    if (col.minWidth) width = Math.max(width, col.minWidth);
    return width;
};

const Footer: React.FC<DataGridProps<any>> = ({ cols }) => {
    return <div></div>;
};

const HeaderRow: React.FC<DataGridProps<any>> = ({ cols, rowHeight }) => {
    const headerCols = useMapArray(cols, (col, index, arr) => {
        return {
            ...col,
            className: clsx("!bg-elevated-2 border-t-0 font-bolder"),
            renderValue: undefined,
        };
    });
    const headerRow = React.useMemo(() => {
        const result: any = {};
        cols.forEach((col) => {
            setPropertyByPath(result, col.key, col.label);
        });
        return result;
    }, [cols]);

    return <Row className="!w-full flex rounded-t-lg" height={rowHeight} row={headerRow} cols={headerCols} />;
};

interface RowProps<T> {
    row: T;
    cols: DataGridColDef<T>[];
    className?: string;
    height?: number;
    hoverEffect?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onCellClick?: (col: DataGridColDef<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
}

const Row: React.FC<RowProps<any>> = ({ row, cols, className, hoverEffect, onClick, ...props }) => {
    return (
        <div
            className={clsx(
                "flex-shrink-0 flex relative",
                hoverEffect && "hover:bg-fill-2",
                onClick && "cursor-pointer",
                className
            )}
            style={props.style}
            onClick={onClick}
        >
            {cols.map((col) => (
                <Cell cols={cols} key={col.key} col={col} value={resolvePropertyPath(row, col.key)} />
            ))}
        </div>
    );
};

interface CellProps {
    cols: DataGridColDef<any>[];
    col: DataGridColDef<any>;
    value: any;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Cell: React.FC<CellProps> = ({ value, col, onClick, cols, ...props }) => {
    const width = React.useMemo(() => DataGrid.colWidth(col), [col]);
    const renderer = col.renderValue || defaultValueRenderer;
    const stickyLeft = React.useMemo<number | undefined>(() => {
        if (!col.stickyLeft) return undefined;

        let left = 0;
        for (const c of cols) {
            if (c === col) break;
            left += DataGrid.colWidth(c);
        }
    }, [cols, col]);
    const stickyRight = React.useMemo<number | undefined>(() => {
        if (!col.stickyRight) return undefined;

        let right = 0;
        for (const c of cols) {
            if (c === col) break;
            right += DataGrid.colWidth(c) + 1; // +1 for border
        }
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
                "bg border-[0.5px] box-border overflow-hidden",
                (col.stickyLeft || col.stickyRight) && "z-10",
                col.stickyLeft && "sticky left-0 order-[-1]",
                col.stickyRight && "sticky right-0 order-[1]",
                col.className
            )}
            style={{ minWidth: width, maxWidth: width, left: stickyLeft, right: stickyRight }}
            onClick={onClick}
        >
            {renderer(value, col, {})}
        </div>
    );
};

const defaultValueRenderer = (value: any, col: DataGridColDef<any>, row: any) => {
    return <div className="mx-auto p-2 truncate text-center">{value != null ? value + "" : ""}</div>;
};
