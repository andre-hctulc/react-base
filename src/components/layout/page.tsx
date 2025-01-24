import React from "react";
import { withPrefix } from "../../util/system";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types";
import { Skeleton } from "../data-display";
import { PageContent } from "./page-content";
import type { Root } from "./root";
import { Spinner } from "../data-display/spinner";

const page = tv({
    base: "box-border w-full min-h-0 ",
    variants: {
        size: {
            "4xs": "max-w-xl mx-auto",
            "3xs": "max-w-2xl mx-auto",
            "2xs": "max-w-3xl mx-auto",
            xs: "max-w-4xl mx-auto",
            sm: "max-w-5xl mx-auto",
            md: "max-w-6xl mx-auto",
            lg: "max-w-7xl mx-auto",
            xl: "max-w-8xl mx-auto",
            full_width: "w-full",
        },
        variant: {
            default: "",
            flex_row: "flex",
            flex_col: "flex flex-col",
            center: "flex items-center justify-center",
        },
        noShrink: {
            true: "flex-shrink-0",
        },
        grow: {
            true: "flex-grow",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
        minHeight0: {
            true: "min-h-0",
        },
        fullHeight: {
            true: "h-full",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
    },
    defaultVariants: {
        size: "lg",
        variant: "default",
    },
});

interface PageProps extends VariantProps<typeof page>, StyleProps {
    children?: React.ReactNode;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
    (
        {
            children,
            variant,
            className,
            grow,
            size,
            maxHeightFull,
            minHeight0,
            fullHeight,
            style,
            flex,
            noShrink,
        },
        ref
    ) => {
        return (
            <div
                className={page({
                    size,
                    flex,
                    noShrink,
                    className,
                    grow,
                    maxHeightFull,
                    minHeight0,
                    fullHeight,
                    variant,
                })}
                ref={ref}
                style={style}
            >
                {children}
            </div>
        );
    }
);

/**
 * Use this to align elements inside a {@link Root} like a {@link Page}
 */
export const PageLike = Page;

Page.displayName = withPrefix("Page");

interface PageSkeletonProps extends Omit<PageProps, "children"> {
    body?: React.ReactNode;
}

export const PageSkeleton: React.FC<PageSkeletonProps> = ({ className, body, ...props }) => {
    return (
        <Page {...props}>
            <PageContent fullHeight>
                <div className="flex gap-3">
                    <Skeleton className="w-1/2 max-w-[300px]" shape="rounded_xl" height={43}></Skeleton>
                    <Skeleton className="ml-auto" size={43} shape="circle" />
                    <Skeleton size={43} shape="circle" />
                </div>
                {body ?? (
                    <>
                        <div className="flex mt-10 md:mt-14 gap-5 flex-wrap">
                            <Skeleton width={350} height={250} />
                            <div className="space-y-4">
                                <Skeleton width={350} height={43} />
                                <Skeleton width={100} height={30} />
                                <Skeleton width={200} height={30} />
                                <Skeleton width={120} height={30} />
                            </div>
                        </div>
                        <div className="mt-14 space-y-4">
                            <Skeleton className="w-3/4" height={100} />
                            <Skeleton className="w-full" height={100} />
                            <Skeleton className="w-1/2" height={100} />
                        </div>
                    </>
                )}
            </PageContent>
        </Page>
    );
};

interface SpinnerPageProps extends Omit<PageProps, "children"> {
    spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ className, spinnerSize, ...props }) => {
    return (
        <Page {...props}>
            <PageContent fullHeight flex="col" className="items-center justify-center">
                <Spinner size={spinnerSize || "2xl"} />
            </PageContent>
        </Page>
    );
};
