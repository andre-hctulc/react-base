import type { ComponentProps, CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils.js";

function defaultValueRender(key: string, value: unknown): ReactNode {
    if (value === null || value === undefined || value === "") {
        return <span className="text-muted-foreground italic">—</span>;
    }
    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }
    if (value instanceof Date) {
        return value.toLocaleString();
    }
    if (Array.isArray(value)) {
        return value.length ? value.join(", ") : <span className="text-muted-foreground italic">—</span>;
    }
    if (typeof value === "object") {
        return (
            <pre className="max-h-64 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap wrap-break-word">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }
    return String(value);
}

interface DataSummaryProps extends ComponentProps<"div"> {
    data: object;
    renderValue?: (key: string, value: unknown) => ReactNode;
    includeKeys?: string[];
    excludeKeys?: string[];
    /**
     * Width of the first (label) column on `sm+` screens.
     *
     * - number values are treated as pixels
     * - string values are used as-is (e.g. `"12rem"`, `"30%"`)
     *
     * @default "10rem"
     */
    labelWidth?: number | string;
}

export const DataSummary: FC<DataSummaryProps> = ({
    data,
    renderValue,
    includeKeys,
    excludeKeys,
    labelWidth = "10rem",
    className,
    ...props
}) => {
    const resolvedLabelWidth = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;

    const entries = Object.entries(data).filter(([key]) => {
        if (includeKeys) {
            return includeKeys.includes(key);
        }
        if (excludeKeys) {
            return !excludeKeys.includes(key);
        }
        return true;
    });

    return (
        <div className={cn("text-sm", className)} {...props}>
            <dl className="divide-border divide-y">
                {entries.map(([key, value]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                        <dt
                            className={cn(
                                "text-muted-foreground min-w-0 whitespace-normal [overflow-wrap:anywhere]",
                                "sm:shrink-0 sm:basis-[var(--data-summary-label-width)] sm:w-[var(--data-summary-label-width)]",
                            )}
                            style={{ "--data-summary-label-width": resolvedLabelWidth } as CSSProperties}
                        >
                            {key}
                        </dt>
                        <dd className="min-w-0 grow font-medium wrap-break-word">
                            {renderValue ? renderValue(key, value) : defaultValueRender(key, value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
