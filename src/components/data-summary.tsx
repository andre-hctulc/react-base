import type { ComponentProps, CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils.js";

function defaultValueRender(key: string, value: unknown, deepRender: boolean): ReactNode {
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
        if (!deepRender) {
            return `${value.length} item${value.length === 1 ? "" : "s"}`;
        }
        return value.length ? value.join(", ") : <span className="text-muted-foreground italic">—</span>;
    }
    if (typeof value === "object") {
        if (!deepRender) {
            return `${Object.keys(value).length} field${Object.keys(value).length === 1 ? "" : "s"}`;
        }
        return (
            <pre className="max-h-64 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap wrap-break-word">
                {JSON.stringify(value, null, 2)}
            </pre>
        );
    }
    return String(value);
}

type MatchKeyFn = (key: string, value: any) => boolean;
type MatchItem = string | RegExp | MatchKeyFn;

interface DataSummaryProps extends ComponentProps<"div"> {
    data: object;
    renderValue?: (key: string, value: unknown) => ReactNode;
    /**
     * Render nested objects and arrays as JSON instead of a string representation.
     * @default true
     */
    deepRender?: boolean;
    includeKeys?: MatchItem[];
    excludeKeys?: MatchItem[];
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
    deepRender,
    ...props
}) => {
    const resolvedLabelWidth = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;

    const matches = (key: string, value: any, matchItems?: MatchItem[]): boolean => {
        if (!matchItems) {
            return false;
        }
        for (const item of matchItems) {
            if (typeof item === "string" && key === item) {
                return true;
            }
            if (item instanceof RegExp && item.test(key)) {
                return true;
            }
            if (typeof item === "function" && item(key, value)) {
                return true;
            }
        }
        return false;
    };

    const entries = Object.entries(data).filter(([key, value]) => {
        if (includeKeys) {
            return matches(key, value, includeKeys);
        }
        if (excludeKeys) {
            return !matches(key, value, excludeKeys);
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
                                "text-muted-foreground min-w-0 whitespace-normal wrap-anywhere",
                                "sm:shrink-0 sm:basis-(--data-summary-label-width) sm:w-(--data-summary-label-width)",
                            )}
                            style={{ "--data-summary-label-width": resolvedLabelWidth } as CSSProperties}
                        >
                            {key}
                        </dt>
                        <dd className="min-w-0 grow font-medium wrap-break-word">
                            {renderValue
                                ? renderValue(key, value)
                                : defaultValueRender(key, value, deepRender ?? true)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
