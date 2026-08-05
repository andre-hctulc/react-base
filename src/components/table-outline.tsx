import { cn } from "@/lib/utils.js";
import type { ComponentProps, FC } from "react";

interface TableOutlineProps extends ComponentProps<"div"> {
    children: React.ReactNode;
}

export const TableOutline: FC<TableOutlineProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("overflow-hidden rounded border", className)} {...props}>
            {children}
        </div>
    );
};
