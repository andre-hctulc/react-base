"use client";

import useLocalStorage from "@react-client/hooks/storage/use-current-local-storage";
import clsx from "clsx";
import React from "react";
import FilterIcon from "@react-client/components/icons/collection/filter";
import useMutableSearchParams from "@react-client/hooks/navigation/use-mutable-search-params";
import { defaultFilterParser, defaultFilterStringifier } from "./filter-utility";
import ToggleButton from "../buttons/toggle-button";
import Fade from "@react-client/components/transitions/fade";
import JSForm, { useFormData } from "../form/js-form";
import { SearchParam } from "@client-util/nav";

const openCacheKey = (key: string) => `filter-${key}:open`;

interface FilterProps<F extends {}> {
    children: React.ReactNode;
    cacheKey: string;
    onChange?: (value: Partial<F>) => void;
    className?: string;
    style?: React.CSSProperties;
    defaultValue: Partial<F> | string;
    /** Search param name @default "layout" */
    searchParam?: string;
    search?: boolean;
    defaultOpen?: boolean;
    alwaysOpen?: boolean;
}

export default function Filter<F extends {}>(props: FilterProps<F>) {
    const searchParamName = props.searchParam || SearchParam.filter;
    const [open, setOpen] = useLocalStorage<boolean>(openCacheKey(props.cacheKey), false);
    const defaultValue = typeof props.defaultValue === "string" ? defaultFilterParser(props.defaultValue) : props.defaultValue;
    const classes = clsx("flex items-start justify-end space-x-4 pointer-events-auto ", props.className);
    const [searchParams, setSearchParam] = useMutableSearchParams();
    const { formProps, data } = useFormData(defaultValue);

    React.useEffect(() => {
        props.onChange?.(data);

        if (props.search) {
            const valueStr = defaultFilterStringifier(data);
            setSearchParam(searchParamName, valueStr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className={classes} style={props.style}>
            <Fade in={open}>
                <JSForm style={{ gap: 15, flexDirection: "unset" }} className="flex flex-wrap max-w-full max-h-[400px] items-end justify-end flex-grow" {...formProps}>
                    {props.children}
                </JSForm>
            </Fade>
            {!props.alwaysOpen && (
                <ToggleButton value={"open"} active={open} className="self-start" onClick={() => setOpen(!open)}>
                    <FilterIcon />
                </ToggleButton>
            )}
        </div>
    );
}
