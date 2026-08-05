import { type FC, type ReactNode, type ComponentProps } from "react";
import { cn } from "@/lib/utils.js";
import { Separator } from "./ui/separator.js";

export interface LabeledSeparatorProps extends Omit<ComponentProps<"div">, "children"> {
    children?: ReactNode;
    orientation?: "horizontal" | "vertical";
    separatorProps?: ComponentProps<"div">;
    labelProps?: ComponentProps<"span">;
}

/**
 * A `Separator` with a centered label, e.g. an "OR" divider.
 */
export const LabeledSeparator: FC<LabeledSeparatorProps> = ({
    children,
    orientation = "horizontal",
    separatorProps,
    labelProps,
    className,
    ...props
}) => (
    <div
        className={cn("flex items-center gap-3", orientation === "vertical" && "flex-col h-full", className)}
        {...props}
    >
        <Separator
            orientation={orientation}
            className={cn("shrink", separatorProps?.className)}
            {...separatorProps}
        />
        {children && (
            <span
                className={cn("text-xs text-muted-foreground shrink-0", labelProps?.className)}
                {...labelProps}
            >
                {children}
            </span>
        )}
        <Separator
            orientation={orientation}
            className={cn("shrink", separatorProps?.className)}
            {...separatorProps}
        />
    </div>
);
