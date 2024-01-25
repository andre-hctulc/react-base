"use client";

import clsx from "clsx";
import IconButton from "../../input/buttons/IconButton/IconButton";
import ChevronLeftIcon from "@react-client/components/icons/collection/chevron-left";
import ChevronRightIcon from "@react-client/components/icons/collection/chevron-right";
import ChevronDoubleLeftIcon from "@react-client/components/icons/collection/chevron-double-left";
import ChevronDoubleRightIcon from "@react-client/components/icons/collection/chevron-double-right";
import useMutableSearchParams from "@react-client/hooks/navigation/useMutableSearchParams";
import { range } from "@client-util/iterables";
import React from "react";
import { searchParamToPage } from "@client-util/nav";

interface PaginationProps {
    searchParam?: string;
    style?: React.CSSProperties;
    className?: string;
    /** @default 1 */
    max?: number;
    noPb?: boolean;
    onPageChange?: (pageIndex: number) => void;
}

export default function Pagination(props: PaginationProps) {
    const classes = clsx("flex flex-row space-x-3 items-center justify-center pt-4 flex-shrink-0", !props.noPb && "pb-4", props.className);
    const buttonClasses = "rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0 select-none";
    const buttonActiveClasses = " bg-primary text-primary-contrast-text";
    const buttonInActiveClasses = " border-[1.5px] bg-bg-paper text-text-secondary text-accent hover:bg-primary/10 active:bg-primary/40 cursor-pointer";
    const [searchParams, setSearchParam] = useMutableSearchParams();
    const paramName = props.searchParam || "page";
    const [_, currentPage] = searchParamToPage(searchParams?.get(paramName));
    const pages = React.useMemo<{
        leftCount: number;
        rightCount: number;
        nextPage: number;
        nextFarPage: number;
        backPage: number;
        backFarPage: number;
        nextDisabled: boolean;
        backDisabled: boolean;
        max: number;
    }>(() => {
        const max = Math.max(props.max || 1, 1);

        return {
            max,
            leftCount: Math.min(2, currentPage - 2),
            rightCount: Math.min(2, max - (currentPage + 2)),
            nextPage: currentPage + 1,
            nextFarPage: Math.min(max, currentPage + 10),
            backPage: currentPage - 1,
            backFarPage: Math.max(1, currentPage - 10),
            nextDisabled: currentPage >= max,
            backDisabled: currentPage <= 1,
        };
    }, [currentPage, props.max]);

    function setPage(pageIndex: number) {
        props.onPageChange?.(pageIndex);
        setSearchParam(paramName, pageIndex);
    }

    return (
        <nav className={classes}>
            <div className="flex-row flex flex-grow justify-start">
                <IconButton disabled={pages.backDisabled} onClick={() => setPage(pages.backFarPage)}>
                    <ChevronDoubleLeftIcon />
                </IconButton>
                <IconButton disabled={pages.backDisabled} onClick={() => setPage(pages.backPage)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            {range(pages.leftCount)
                .reverse()
                .map(page => (
                    <button key={`pages-left-${page}`} className={buttonClasses + buttonInActiveClasses} onClick={() => setPage(page)}>
                        {currentPage - page + 1}
                    </button>
                ))}
            <span className={buttonClasses + buttonActiveClasses}>{currentPage}</span>
            {range(pages.rightCount).map(page => (
                <button className={buttonClasses + buttonInActiveClasses} key={`pages-right-${page}`} onClick={() => setPage(page)}>
                    {currentPage + page + 1}
                </button>
            ))}
            <div className="flex-row flex flex-grow justify-end">
                <IconButton disabled={pages.nextDisabled} onClick={() => setPage(pages.nextPage)}>
                    <ChevronRightIcon />
                </IconButton>
                <IconButton disabled={pages.nextDisabled} onClick={() => setPage(pages.nextFarPage)}>
                    <ChevronDoubleRightIcon />
                </IconButton>
            </div>
        </nav>
    );
}
