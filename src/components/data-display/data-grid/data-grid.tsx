"use client";

import clsx from "clsx";
import { Spinner } from "../../data-display/spinner.js";
import { usePersistentState } from "../../../hooks/others/use-persistent-state.js";
import { DataGridSettings } from "./data-grid-settings.js";
import { DataGridActions } from "./data-grid-actions.js";
import { Checkbox } from "../../input/checkbox.js";
import { withPrefix } from "../../../util/system.js";
import { Placeholder } from "../../data-display/placeholder.js";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CellRenderer, DataGridColDef, OnCellClick, OnRowClick } from "./types.js";
import { DataGridHeaderRow } from "./data-grid-header-row.js";
import { DataGridRow } from "./data-grid-row.js";
import { DataGridFooter } from "./data-grid-footer.js";
import { useRefOf } from "../../../hooks/others/use-ref-of.js";
import { useWindowEvent } from "../../../hooks/document/use-window-event.js";

export interface DataGridProps<T extends object> {
    className?: string;
    style?: React.CSSProperties;
    rows: T[];
    loading?: boolean;
    cols: DataGridColDef<T>[];
    rowId: (row: T) => string;
    onRowClick?: OnRowClick<T>;
    onCellClick?: OnCellClick<T>;
    onSelectionChange?: (rows: T[]) => void;
    /**
     * @default 40
     */
    rowHeight?: number;
    headerRowHeight?: number;
    components?: {
        settingsIcon?: React.ReactNode;
        moreIcon?: React.ReactNode;
        empty?: React.ReactNode;
        loading?: React.ReactNode;
    };
    /**
     * Renders an action cell for each row that opens a popover with this content.
     *
     * Use {@link rowActionCell} to render a custom action cell.
     */
    rowActionCellPopover?: (row: T) => React.ReactNode;
    /**
     * Custom row action cell.
     *
     * Use {@link rowActionCellPopover} to render a default action cell.
     */
    rowActionCell?: CellRenderer<T>;
    /**
     * Show settings column?
     * @default true
     */
    settings?: boolean;
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
    /**
     * Base column definition. All column definitions will be merged with this.
     */
    baseColDef?: Partial<DataGridColDef<T>>;
}

export const DataGrid = <T extends object>(props: DataGridProps<T>) => {
    const getRowId = useRefOf(props.rowId);
    const ranId = useId();
    const id = props.storage?.id ?? ranId;
    const [selection, setSelection] = useState<T[]>([]);
    const selectionSet = useMemo(() => new Set(selection.map(row => getRowId.current(row))), [selection]);
    const [hiddenCols, setHiddenCols] = usePersistentState(
        withPrefix("data-grid-hide-cols_") + id,
        props.defaultHideCols || [],
        props.storage?.engine || usePersistentState.memoryStorage
    );
    const len = props.rows.length;
    const empty = len === 0;
    const [rightEnd, setRightEnd] = useState(true);
    const [leftEnd, setLeftEnd] = useState(true);
    const scrollXBox = useRef<HTMLDivElement>(null);

    const cols = useMemo(() => {
        const c = [...props.cols];
        const settingsEnabled = props.settings !== false;

        // Add actions col
        if (props.rowActionCellPopover || props.rowActionCell || settingsEnabled) {
            c.push({
                hidable: false,
                label: settingsEnabled && (
                    <DataGridSettings cols={c} hiddenCols={hiddenCols} icon={props.components?.settingsIcon} onChange={hiddenCols => setHiddenCols(hiddenCols)} />
                ),
                render:
                    props.rowActionCell ||
                    ((cell, row, col) =>
                        props.rowActionCellPopover && <DataGridActions moreIcon={props.components?.moreIcon} render={props.rowActionCellPopover} row={row} />),
                path: "$actions$",
                width: 50,
                className: "flex justify-center items-center",
                headerCellClassName: "flex justify-center items-center",
                stickyRight: true,
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
                                const newSelection = value ? props.rows : [];
                                setSelection(newSelection);
                                props.onSelectionChange?.(newSelection);
                            }}
                            onClick={e => e.stopPropagation()}
                        />
                    ),
                path: "$select$",
                width: 50,
                hidable: false,
                className: "flex justify-center items-center",
                headerCellClassName: "flex justify-center items-center",
                render: (value, row, col) => (
                    <Checkbox
                        size="sm"
                        value={selectionSet.has(getRowId.current(row))}
                        onChange={({ value }) => {
                            const rowId = getRowId.current(row);
                            const newSelection = value ? [...selection, row] : selection.filter(r => getRowId.current(r) !== rowId);
                            setSelection(newSelection);
                            props.onSelectionChange?.(newSelection);
                        }}
                        onClick={e => e.stopPropagation()}
                    />
                ),
                stickyLeft: true,
            });
        }

        const hideSet = new Set(hiddenCols);

        return c
            .filter(col => !hideSet.has(col.path))
            .map(col => {
                return {
                    ...props.baseColDef,
                    ...col,
                };
            });
    }, [props.cols, hiddenCols, props.rowActionCellPopover, props.rowActionCell, props.selectable, props.selectAll, selectionSet, props.rows, selection]);

    const updateScrollBoundaries = () => {
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

    useEffect(() => {
        updateScrollBoundaries();
    }, [props.cols, props.rows]);

    useWindowEvent("resize", () => {
        updateScrollBoundaries();
    });

    // Adjust selection when rows change
    useEffect(() => {
        const newRowIds = new Set(props.rows.map(getRowId.current));

        // Unselect removed rows
        const newSelection = selection.filter(row => newRowIds.has(getRowId.current(row)));

        // If selection changed (rows removed from selection), update
        if (newSelection.length !== selection.length) {
            setSelection(newSelection);
            props.onSelectionChange?.(newSelection);
        }
    }, [props.rows]);

    const showPlaceholder = empty || props.loading;

    return (
        <div className={clsx("bg-paper flex flex-col relative overflow-y-auto min-h-0", showPlaceholder && "min-h-40", props.className)}>
            {showPlaceholder && (
                <Placeholder className="absolute w-full h-full left-0">
                    {!props.loading ? empty && (props.components?.empty || "No data found") : props.components?.loading || <Spinner size="2xl" />}
                </Placeholder>
            )}
            <div className={clsx("grow overflow-x-auto relative flex flex-col")} style={{}} ref={scrollXBox} onScroll={() => updateScrollBoundaries()}>
                <div className="shrink-0" style={{ minWidth: "min-content" }}>
                    <DataGridHeaderRow leftEnd={leftEnd} rightEnd={rightEnd} cols={cols} height={props.headerRowHeight} />
                    {!props.loading &&
                        len > 0 &&
                        props.rows.map(row => (
                            <DataGridRow
                                leftEnd={leftEnd}
                                rightEnd={rightEnd}
                                height={props.rowHeight}
                                selected={selectionSet.has(getRowId.current(row))}
                                key={props.rowId(row)}
                                row={row}
                                cols={cols}
                                hoverEffect
                                onClick={props.onRowClick}
                                onCellClick={props.onCellClick}
                            />
                        ))}
                </div>
            </div>
            <DataGridFooter />
        </div>
    );
};
