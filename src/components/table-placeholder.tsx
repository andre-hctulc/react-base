import type { ComponentProps, FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table.js";
import { Empty, EmptyDescription, EmptyHeader } from "./ui/empty.js";

interface TablePlaceholderProps extends ComponentProps<typeof TableRow> {
    colSpan?: number;
}

export const TablePlaceholder: FC<TablePlaceholderProps> = ({ colSpan, children, ...props }) => {
    return (
        <TableRow {...props}>
            <TableCell colSpan={colSpan ?? 1000} className="flex flex-col justify-center items-center">
                {typeof children === "string" || !children ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyDescription>{children || "No data available"}</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    children
                )}
            </TableCell>
        </TableRow>
    );
};
