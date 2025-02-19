import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { withPrefix } from "../../util/system";
import { tv } from "tailwind-variants";
import { Skeleton } from "../data-display";
import { PageContent } from "./page-content";
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
            true: "shrink-0",
        },
        grow: {
            true: "grow",
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
export const Page = React.forwardRef(({ children, variant, className, grow, size, maxHeightFull, minHeight0, fullHeight, style, flex, noShrink, }, ref) => {
    return (_jsx("div", { className: page({
            size,
            flex,
            noShrink,
            className,
            grow,
            maxHeightFull,
            minHeight0,
            fullHeight,
            variant,
        }), ref: ref, style: style, children: children }));
});
/**
 * Use this to align elements inside a {@link Root} like a {@link Page}
 */
export const PageLike = Page;
Page.displayName = withPrefix("Page");
export const PageSkeleton = ({ className, body, ...props }) => {
    return (_jsx(Page, { ...props, children: _jsxs(PageContent, { fullHeight: true, children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(Skeleton, { className: "w-1/2 max-w-[300px]", shape: "rounded_xl", height: 43 }), _jsx(Skeleton, { className: "ml-auto", size: 43, shape: "circle" }), _jsx(Skeleton, { size: 43, shape: "circle" })] }), body ?? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex mt-10 md:mt-14 gap-5 flex-wrap", children: [_jsx(Skeleton, { width: 350, height: 250 }), _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { width: 350, height: 43 }), _jsx(Skeleton, { width: 100, height: 30 }), _jsx(Skeleton, { width: 200, height: 30 }), _jsx(Skeleton, { width: 120, height: 30 })] })] }), _jsxs("div", { className: "mt-14 space-y-4", children: [_jsx(Skeleton, { className: "w-3/4", height: 100 }), _jsx(Skeleton, { className: "w-full", height: 100 }), _jsx(Skeleton, { className: "w-1/2", height: 100 })] })] }))] }) }));
};
export const SpinnerPage = ({ className, spinnerSize, ...props }) => {
    return (_jsx(Page, { ...props, children: _jsx(PageContent, { fullHeight: true, flex: "col", className: "items-center justify-center", children: _jsx(Spinner, { size: spinnerSize || "2xl" }) }) }));
};
