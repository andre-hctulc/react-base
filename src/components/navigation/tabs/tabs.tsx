"use client";

import React from "react";
import clsx from "clsx";
import type { PropsOf } from "../../../types";
import { mapChildren } from "../../../util";
import Tab from "./Tab";
import useMutableSearchParams from "../../../hooks/navigation/useMutableSearchParams";
import Toolbar from "../../layout/Toolbar";
import useCurrentPathname from "../../../hooks/dom/useCurrentPathname";

interface TabsProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    variant?: PropsOf<typeof Tab>["variant"];
    onChange?: (tabId: string | number) => void;
    /**
     * Aktive `Tab.id`. Alternativ kann auch `searchParam` angegeben werden. Dann wird die aktive Id aus Diesem gelesen.
     * */
    activeId?: string | number;
    /**
     * Extrahiert das aktive Tab aus diesem _Search-Parameter_.
     * Siehe auch `activeId`
     * */
    searchParam?: string;
    defaultId?: string | number;
}

export default function Tabs(props: TabsProps) {
    const [searchParams, setSearchParam] = useMutableSearchParams();
    const pathname = useCurrentPathname();
    const children = mapChildren<PropsOf<typeof Tab>>(props.children, child => {
        if (child.type !== Tab) return null;

        const tabIsActive = () => {
            if (typeof child.props.active === "boolean") return child.props.active;
            if (props.activeId !== undefined && child.props.id === props.activeId) return true;
            if (child.props.href) return child.props.href === pathname;
            if (props.searchParam) {
                let paramValue = searchParams.get(props.searchParam);
                if (paramValue === null && props.defaultId !== undefined) paramValue = props.defaultId + "";
                return child.props.id?.toString() === paramValue;
            }
            return false;
        };

        return {
            props: {
                ...child.props,
                // Siehe props.activeId
                active: tabIsActive(),
                variant: child.props.variant || props.variant,
                onClick: e => {
                    child.props.onClick?.(e);

                    if (!e.defaultPrevented && child.props.id !== undefined) {
                        props.onChange?.(child.props.id);
                        // Search Param Routing
                        if (props.searchParam) setSearchParam(props.searchParam, child.props.id);
                    }
                },
            },
        };
    });

    return (
        <Toolbar
            spacing={props.variant === "chips" ? "large" : "none"}
            tag="nav"
            className={clsx("items-end flex-shrink-0", props.className)}
            style={props.style}
            padding="none"
        >
            {children}
        </Toolbar>
    );
}
