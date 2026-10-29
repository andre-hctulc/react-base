"use client";

import { useId, useRef, type ComponentProps, type HTMLProps, type ReactNode } from "react";
import useSwrInfinite, { type SWRInfiniteConfiguration } from "swr/infinite";
import { Button } from "@/components/ui/button.js";
import { Spinner } from "@/components/ui/spinner.js";
import { useRefOf } from "@/hooks/use-ref-of.js";
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
    /** Content displayed when the list is empty. */
    empty?: ReactNode;
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
    empty,
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
    const defaultCacheId = useId();
    const loaderRef = useRefOf(loader);
    const onErrorRef = useRefOf(onError);
    const loadMoreActive = useRef(false);
    const {
        data,
        error: loadError,
        isLoading,
        isValidating,
        setSize,
    } = useSwrInfinite<
        TData[],
        unknown,
        (index: number, previousData: TData[] | null) => [string, number] | null
    >(
        (pageIndex, previousPageData) => {
            if (isControlled || !loader || (previousPageData && previousPageData.length < pageSize)) {
                return null;
            }
            return [cacheId ?? defaultCacheId, pageIndex];
        },
        async ([_, pageIndex]): Promise<TData[]> => {
            const currentLoader = loaderRef.current;
            if (!currentLoader) {
                throw new Error("LoadMoreList requires a loader to fetch items");
            }
            const abortController = new AbortController();
            return await currentLoader(pageIndex, pageSize, itemsRef.current, abortController.signal);
        },
        {
            ...swrOptions,
            initialSize: initialPageIndex + 1,
            onError: (error, key, config) => {
                swrOptions?.onError?.(error, key, config);
                onErrorRef.current?.(error, key);
            },
        },
    );
    const allItems = items ?? data?.flat() ?? [];
    const itemsRef = useRefOf(allItems);
    const hasMore = !data?.length || data[data.length - 1].length === pageSize;
    const busy = Boolean(loading || (!isControlled && (isLoading || isValidating)));
    const failed = !isControlled && loadError !== undefined;
    const canLoadMore = isControlled ? controlledHasMore : hasMore;
    const isEmpty = allItems.length === 0 && preChildren == null && postChildren == null;

    async function loadMore() {
        if (loadMoreActive.current || busy || !canLoadMore || !loader) {
            return;
        }
        loadMoreActive.current = true;
        try {
            await setSize((currentSize) => currentSize + 1);
        } finally {
            loadMoreActive.current = false;
        }
    }

    return (
        <Root {...(props as ComponentProps<"div">)} className={className} aria-busy={busy}>
            {preChildren}
            {children(allItems)}
            {postChildren}
            {failed && (
                <ItemRoot className={cn("py-3")}>
                    {error === undefined || typeof error === "string" ? (
                        <p role="alert" className="text-sm text-center text-destructive">
                            {error ?? "Failed to load items"}
                        </p>
                    ) : (
                        error
                    )}
                </ItemRoot>
            )}
            {isEmpty && !busy && !failed && !!empty && <ItemRoot>{empty}</ItemRoot>}
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
                        onClick={async (event) => {
                            buttonProps?.onClick?.(event);
                            if (event.defaultPrevented) {
                                return;
                            }
                            if (isControlled) {
                                onLoadMore?.();
                            } else {
                                await loadMore();
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
