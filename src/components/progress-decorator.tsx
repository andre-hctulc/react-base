import { type ComponentProps, type FC, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils.js";

export interface ProgressDecoratorProps extends Omit<ComponentProps<"div">, "children"> {
    /**
     * Rendered above the start (left) of the progress bar, e.g. a step name.
     */
    valueLabel?: ReactNode;
    /**
     * Rendered above the end (right) of the progress bar, e.g. "40%" or "2 / 5".
     */
    value?: ReactNode;
    /**
     * Rendered below the progress bar.
     */
    description?: ReactNode;
    valueLabelProps?: ComponentProps<"span">;
    valueProps?: ComponentProps<"span">;
    descriptionProps?: ComponentProps<"p">;
    children: ReactElement;
}

export const ProgressDecorator: FC<ProgressDecoratorProps> = ({
    valueLabel,
    value,
    description,
    valueLabelProps,
    valueProps,
    descriptionProps,
    className,
    children,
    ...props
}) => {
    return (
        <div data-slot="progress-decorator" className={cn("flex flex-col gap-1.5", className)} {...props}>
            {(!!valueLabel || !!value) && (
                <div className="flex items-center justify-between gap-2 text-sm">
                    {valueLabel && (
                        <span
                            {...valueLabelProps}
                            className={cn("text-foreground", valueLabelProps?.className)}
                        >
                            {valueLabel}
                        </span>
                    )}
                    {value && (
                        <span
                            {...valueProps}
                            className={cn("text-muted-foreground tabular-nums", valueProps?.className)}
                        >
                            {value}
                        </span>
                    )}
                </div>
            )}
            {children}
            {!!description && (
                <p
                    {...descriptionProps}
                    className={cn("text-sm text-muted-foreground", descriptionProps?.className)}
                >
                    {description}
                </p>
            )}
        </div>
    );
};
