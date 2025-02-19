import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { DataGrid } from "./data-grid";
import clsx from "clsx";
import { DataGridCellText } from "./data-grid-cell-text";
const DEFAULT_CELL_WIDTH = 100;
function colWidth(col) {
    let width = col.width || DEFAULT_CELL_WIDTH;
    if (col.maxWidth)
        width = Math.min(width, col.maxWidth);
    if (col.minWidth)
        width = Math.max(width, col.minWidth);
    return width;
}
export const DataGridCell = ({ value, col, onClick, cols, row, selected, hoverEffect, leftEnd, rightEnd, }) => {
    const width = useMemo(() => colWidth(col), [col]);
    const [stickyLeft, lastStickyLeft] = useMemo(() => {
        if (!col.stickyLeft)
            return [undefined, false];
        let left = 0;
        let lastLeftCol;
        let addLeft = true;
        for (const c of cols) {
            if (c === col) {
                addLeft = false;
            }
            if (c.stickyLeft) {
                if (addLeft)
                    left += colWidth(c);
                lastLeftCol = c;
            }
        }
        return [left, lastLeftCol === col];
    }, [cols, col]);
    const [stickyRight, firstStickyRight] = useMemo(() => {
        if (!col.stickyRight)
            return [undefined, false];
        let right = 0;
        let addRight = true;
        let fistRightCol;
        for (const c of cols.reverse()) {
            if (c === col) {
                addRight = false;
            }
            if (c.stickyRight) {
                if (!fistRightCol)
                    fistRightCol = c;
                if (addRight)
                    right += colWidth(c) + 1;
            }
        }
        return [right, fistRightCol === col];
    }, [cols, col]);
    const sticky = col.stickyLeft || col.stickyRight;
    const isFlexCell = col.alignCenter || col.justifyCenter || col.center;
    /*
    NOTE **sticky**
    Sticky will only grasp when the element hits the edge on mount.
    Therefore we use order to make sure the sticky elements are always on the correct edge.
    For stickyLeft we set left 0 and order -1, for stickyRight we set right 0 and order 1.
    The default order is 0.
    */
    return (_jsx("div", { className: clsx("bg-paper transition-shadow", sticky && "z-1", col.stickyLeft && "sticky left-0 order-[-1]", col.stickyRight && "sticky right-0 order-1", firstStickyRight && "ml-auto", lastStickyLeft && !leftEnd && "shadow-sm", firstStickyRight && !rightEnd && "shadow-sm"), style: { minWidth: width, maxWidth: width, left: stickyLeft, right: stickyRight }, onClick: (e) => onClick?.(value, row, col, e), children: _jsx("div", { className: clsx("overflow-hidden px-1 w-full h-full box-border ", hoverEffect && "group-hover:bg-primary/5", selected && "bg-primary/10", isFlexCell && "flex", (col.alignCenter ?? col.center) && "items-center", (col.justifyCenter ?? col.center) && "justify-center", col.className), children: col.render ? (col.render(value, row, col)) : (_jsx(DataGridCellText, { children: col.stringify ? col.stringify(value, row, col) : value })) }) }));
};
