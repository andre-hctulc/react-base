import clsx from "clsx";
import { DataGridCell, type DataGridCellStyleProps } from "./data-grid-cell";
import type { DataGridColDef, OnCellClick, OnRowClick } from "./types";
import { getProperty } from "dot-prop";

interface DataGridRowProps<T extends object> extends DataGridCellStyleProps {
    row: T;
    cols: DataGridColDef<T>[];
    className?: string;
    hoverEffect: boolean;
    onClick?: OnRowClick<T>;
    onCellClick?: OnCellClick<T>;
    height: number | undefined;
}

export const DataGridRow: React.FC<DataGridRowProps<any>> = ({
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
                <DataGridCell
                    cols={cols}
                    row={row}
                    key={col.path}
                    col={col}
                    onClick={onCellClick}
                    value={getProperty(row, col.path)}
                    {...cellStyleProps}
                />
            ))}
        </div>
    );
};
