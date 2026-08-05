"use client";

import type { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/lib/utils.js";

export function defaultRenderDataSummaryValue(value: unknown): ReactNode {
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
            <pre className="overflow-x-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap wrap-break-word">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }
    return String(value);
}

interface DataSummaryProps extends ComponentProps<"div"> {
    data: Record<string, unknown>;
    renderValue?: (value: unknown, key: string) => ReactNode;
}

export const DataSummary: FC<DataSummaryProps> = ({ data, renderValue, className, ...props }) => {
    const entries = Object.entries(data);

    return (
        <div className={cn("text-sm", className)} {...props}>
            <dl className="divide-border divide-y">
                {entries.map(([key, value]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                        <dt className="text-muted-foreground sm:w-40 sm:shrink-0">{key}</dt>
                        <dd className="min-w-0 grow font-medium wrap-break-word">
                            {renderValue ? renderValue(value, key) : defaultRenderDataSummaryValue(value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
