import {
    Spinner,
    TableCell,
    TableRow,
    type SpinnerProps,
    type TableCellProps,
    type TableRowProps,
} from "flowbite-react";
import { type FC } from "react";
import { Placeholder, type PlaceholderProps } from "../placeholder";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

export interface TableSpinnerProps extends SpinnerProps {
    rowProps?: TableRowProps;
    cellProps?: TableCellProps;
    placeholderProps?: PlaceholderProps;
}

/**
 * Place this inside a *table body* to show a placeholder when there is no data.
 */
export const TableSpinner: FC<TableSpinnerProps> = ({ rowProps, cellProps, placeholderProps, ...props }) => {
    return (
        <TableRow {...rowProps}>
            <TableCell colSpan={"100%" as any} {...cellProps}>
                <Placeholder py="lg" {...placeholderProps}>
                    <Spinner size="lg" {...props} />
                </Placeholder>
            </TableCell>
        </TableRow>
    );
};
