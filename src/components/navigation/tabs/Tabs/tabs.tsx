"use client";

import Toolbar from "@react-client/components/layout/containers/Toolbar/Toolbar";
import { mapChildren } from "@react-client/util";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Tab from "../Tab/Tab";
import useMutableSearchParams from "@react-client/hooks/navigation/useMutableSearchParams";
import { PropsOf } from "@react-client/types";

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
    const pathname = usePathname();
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
        <Toolbar spacing={props.variant === "chips" ? "large" : "none"} tag="nav" className={clsx("items-end", props.className)} style={props.style} padding="none">
            {children}
        </Toolbar>
    );
}
