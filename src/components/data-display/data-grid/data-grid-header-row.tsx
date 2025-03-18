import clsx from "clsx";
import { useMapArray } from "../../../hooks/iterables/use-map-array.js";
import type { DataGridColDef } from "./types.js";
import { useMemo } from "react";
import { setProperty } from "dot-prop";
import { DataGridRow } from "./data-grid-row.js";

interface DataGridHeaderRowProps {
    cols: DataGridColDef<any>[];
    height: number | undefined;
    rightEnd: boolean;
    leftEnd: boolean;
}

export const DataGridHeaderRow: React.FC<DataGridHeaderRowProps> = ({ cols, height, rightEnd, leftEnd }) => {
    const headerCols = useMapArray<DataGridColDef, DataGridColDef>(cols, (col, index, arr) => {
        return {
            ...col,
            className: clsx("text-sm text-t3", col.headerCellClassName),
            // Use label as renderValue when its nt a string, otherwise set renderValue to undefined
            render:
                typeof col.label === "string"
                    ? () => <div className="py-2 truncate font-light">{col.label}</div>
                    : () => col.label,
        };
    });
    const headerRow = useMemo(() => {
        const result: any = {};
        cols.forEach((col) => {
            setProperty(result, col.path, col.label);
        });
        return result;
    }, [cols]);

    return (
        <DataGridRow
            rightEnd={rightEnd}
            leftEnd={leftEnd}
            className="bg-paper z-2 w-full! flex rounded-t-lg border-b! top-0 sticky"
            row={headerRow}
            cols={headerCols}
            hoverEffect={false}
            selected={false}
            height={height}
        />
    );
};
