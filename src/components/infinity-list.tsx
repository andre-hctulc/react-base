"use client";

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useId,
    useRef,
    useState,
    type ComponentProps,
    type HTMLProps,
    type ReactNode,
    type UIEvent,
    type WheelEventHandler,
} from "react";
import { Spinner } from "@/components/ui/spinner.js";
import { cn } from "@/lib/utils.js";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { useScrollObserver } from "@/hooks/use-scroll-observer.js";
import useSwrInfinite, { type SWRInfiniteConfiguration } from "swr/infinite";

export type InfinityListLoader<TData = any> = (
    pageIndex: number,
    pageSize: number,
    currentItems: TData[],
    abortSignal: AbortSignal,
) => TData[] | Promise<TData[]>;

export interface LoadResult<TData = any> {
    err: unknown;
    /** Page data */
    data: TData[] | null;
}

export interface UseInfinityListOptions<TData = any> {
    initialPageIndex: number;
    pageSize: number;
    loader?: InfinityListLoader<TData>;
    onError?: (error: unknown, key: string) => void;
    swrOptions?: SWRInfiniteConfiguration<TData[], unknown>;
    cacheId?: string;
}

export interface UseInfinityListResult<TData = any> {
    error: unknown;
    hasMore: boolean;
    isLoading: boolean;
    items: TData[];
    loadMore: () => Promise<LoadResult<TData>>;
}

export function useInfinityList<TData = any>({
    loader,
    initialPageIndex,
    pageSize,
    onError,
    swrOptions,
    cacheId,
}: UseInfinityListOptions<TData>): UseInfinityListResult<TData> {
    const loaderRef = useRefOf(loader);
    const [hasMore, setHasMore] = useState(true);
    const defaultCacheId = useId();
    const onErrorRef = useRefOf(onError);
    const currentAbortController = useRef<AbortController | null>(null);

    const { data, error, isLoading, isValidating, setSize } = useSwrInfinite<
        TData[],
        unknown,
        (index: number, previousData: TData[] | null) => [string, number] | null
    >(
        (pageIndex, previousPageData) => {
            if (previousPageData && previousPageData.length < pageSize) {
                return null;
            }
            return [cacheId ?? defaultCacheId, pageIndex];
        },
        async ([_, pageIndex]): Promise<TData[]> => {
            if (currentAbortController.current) {
                currentAbortController.current.abort();
            }

            const currentLoader = loaderRef.current;
            if (!currentLoader) {
                return [];
            }
            
            const abortController = new AbortController();
            currentAbortController.current = abortController;

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

    const lodeMoreActive = useRef(false);
    const loading = isLoading || isValidating;

    const items = data?.flat() ?? [];
    const itemsRef = useRefOf(items);

    const loadMore = useCallback(async (): Promise<LoadResult<TData>> => {
        if (lodeMoreActive.current || isValidating || !hasMore || !loaderRef.current) {
            return { err: undefined, data: null };
        }
        lodeMoreActive.current = true;
        try {
            const nextPages = await setSize((currentSize) => currentSize + 1);
            const newHasMore = nextPages?.length
                ? nextPages[nextPages.length - 1]?.length === pageSize
                : false;
            setHasMore(newHasMore);
            return { err: undefined, data: nextPages?.at(-1) ?? null };
        } catch (error) {
            return { err: error, data: null };
        } finally {
            lodeMoreActive.current = false;
        }
    }, [hasMore, isValidating, loaderRef, setSize]);

    return {
        error,
        hasMore,
        isLoading: loading,
        items: items,
        loadMore,
    };
}

export type InfinityListProps<TData = any> = {
    /**
     * Controlled items
     */
    items?: TData[];
    initialPageIndex?: number;
    /**
     * @default 10
     */
    pageSize?: number;
    preChildren?: ReactNode;
    postChildren?: ReactNode;
    children: (items: TData[]) => ReactNode;
    as?: "ul" | "ol" | "div";
    onTrigger?: (e: UIEvent<HTMLElement> | undefined, currentOffset: number) => void;
    onWheel?: WheelEventHandler<HTMLElement>;
    loader?: InfinityListLoader<TData>;
    /**
     * The offset (px) from the bottom of the container at which to trigger loading more items.
     * @default 100
     */
    triggerOffset?: number;
    /**
     * The offset (px) from the top of the container at which to trigger loading previous items.
     * @default 100
     */
    previousTriggerOffset?: number;
    loading?: boolean;
    onError?: (error: unknown, key: string) => void;
    loadingProps?: ComponentProps<"div"> | ComponentProps<"li">;
    spinnerProps?: ComponentProps<typeof Spinner>;
    /** */
    error?: ReactNode;
    errorProps?: ComponentProps<"div"> | ComponentProps<"li">;
    /**
     * The maximum height of the list container.
     *
     * A max height is always set to prevent the list from growing indefinitely.
     *
     * @default 4000px
     */
    maxHeight?: string | number;
    /**
     * The content to display when the list is empty.
     */
    empty?: ReactNode;
    emptyProps?: ComponentProps<"div"> | ComponentProps<"li">;
    swrOptions?: SWRInfiniteConfiguration<TData[], unknown>;
    /** Used for cache partitioning */
    cacheId?: string;
} & Omit<HTMLProps<HTMLElement>, "children" | "as" | "onScroll" | "onWheel">;

export function InfinityList<TData = any>({
    className,
    children,
    items,
    initialPageIndex,
    pageSize = 10,
    as,
    triggerOffset = 100,
    previousTriggerOffset = 100,
    onTrigger,
    onWheel,
    loader,
    loading,
    onError,
    loadingProps,
    spinnerProps,
    error,
    errorProps,
    style,
    empty,
    emptyProps,
    preChildren,
    postChildren,
    ref,
    swrOptions,
    cacheId,
    ...props
}: InfinityListProps<TData>) {
    const Root = (as ?? "div") as "div";
    const isList = as === "ul" || as === "ol";
    const ItemRoot = isList ? "li" : "div";
    const rootRef = useRef<HTMLElement | null>(null);

    const previousScrollHeightRef = useRef<number | undefined>(undefined);
    const previousScrollTopRef = useRef<number | undefined>(undefined);
    const onTriggerRef = useRefOf(onTrigger);
    const {
        hasMore,
        error: loadError,
        isLoading,
        items: uncontrolledItems,
        loadMore,
    } = useInfinityList({ initialPageIndex: initialPageIndex ?? 0, pageSize, loader, onError, cacheId });
    const isControlled = items !== undefined;
    const allItems = items ?? uncontrolledItems;
    const { handleScroll, handleWheel } = useScrollObserver({
        endOffset: triggerOffset,
        startOffset: previousTriggerOffset,
        onReachEnd: ({ currentOffset, element, event }) => {
            if (!isControlled) {
                previousScrollHeightRef.current = element.scrollHeight;
                previousScrollTopRef.current = element.scrollTop;
                void loadMore();
            }
            onTriggerRef.current?.(event, currentOffset);
        },
        onReachStart: ({ element }) => {
            // TODO
        },
    });

    useEffect(() => {
        const root = rootRef.current;

        if (
            !root ||
            isLoading ||
            loading ||
            (!isControlled && (!hasMore || loadError !== undefined)) ||
            root.scrollHeight > root.clientHeight
        ) {
            return;
        }

        const currentOffset = root.scrollHeight - root.scrollTop - root.clientHeight;

        if (isControlled) {
            onTriggerRef.current?.(undefined, currentOffset);
        } else {
            void loadMore();
        }
    }, [allItems, loadError, hasMore, isControlled, isLoading, loadMore, loading]);

    useLayoutEffect(() => {
        const root = rootRef.current;

        const previousScrollHeight = previousScrollHeightRef.current;
        const previousScrollTop = previousScrollTopRef.current;

        if (!root || previousScrollHeight === undefined || previousScrollTop === undefined) {
            return;
        }

        const restoredScrollTop = previousScrollTop + root.scrollHeight - previousScrollHeight;

        root.scrollTop = Math.max(restoredScrollTop, previousTriggerOffset + 1);
        previousScrollHeightRef.current = undefined;
        previousScrollTopRef.current = undefined;
    }, [allItems]);

    const isEmpty = allItems.length === 0 && preChildren == null && postChildren == null;

    return (
        <Root
            ref={(element) => {
                rootRef.current = element;
                if (typeof ref === "function") {
                    ref(element);
                } else if (ref) {
                    ref.current = element;
                }
            }}
            className={cn("overflow-y-auto max-h-1000", className)}
            onScroll={handleScroll}
            onWheel={(event) => {
                onWheel?.(event);
                if (!event.defaultPrevented) {
                    handleWheel(event);
                }
            }}
            {...(props as ComponentProps<"div">)}
        >
            {preChildren}
            {children(allItems)}
            {postChildren}
            {!!loadError && (
                <ItemRoot {...(errorProps as object)} className={cn("py-3", errorProps?.className)}>
                    {error === undefined || typeof error === "string" ? (
                        <p className="text-sm text-center text-destructive">
                            {error ?? "Failed to load items"}
                        </p>
                    ) : (
                        error
                    )}
                </ItemRoot>
            )}
            {isEmpty && !isLoading && !loadError && !!empty && (
                <ItemRoot {...(emptyProps as object)} className={cn("py-3", emptyProps?.className)}>
                    {empty}
                </ItemRoot>
            )}
            {(loading || isLoading) && hasMore && !loadError && (
                <ItemRoot
                    {...(loadingProps as object)}
                    className={cn("flex flex-col items-center justify-center py-3", loadingProps?.className)}
                >
                    <Spinner {...spinnerProps} className={cn("size-5", spinnerProps?.className)} />
                </ItemRoot>
            )}
        </Root>
    );
}
