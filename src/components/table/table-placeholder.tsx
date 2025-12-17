import { TableCell, TableRow, type TableCellProps, type TableRowProps } from "flowbite-react";
import { type FC } from "react";
import { Placeholder, type PlaceholderProps } from "../placeholder/placeholder.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

export interface TablePlaceholderProps extends PlaceholderProps {
    rowProps?: TableRowProps;
    cellProps?: TableCellProps;
}

/**
 * Place this inside a *table body* to show a placeholder when there is no data.
 */
export const TablePlaceholder: FC<TablePlaceholderProps> = ({ rowProps, cellProps, ...props }) => {
    return (
        <TableRow {...rowProps}>
            <TableCell colSpan={"100%" as any} {...cellProps}>
                <Placeholder grow py="lg" {...props} />
            </TableCell>
        </TableRow>
    );
};
