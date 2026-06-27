"use client";

import type { FC } from "react";
import { Tabs, tabsTheme, type TabsProps, type TabsTheme } from "flowbite-react";
import { useResolveExtendT } from "../../hooks";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        tabsList: TabsTheme;
    }

    interface FlowbiteProps {
        tabsList: Partial<WithoutThemingProps<TabsProps>>;
    }
}

/**
 * Tabs without content container.
 */
export const TabsList: FC<TabsProps> = ({ children, className, ...props }) => {
    const { theme, restProps } = useResolveExtendT<TabsTheme>(
        "tabsList",
        tabsTheme,
        { tabitemcontainer: { base: "hidden" } },
        props,
    );

    return (
        <Tabs className={className} theme={theme} {...restProps}>
            {children}
        </Tabs>
    );
};
