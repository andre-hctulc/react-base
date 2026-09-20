"use client";

import {
    useCallback,
    useEffect,
    useLayoutEffect,
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

export type InfinityListLoader<TData = any> = (
    pageIndex: number,
    pageSize: number,
    currentItems: TData[],
    abortSignal: AbortSignal,
) => TData[] | Promise<TData[]>;

export interface UseInfinityListOptions<TData = any> {
    defaultItems?: TData[];
    initialPageIndex?: number;
    pageSize?: number;
    tail?: number;
    loader?: InfinityListLoader<TData>;
}

export interface LoadResult<TData = any> {
    err: unknown;
    data: TData[] | null;
}

export interface UseInfinityListResult<TData = any> {
    error: unknown;
    hasMore: boolean;
    hasPrevious: boolean;
    isLoading: boolean;
    items: TData[];
    loadMore: () => Promise<LoadResult<TData>>;
    loadPrevious: () => Promise<LoadResult<TData>>;
}

export function useInfinityList<TData = any>({
    tail,
    loader,
    defaultItems,
    initialPageIndex = 0,
    pageSize = defaultItems?.length || 20,
}: UseInfinityListOptions<TData>): UseInfinityListResult<TData> {
    const initialItems = defaultItems ?? [];
    const initialTailLength = tail === undefined ? Infinity : Math.max(0, tail) * pageSize;
    const [allItems, setAllItems] = useState<TData[]>(
        initialTailLength === Infinity ? initialItems : initialItems.slice(-initialTailLength),
    );
    const [error, setError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(false);
    const canLoadInitialPage = defaultItems === undefined || initialItems.length >= pageSize;
    const [hasMore, setHasMore] = useState(canLoadInitialPage);
    const [hasPrevious, setHasPrevious] = useState(initialPageIndex > 0);

    const abortController = useRef<AbortController | null>(null);
    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(canLoadInitialPage);
    const hasPreviousRef = useRef(initialPageIndex > 0);
    const firstPageIndexRef = useRef(initialPageIndex);
    const lastPageIndexRef = useRef(initialPageIndex);
    const allItemsRef = useRef(allItems);
    const loaderRef = useRefOf(loader);
    const pageSizeRef = useRefOf(pageSize);
    const tailRef = useRefOf(tail);

    const appendItems = useCallback((newItems: TData[]) => {
        const tailLength =
            tailRef.current === undefined ? Infinity : Math.max(0, tailRef.current) * pageSizeRef.current;
        const retainedItems = tailLength === Infinity ? newItems : newItems.slice(-tailLength);
        const removedItems = newItems.length - retainedItems.length;
        if (removedItems) {
            firstPageIndexRef.current += Math.ceil(removedItems / pageSizeRef.current);
            if (firstPageIndexRef.current > 0) {
                hasPreviousRef.current = true;
                setHasPrevious(true);
            }
        }
        allItemsRef.current = retainedItems;
        setAllItems(retainedItems);
    }, []);

    const prependItems = useCallback((newItems: TData[]) => {
        const tailLength =
            tailRef.current === undefined ? Infinity : Math.max(0, tailRef.current) * pageSizeRef.current;
        const retainedItems = tailLength === Infinity ? newItems : newItems.slice(0, tailLength);
        const removedItems = newItems.length - retainedItems.length;
        if (removedItems) {
            lastPageIndexRef.current =
                firstPageIndexRef.current + Math.ceil(retainedItems.length / pageSizeRef.current) - 1;
            hasMoreRef.current = true;
            setHasMore(true);
        }
        allItemsRef.current = retainedItems;
        setAllItems(retainedItems);
    }, []);

    useEffect(() => {
        if (tail === undefined) {
            return;
        }
        setAllItems((currentItems) => {
            const retainedItems = currentItems.slice(-Math.max(0, tail) * pageSizeRef.current);
            allItemsRef.current = retainedItems;
            return retainedItems;
        });
    }, [tail]);

    useEffect(() => () => abortController.current?.abort(), []);

    const loadMore = useCallback(async (): Promise<LoadResult<TData>> => {
        if (!loaderRef.current || isLoadingRef.current || !hasMoreRef.current) {
            return { err: undefined, data: null };
        }

        const currentAbortController = new AbortController();
        abortController.current = currentAbortController;
        isLoadingRef.current = true;
        setError(undefined);
        setIsLoading(true);

        let newItems: TData[] | null = null;

        try {
            const pageIndex = lastPageIndexRef.current + 1;
            newItems = await loaderRef.current(
                pageIndex,
                pageSizeRef.current,
                allItemsRef.current,
                currentAbortController.signal,
            );
            if (currentAbortController.signal.aborted) {
                return { err: undefined, data: null };
            }
            if (newItems.length < pageSizeRef.current) {
                hasMoreRef.current = false;
                setHasMore(false);
            }
            lastPageIndexRef.current = pageIndex;
            appendItems([...allItemsRef.current, ...newItems]);
        } catch (error) {
            if (!currentAbortController.signal.aborted) {
                setError(error);
            }

            return { err: error, data: null };
        } finally {
            if (!currentAbortController.signal.aborted) {
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        }

        return { err: undefined, data: newItems };
    }, [appendItems]);

    const loadPrevious = useCallback(async (): Promise<LoadResult<TData>> => {
        if (!loaderRef.current || isLoadingRef.current || !hasPreviousRef.current) {
            return { err: undefined, data: null };
        }

        const currentAbortController = new AbortController();
        abortController.current = currentAbortController;
        isLoadingRef.current = true;
        setError(undefined);
        setIsLoading(true);

        let newItems: TData[] | null = null;

        try {
            const pageIndex = firstPageIndexRef.current - 1;
            newItems = await loaderRef.current(
                pageIndex,
                pageSizeRef.current,
                allItemsRef.current,
                currentAbortController.signal,
            );
            if (currentAbortController.signal.aborted) {
                return { err: undefined, data: null };
            }
            if (newItems.length < pageSizeRef.current || pageIndex === 0) {
                hasPreviousRef.current = false;
                setHasPrevious(false);
            }
            firstPageIndexRef.current = pageIndex;
            prependItems([...newItems, ...allItemsRef.current]);
        } catch (error) {
            if (!currentAbortController.signal.aborted) {
                setError(error);
            }

            return { err: error, data: null };
        } finally {
            if (!currentAbortController.signal.aborted) {
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        }

        return { err: undefined, data: newItems };
    }, [prependItems]);

    return { error, hasMore, hasPrevious, isLoading, items: allItems, loadMore, loadPrevious };
}

export type InfinityListProps<TData = any> = {
    items?: TData[];
    defaultItems?: TData[];
    initialPageIndex?: number;
    pageSize?: number;
    /**
     * Maximum number of pages to keep in the list.
     * @default Infinity
     */
    tail?: number;
    children: (items: TData[]) => ReactNode;
    as?: "ul" | "ol";
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
    onError?: (error: unknown) => void;
    loadingProps?: ComponentProps<"div"> | ComponentProps<"li">;
    spinnerProps?: ComponentProps<typeof Spinner>;
    error?: ReactNode;
    errorProps?: ComponentProps<"div"> | ComponentProps<"li">;
} & Omit<HTMLProps<HTMLElement>, "children" | "as" | "onScroll" | "onWheel">;

export function InfinityList<TData = any>({
    className,
    children,
    items,
    defaultItems,
    initialPageIndex,
    pageSize,
    tail,
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
    ...props
}: InfinityListProps<TData>) {
    const Root = (as ?? "div") as "div";
    const isList = as === "ul" || as === "ol";
    const ItemRoot = isList ? "li" : "div";

    const previousScrollHeightRef = useRef<number | undefined>(undefined);
    const previousScrollTopRef = useRef<number | undefined>(undefined);
    const onTriggerRef = useRefOf(onTrigger);
    const {
        hasMore,
        hasPrevious,
        error: loadError,
        isLoading,
        items: uncontrolledItems,
        loadMore,
        loadPrevious,
    } = useInfinityList({ defaultItems, initialPageIndex, pageSize, tail, loader });
    const isControlled = items !== undefined;
    const allItems = items ?? uncontrolledItems;
    const onErrorRef = useRefOf(onError);
    const {
        elementRef: rootRef,
        handleScroll,
        handleWheel,
        refresh,
    } = useScrollObserver({
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
            if (!isControlled && hasPrevious) {
                previousScrollHeightRef.current = element.scrollHeight;
                previousScrollTopRef.current = element.scrollTop;
                void loadPrevious();
            }
        },
    });

    useEffect(() => {
        if (loadError !== undefined) {
            onErrorRef.current?.(loadError);
        }
    }, [loadError]);

    useEffect(() => {
        const root = rootRef.current;
        if (
            !root ||
            isLoading ||
            loading ||
            (!isControlled && (!hasMore || loadError !== undefined)) ||
            (tail !== undefined && allItems.length >= tail * (pageSize ?? (defaultItems?.length || 20))) ||
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
    }, [allItems, loadError, hasMore, isControlled, isLoading, loadMore, loading, tail]);

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
        refresh();
    }, [allItems]);

    return (
        <Root
            ref={(element) => {
                rootRef.current = element;
            }}
            className={className}
            onScroll={handleScroll}
            onWheel={(event) => {
                onWheel?.(event);
                if (!event.defaultPrevented) {
                    handleWheel(event);
                }
            }}
            {...(props as ComponentProps<"div">)}
        >
            {children(allItems)}
            {!!loadError &&
                (error === undefined || typeof error === "string" ? (
                    <ItemRoot {...(errorProps as object)} className={cn("py-3", errorProps?.className)}>
                        <p className="text-sm text-center text-destructive">
                            {error ?? "Failed to load items"}
                        </p>
                    </ItemRoot>
                ) : (
                    error
                ))}
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
