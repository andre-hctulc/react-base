import type { ComponentProps, FC } from "react";
import { Empty } from "@/components/ui/empty.js";
import { Spinner } from "@/components/ui/spinner.js";
import { cn } from "@/lib/utils";

interface EmptyTextProps extends Omit<ComponentProps<typeof Empty>, "title"> {
    spinnerProps?: ComponentProps<typeof Spinner>;
}

export const EmptySpinner: FC<EmptyTextProps> = ({ children, spinnerProps, ...props }) => {
    return (
        <Empty {...props}>
            <Spinner {...spinnerProps} className={cn("size-6", spinnerProps?.className)} />
            {children}
        </Empty>
    );
};
