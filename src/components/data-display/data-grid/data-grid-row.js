import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { DataGridCell } from "./data-grid-cell";
import { getProperty } from "dot-prop";
export const DataGridRow = ({ row, cols, className, onCellClick, onClick, height, ...cellStyleProps }) => {
    return (_jsx("div", { className: clsx("group shrink-0 flex relative border-b-[0.5px]", onClick && "cursor-pointer", className, 
        // sometimes the cells do not cover the whole row,
        // so we need to defined selected and hover style also for the row
        cellStyleProps.hoverEffect && "hover:bg-primary/5", cellStyleProps.selected && "bg-primary/10"), onClick: (e) => onClick?.(row, e), style: { height: height, maxHeight: height }, children: cols.map((col) => (_jsx(DataGridCell, { cols: cols, row: row, col: col, onClick: onCellClick, value: getProperty(row, col.path), ...cellStyleProps }, col.path))) }));
};
