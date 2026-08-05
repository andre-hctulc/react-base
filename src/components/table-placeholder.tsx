import type { ComponentProps, FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table.js";

interface TablePlaceholderProps extends ComponentProps<typeof TableRow> {
    colSpan?: number;
}

export const TablePlaceholder: FC<TablePlaceholderProps> = ({ colSpan, children, ...props }) => {
    return (
        <TableRow {...props}>
            <TableCell colSpan={colSpan ?? 1000} className="h-24 text-center italic text-muted-foreground">
                {children || "No data found"}
            </TableCell>
        </TableRow>
    );
};
