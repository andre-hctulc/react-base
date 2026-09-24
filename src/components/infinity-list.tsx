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
    initialPageIndex: number;
    pageSize: number;
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
    initialPageIndex,
    pageSize,
}: UseInfinityListOptions<TData>): UseInfinityListResult<TData> {
    const [allItems, setAllItems] = useState<TData[]>([]);
    const [error, setError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrevious, setHasPrevious] = useState(initialPageIndex > 0);

    const abortController = useRef<AbortController | null>(null);
    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const hasPreviousRef = useRef(initialPageIndex > 0);
    const firstPageIndexRef = useRef(initialPageIndex);
    const lastPageIndexRef = useRef(initialPageIndex);
    const allItemsRef = useRef(allItems);
    const loaderRef = useRefOf(loader);
    const tailRef = useRefOf(tail);

    const appendItems = useCallback((newItems: TData[]) => {
        const tailLength = tailRef.current === undefined ? Infinity : Math.max(0, tailRef.current) * pageSize;
        const retainedItems = tailLength === Infinity ? newItems : newItems.slice(-tailLength);
        const removedItems = newItems.length - retainedItems.length;
        if (removedItems) {
            firstPageIndexRef.current += Math.ceil(removedItems / pageSize);
            if (firstPageIndexRef.current > 0) {
                hasPreviousRef.current = true;
                setHasPrevious(true);
            }
        }
        allItemsRef.current = retainedItems;
        setAllItems(retainedItems);
    }, []);

    const prependItems = useCallback((newItems: TData[]) => {
        const tailLength = tailRef.current === undefined ? Infinity : Math.max(0, tailRef.current) * pageSize;
        const retainedItems = tailLength === Infinity ? newItems : newItems.slice(0, tailLength);
        const removedItems = newItems.length - retainedItems.length;
        if (removedItems) {
            lastPageIndexRef.current =
                firstPageIndexRef.current + Math.ceil(retainedItems.length / pageSize) - 1;
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
            const retainedItems = currentItems.slice(-Math.max(0, tail) * pageSize);
            allItemsRef.current = retainedItems;
            return retainedItems;
        });
    }, [tail]);

    useEffect(
        () => () => {
            const currentAbortController = abortController.current;
            currentAbortController?.abort();
            if (abortController.current === currentAbortController) {
                abortController.current = null;
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        },
        [],
    );

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
                pageSize,
                allItemsRef.current,
                currentAbortController.signal,
            );
            if (currentAbortController.signal.aborted) {
                return { err: undefined, data: null };
            }
            if (newItems.length < pageSize) {
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
            if (abortController.current === currentAbortController) {
                abortController.current = null;
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
                pageSize,
                allItemsRef.current,
                currentAbortController.signal,
            );
            if (currentAbortController.signal.aborted) {
                return { err: undefined, data: null };
            }
            if (newItems.length < pageSize || pageIndex === 0) {
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
            if (abortController.current === currentAbortController) {
                abortController.current = null;
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        }

        return { err: undefined, data: newItems };
    }, [prependItems]);

    return { error, hasMore, hasPrevious, isLoading, items: allItems, loadMore, loadPrevious };
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
    /**
     * Maximum number of pages to keep in the list.
     * @default Infinity
     */
    tail?: number;
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
    onError?: (error: unknown) => void;
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
} & Omit<HTMLProps<HTMLElement>, "children" | "as" | "onScroll" | "onWheel">;

const MAX_HEIGHT = "4000px";

export function InfinityList<TData = any>({
    className,
    children,
    items,
    initialPageIndex,
    pageSize = 10,
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
    maxHeight,
    style,
    empty,
    emptyProps,
    preChildren,
    postChildren,
    ref,
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
        hasPrevious,
        error: loadError,
        isLoading,
        items: uncontrolledItems,
        loadMore,
        loadPrevious,
    } = useInfinityList({ initialPageIndex: initialPageIndex ?? 0, pageSize, tail, loader });
    const isControlled = items !== undefined;
    const allItems = items ?? uncontrolledItems;
    const onErrorRef = useRefOf(onError);
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
            (tail !== undefined && allItems.length >= tail * pageSize) ||
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
            className={className}
            onScroll={handleScroll}
            onWheel={(event) => {
                onWheel?.(event);
                if (!event.defaultPrevented) {
                    handleWheel(event);
                }
            }}
            // Always set max height to prevent the list from growing indefinitely
            style={{ ...style, maxHeight: maxHeight ?? MAX_HEIGHT }}
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
