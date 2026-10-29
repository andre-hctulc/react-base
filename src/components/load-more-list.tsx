"use client";

import { type ComponentProps, type HTMLProps, type ReactNode } from "react";
import type { SWRInfiniteConfiguration } from "swr/infinite";
import { Button } from "@/components/ui/button.js";
import { Spinner } from "@/components/ui/spinner.js";
import { useInfinityList } from "@/components/infinity-list.js";
import { cn } from "@/lib/utils.js";

export interface LoadMoreListProps<TData = unknown> extends Omit<
    HTMLProps<HTMLElement>,
    "children" | "as" | "onScroll" | "onWheel" | "onError"
> {
    /** Controlled items. */
    items?: TData[];
    /** @default 0 */
    initialPageIndex?: number;
    /** @default 10 */
    pageSize?: number;
    preChildren?: ReactNode;
    postChildren?: ReactNode;
    children: (items: TData[]) => ReactNode;
    as?: "ul" | "ol" | "div";
    loader?: (
        pageIndex: number,
        pageSize: number,
        currentItems: TData[],
        abortSignal: AbortSignal,
    ) => TData[] | Promise<TData[]>;
    loading?: boolean;
    onError?: (error: unknown, key: string) => void;
    spinnerProps?: ComponentProps<typeof Spinner>;
    error?: ReactNode;
    errorProps?: ComponentProps<"div"> | ComponentProps<"li">;
    /** Content displayed when the list is empty. */
    empty?: ReactNode;
    emptyProps?: ComponentProps<"div"> | ComponentProps<"li">;
    swrOptions?: SWRInfiniteConfiguration<TData[], unknown>;
    /** Used for cache partitioning. */
    cacheId?: string;
    /** Whether more controlled items are available. Defaults to true. */
    hasMore?: boolean;
    /** Called on a button click in controlled mode. */
    onLoadMore?: () => void;
    /** @default "Load more" */
    loadMoreLabel?: ReactNode;
    buttonProps?: ComponentProps<typeof Button>;
    buttonContainerProps?: ComponentProps<"div"> | ComponentProps<"li">;
}

/** Loads the first page on mount and subsequent pages only on button clicks. */
export function LoadMoreList<TData = unknown>({
    className,
    children,
    items,
    initialPageIndex = 0,
    pageSize = 10,
    as,
    loader,
    loading,
    onError,
    spinnerProps,
    error,
    errorProps,
    empty,
    emptyProps,
    preChildren,
    postChildren,
    swrOptions,
    cacheId,
    hasMore: controlledHasMore = true,
    onLoadMore,
    loadMoreLabel = "Load more",
    buttonProps,
    buttonContainerProps,
    ...props
}: LoadMoreListProps<TData>) {
    const Root = (as ?? "div") as "div";
    const ItemRoot = as === "ul" || as === "ol" ? "li" : "div";
    const isControlled = items !== undefined;
    const {
        hasMore,
        error: loadError,
        isLoading,
        items: uncontrolledItems,
        loadMore,
    } = useInfinityList({
        initialPageIndex,
        pageSize,
        loader: isControlled ? undefined : loader,
        onError,
        swrOptions,
        cacheId,
    });
    const allItems = items ?? uncontrolledItems;
    const busy = Boolean(loading || (!isControlled && isLoading));
    const failed = !isControlled && loadError !== undefined;
    const canLoadMore = isControlled ? controlledHasMore : hasMore;
    const isEmpty = allItems.length === 0 && preChildren == null && postChildren == null;

    return (
        <Root {...(props as ComponentProps<"div">)} className={className} aria-busy={busy}>
            {preChildren}
            {children(allItems)}
            {postChildren}
            {failed && (
                <ItemRoot {...(errorProps as object)} className={cn("py-3", errorProps?.className)}>
                    {error === undefined || typeof error === "string" ? (
                        <p role="alert" className="text-sm text-center text-destructive">
                            {error ?? "Failed to load items"}
                        </p>
                    ) : (
                        error
                    )}
                </ItemRoot>
            )}
            {isEmpty && !busy && !failed && !!empty && (
                <ItemRoot {...(emptyProps as object)} className={cn("py-3", emptyProps?.className)}>
                    {empty}
                </ItemRoot>
            )}
            {(canLoadMore || busy) && !failed && (
                <ItemRoot
                    {...(buttonContainerProps as object)}
                    className={cn("flex items-center justify-center py-2", buttonContainerProps?.className)}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        {...buttonProps}
                        type="button"
                        disabled={
                            busy ||
                            !canLoadMore ||
                            buttonProps?.disabled ||
                            (isControlled ? !onLoadMore : !loader)
                        }
                        onClick={(event) => {
                            buttonProps?.onClick?.(event);
                            if (event.defaultPrevented) {
                                return;
                            }
                            if (isControlled) {
                                onLoadMore?.();
                            } else {
                                void loadMore();
                            }
                        }}
                    >
                        {busy && <Spinner data-icon="inline-start" {...spinnerProps} />}
                        {loadMoreLabel}
                    </Button>
                </ItemRoot>
            )}
        </Root>
    );
}
