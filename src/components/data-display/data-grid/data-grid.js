"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useRefOf, useWindowEvent } from "../../../hooks";
import { Spinner } from "../../data-display/spinner";
import { usePersistentState } from "../../../hooks/others/use-persistent";
import { DataGridSettings } from "./data-grid-settings";
import { DataGridActions } from "./data-grid-actions";
import { Checkbox } from "../../input/checkbox";
import { withPrefix } from "../../../util/system";
import { Placeholder } from "../../data-display/placeholder";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DataGridHeaderRow } from "./data-grid-header-row";
import { DataGridRow } from "./data-grid-row";
import { DataGridFooter } from "./data-grid-footer";
export const DataGrid = (props) => {
    const getRowId = useRefOf(props.rowId);
    const ranId = useId();
    const id = props.storage?.id ?? ranId;
    const [selection, setSelection] = useState([]);
    const selectionSet = useMemo(() => new Set(selection.map((row) => getRowId.current(row))), [selection]);
    const [hiddenCols, setHiddenCols] = usePersistentState(withPrefix("data-grid-hide-cols_") + id, props.defaultHideCols || [], props.storage?.engine || usePersistentState.memoryStorage);
    const len = props.rows.length;
    const empty = len === 0;
    const [rightEnd, setRightEnd] = useState(true);
    const [leftEnd, setLeftEnd] = useState(true);
    const scrollXBox = useRef(null);
    const cols = useMemo(() => {
        const c = [...props.cols];
        const settingsEnabled = props.settings !== false;
        // Add actions col
        if (props.rowActionCellPopover || props.rowActionCell || settingsEnabled) {
            c.push({
                hidable: false,
                label: settingsEnabled && (_jsx(DataGridSettings, { cols: c, hiddenCols: hiddenCols, icon: props.components?.settingsIcon, onChange: (hiddenCols) => setHiddenCols(hiddenCols) })),
                render: props.rowActionCell ||
                    ((cell, row, col) => props.rowActionCellPopover && (_jsx(DataGridActions, { moreIcon: props.components?.moreIcon, render: props.rowActionCellPopover, row: row }))),
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
                label: props.selectAll === false ? ("") : (_jsx(Checkbox, { size: "sm", value: selection.length === len, onChange: ({ value }) => {
                        const newSelection = value ? props.rows : [];
                        setSelection(newSelection);
                        props.onSelectionChange?.(newSelection);
                    }, onClick: (e) => e.stopPropagation() })),
                path: "$select$",
                width: 50,
                hidable: false,
                className: "flex justify-center items-center",
                headerCellClassName: "flex justify-center items-center",
                render: (value, row, col) => (_jsx(Checkbox, { size: "sm", value: selectionSet.has(getRowId.current(row)), onChange: ({ value }) => {
                        const rowId = getRowId.current(row);
                        const newSelection = value
                            ? [...selection, row]
                            : selection.filter((r) => getRowId.current(r) !== rowId);
                        setSelection(newSelection);
                        props.onSelectionChange?.(newSelection);
                    }, onClick: (e) => e.stopPropagation() })),
                stickyLeft: true,
            });
        }
        const hideSet = new Set(hiddenCols);
        return c
            .filter((col) => !hideSet.has(col.path))
            .map((col) => {
            return {
                ...props.baseColDef,
                ...col,
            };
        });
    }, [
        props.cols,
        hiddenCols,
        props.rowActionCellPopover,
        props.rowActionCell,
        props.selectable,
        props.selectAll,
        selectionSet,
        props.rows,
        selection,
    ]);
    const updateScrollBoundaries = () => {
        if (!scrollXBox.current)
            return;
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
        const newSelection = selection.filter((row) => newRowIds.has(getRowId.current(row)));
        // If selection changed (rows removed from selection), update
        if (newSelection.length !== selection.length) {
            setSelection(newSelection);
            props.onSelectionChange?.(newSelection);
        }
    }, [props.rows]);
    const showPlaceholder = empty || props.loading;
    return (_jsxs("div", { className: clsx("bg-paper flex flex-col relative overflow-y-auto min-h-0", showPlaceholder && "min-h-40", props.className), children: [showPlaceholder && (_jsx(Placeholder, { className: "absolute w-full h-full left-0", children: !props.loading
                    ? empty && (props.components?.empty || "No data found")
                    : props.components?.loading || _jsx(Spinner, { size: "2xl" }) })), _jsx("div", { className: clsx("grow overflow-x-auto relative flex flex-col"), style: {}, ref: scrollXBox, onScroll: () => updateScrollBoundaries(), children: _jsxs("div", { className: "shrink-0", style: { minWidth: "min-content" }, children: [_jsx(DataGridHeaderRow, { leftEnd: leftEnd, rightEnd: rightEnd, cols: cols, height: props.headerRowHeight }), !props.loading &&
                            len > 0 &&
                            props.rows.map((row) => (_jsx(DataGridRow, { leftEnd: leftEnd, rightEnd: rightEnd, height: props.rowHeight, selected: selectionSet.has(getRowId.current(row)), row: row, cols: cols, hoverEffect: true, onClick: props.onRowClick, onCellClick: props.onCellClick }, props.rowId(row))))] }) }), _jsx(DataGridFooter, {})] }));
};
