"use client";

import clsx from "clsx";
import React from "react";
import { useMapArray, useWindowEvent } from "../../hooks";
import { resolvePropertyPath, setPropertyByPath } from "../../util";
import { Spinner } from "../data-display/spinner";
import { usePersistentState } from "../../hooks/others/use-persistent";
import { HideCols } from "./hide-cols";
import { RowActions } from "./row-actions";
import { Checkbox } from "../input/checkbox";
import { withPrefix } from "../../util/system";
import { Placeholder } from "../data-display/placeholder";

const DEFAULT_CELL_WIDTH = 100;

export type CellRenderer<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>
) => React.ReactNode;

export type CellStringify<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>
) => string;

export interface CellSnapshot {
    width?: number;
}

export type OnCellClick<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>,
    e: React.MouseEvent<HTMLDivElement>
) => void;

export type OnRowClick<T extends object = any> = (row: T, e: React.MouseEvent<HTMLDivElement>) => void;

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
    /**
     * Custom cell renderer.
     * @default CellText
     */
    render?: CellRenderer<T>;
    /**
     * Get the text value of the cell. By default null and undefined values are converted to empty string,
     * otherwise String() is used.
     */
    stringify?: CellStringify<T>;
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

interface DataGridProps<T extends object> {
    className?: string;
    style?: React.CSSProperties;
    rows: T[];
    loading?: boolean;
    cols: DataGridColDef<T>[];
    rowId: (row: T) => string;
    onRowClick?: OnRowClick<T>;
    onCellClick?: OnCellClick<T>;
    onSelectionChange?: (rows: T[]) => void;
    rowHeight?: number;
    headerRowHeight?: number;
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
    const [rightEnd, setRightEnd] = React.useState(true);
    const [leftEnd, setLeftEnd] = React.useState(true);
    const scrollXBox = React.useRef<HTMLDivElement>(null);
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
                render: (cell, row, col) => (
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
                            onChange={({ value }) => {
                                if (value) setSelection(props.rows);
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
                render: (value, row, col) => (
                    <Checkbox
                        size="sm"
                        value={selectionSet.has(getRowId(row))}
                        onChange={({ value }) => {
                            setSelection((prev) => {
                                if (value) return [...prev, row];
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
        props.renderActions,
    ]);

    const updateEnds = () => {
        if (!scrollXBox.current) return;

        const isScrollBox = scrollXBox.current.scrollWidth > scrollXBox.current.clientWidth;

        if (!isScrollBox) {
            setLeftEnd(true);
            setRightEnd(true);
            return;
        }

        const el = scrollXBox.current;
        const scrollLeft = el.scrollLeft;
        const scrollWidth = el.scrollWidth;
        const clientWidth = el.clientWidth;
        setLeftEnd(scrollLeft === 0);
        setRightEnd(scrollLeft + clientWidth === scrollWidth);
    };

    React.useEffect(() => {
        updateEnds();
    }, [props.cols, props.rows]);

    useWindowEvent("resize", () => {
        updateEnds();
    });

    return (
        <div className={clsx("flex flex-col relative overflow-y-auto", props.className)}>
            <div
                className="flex-grow overflow-x-auto relative flex flex-col"
                style={{}}
                ref={scrollXBox}
                onScroll={() => updateEnds()}
            >
                <div className="flex-shrink-0" style={{ minWidth: "min-content" }}>
                    <HeaderRow
                        leftEnd={leftEnd}
                        rightEnd={rightEnd}
                        cols={cols}
                        height={props.headerRowHeight}
                    />
                    {!props.loading &&
                        len > 0 &&
                        props.rows.map((row) => (
                            <Row
                                leftEnd={leftEnd}
                                rightEnd={rightEnd}
                                height={props.rowHeight}
                                selected={selectionSet.has(getRowId(row))}
                                key={props.rowId(row)}
                                row={row}
                                cols={cols}
                                hoverEffect
                                onClick={props.onRowClick}
                                onCellClick={props.onCellClick}
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
            <Footer />
        </div>
    );
};

DataGrid.colWidth = (col: DataGridColDef<any>) => {
    let width = col.snapshot?.width || col.width || DEFAULT_CELL_WIDTH;
    if (col.maxWidth) width = Math.min(width, col.maxWidth);
    if (col.minWidth) width = Math.max(width, col.minWidth);
    return width;
};

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return <div className={className}></div>;
};

interface HeaderRowProps {
    cols: DataGridColDef<any>[];
    height: number | undefined;
    rightEnd: boolean;
    leftEnd: boolean;
}

const HeaderRow: React.FC<HeaderRowProps> = ({ cols, height, rightEnd, leftEnd }) => {
    const headerCols = useMapArray<DataGridColDef, DataGridColDef>(cols, (col, index, arr) => {
        return {
            ...col,
            className: clsx("text-sm text-3", col.headerCellClassName),
            // Use label as renderValue when its nt a string, otherwise set renderValue to undefined
            render:
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

    return (
        <Row
            rightEnd={rightEnd}
            leftEnd={leftEnd}
            className="bg z-[2] !w-full flex rounded-t-lg !border-b top-0 sticky"
            row={headerRow}
            cols={headerCols}
            hoverEffect={false}
            selected={false}
            height={height}
        />
    );
};

interface RowProps<T extends object> extends CellStyleProps {
    row: T;
    cols: DataGridColDef<T>[];
    className?: string;
    hoverEffect: boolean;
    onClick?: OnRowClick<T>;
    onCellClick?: OnCellClick<T>;
    height: number | undefined;
}

const Row: React.FC<RowProps<any>> = ({
    row,
    cols,
    className,
    onCellClick,
    onClick,
    height,
    ...cellStyleProps
}) => {
    return (
        <div
            className={clsx(
                "group flex-shrink-0 flex relative border-b-[0.5px]",
                onClick && "cursor-pointer",
                className,
                // sometimes the cells do not cover the whole row,
                // so we need to defined selected and hover style also for the row
                cellStyleProps.hoverEffect && "hover:bg-primary/5",
                cellStyleProps.selected && "bg-primary/10"
            )}
            onClick={(e) => onClick?.(row, e)}
            style={{ height: height, maxHeight: height }}
        >
            {cols.map((col) => (
                <Cell
                    cols={cols}
                    row={row}
                    key={col.key}
                    col={col}
                    onClick={onCellClick}
                    value={resolvePropertyPath(row, col.key)}
                    {...cellStyleProps}
                />
            ))}
        </div>
    );
};

interface CellStyleProps {
    selected: boolean;
    hoverEffect: boolean;
    leftEnd: boolean;
    rightEnd: boolean;
}

interface CellProps extends CellStyleProps {
    cols: DataGridColDef<any>[];
    col: DataGridColDef<any>;
    value: any;
    row: any;
    onClick?: OnCellClick;
}

const Cell: React.FC<CellProps> = ({
    value,
    col,
    onClick,
    cols,
    row,
    selected,
    hoverEffect,
    leftEnd,
    rightEnd,
}) => {
    const width = React.useMemo(() => DataGrid.colWidth(col), [col]);
    const [stickyLeft, lastStickyLeft] = React.useMemo<[number | undefined, boolean]>(() => {
        if (!col.stickyLeft) return [undefined, false];

        let left = 0;
        let lastLeftCol: DataGridColDef | undefined;
        let addLeft = true;

        for (const c of cols) {
            if (c === col) {
                addLeft = false;
            }

            if (c.stickyLeft) {
                if (addLeft) left += DataGrid.colWidth(c);
                lastLeftCol = c;
            }
        }

        return [left, lastLeftCol === col];
    }, [cols, col]);
    const [stickyRight, firstStickyRight] = React.useMemo<[number | undefined, boolean]>(() => {
        if (!col.stickyRight) return [undefined, false];

        let right = 0;
        let addRight = true;
        let fistRightCol: DataGridColDef | undefined;

        for (const c of cols.reverse()) {
            if (c === col) {
                addRight = false;
            }

            if (c.stickyRight) {
                if (!fistRightCol) fistRightCol = c;
                if (addRight) right += DataGrid.colWidth(c) + 1;
            }
        }

        return [right, fistRightCol === col];
    }, [cols, col]);
    const sticky = col.stickyLeft || col.stickyRight;

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
                "bg transition-shadow",
                sticky && "z-[1]",
                col.stickyLeft && "sticky left-0 order-[-1]",
                col.stickyRight && "sticky right-0 order-[1] ml-auto",
                lastStickyLeft && !leftEnd && "shadow",
                firstStickyRight && !rightEnd && "shadow"
            )}
            style={{ minWidth: width, maxWidth: width, left: stickyLeft, right: stickyRight }}
            onClick={(e) => onClick?.(value, row, col, e)}
        >
            <div
                className={clsx(
                    "overflow-hidden px-1 w-full h-full box-border ",
                    hoverEffect && "group-hover:bg-primary/5",
                    selected && "bg-primary/10",
                    col.alignCenter && "flex items-center",
                    col.className
                )}
            >
                {col.render ? (
                    col.render(value, row, col)
                ) : (
                    <CellText>{col.stringify ? col.stringify(value, row, col) : value}</CellText>
                )}
            </div>
        </div>
    );
};

interface CellTextProps {
    children?: any;
    className?: string;
    style?: React.CSSProperties;
}

export const CellText: React.FC<CellTextProps> = ({ children, style, className }) => {
    return (
        <span
            className={clsx("inline-block py-2 truncate font-light align-middle max-w-full", className)}
            style={style}
        >
            {children === undefined ? "" : String(children)}
        </span>
    );
};
