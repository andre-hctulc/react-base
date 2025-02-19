import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { useMapArray } from "../../../hooks";
import { useMemo } from "react";
import { setProperty } from "dot-prop";
import { DataGridRow } from "./data-grid-row";
export const DataGridHeaderRow = ({ cols, height, rightEnd, leftEnd }) => {
    const headerCols = useMapArray(cols, (col, index, arr) => {
        return {
            ...col,
            className: clsx("text-sm text-t3", col.headerCellClassName),
            // Use label as renderValue when its nt a string, otherwise set renderValue to undefined
            render: typeof col.label === "string"
                ? () => _jsx("div", { className: "py-2 truncate font-light", children: col.label })
                : () => col.label,
        };
    });
    const headerRow = useMemo(() => {
        const result = {};
        cols.forEach((col) => {
            setProperty(result, col.path, col.label);
        });
        return result;
    }, [cols]);
    return (_jsx(DataGridRow, { rightEnd: rightEnd, leftEnd: leftEnd, className: "bg-paper z-2 w-full! flex rounded-t-lg border-b! top-0 sticky", row: headerRow, cols: headerCols, hoverEffect: false, selected: false, height: height }));
};
