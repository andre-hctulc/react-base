import type { ComponentProps } from "react";
import { TableCell, TableRow } from "@/components/ui/table.js";

interface TablePlaceholderProps extends ComponentProps<typeof TableRow> {
    colSpan?: number;
}

export function TablePlaceholder({ colSpan, ...props }: TablePlaceholderProps) {
    return (
        <TableRow {...props}>
            <TableCell colSpan={colSpan ?? 1000} className="h-24 text-center italic text-muted-foreground">
                No data found
            </TableCell>
        </TableRow>
    );
}
