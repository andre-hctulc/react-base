"use client";

import React from "react";
import ListIcon from "@react-client/components/icons/collection/list";
import ToggleButtonGroup from "./buttons/toggle-button-group";
import ToggleButton from "./buttons/toggle-button";
import GridOutlineIcon from "@react-client/components/icons/collection/grid-outline";
import useMutableSearchParams from "@react-client/hooks/navigation/use-mutable-search-params";
import { SearchParam } from "@client-util/nav";

export type Layout = "list" | "grid";

interface LayoutSelectProps {
    size?: "medium" | "small";
    defaultValue?: Layout;
    className?: string;
    style?: React.CSSProperties;
    /** Aktiviert das Setzen des search params on change. */
    search?: boolean;
    /** Search param name @default "layout" */
    searchParam?: string;
    value?: Layout;
    onChange?: (newLayout: Layout) => void;
    noBorder?: boolean;
    noBorderRadius?: boolean;
}

function getLayout(searchParams: URLSearchParams, searchParam: string = SearchParam.layout): Layout | undefined {
    const paramValue = searchParams.get(searchParam);
    if (paramValue === "grid") return "grid";
    else if (paramValue === "list") return "list";
    else return undefined;
}

export default function LayoutSelect(props: LayoutSelectProps) {
    const paramName = props.searchParam || SearchParam.layout;
    const [searchParams, setSearchParam] = useMutableSearchParams();
    const defaultValue = props.defaultValue || "list";
    const value: Layout = props.value || (props.search ? getLayout(searchParams, paramName) || defaultValue : defaultValue);

    function changeLayout(value: Layout) {
        props.onChange?.(value);
        if (props.search) setSearchParam(paramName, value);
    }

    return (
        <ToggleButtonGroup noBorderRadius={props.noBorderRadius} noBorder={props.noBorder} style={props.style} className={props.className} value={value}>
            <ToggleButton size={props.size} onClick={() => changeLayout("list")} value={"list"}>
                <ListIcon />
            </ToggleButton>
            <ToggleButton size={props.size} onClick={() => changeLayout("grid")} value={"grid"}>
                <GridOutlineIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
