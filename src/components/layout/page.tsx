"use client";

import { type FC, type ComponentProps } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import {
    flexDirection,
    flexGrow,
    noShrink,
    withHeight,
    type BaseTheme,
    type TProps,
    type WithFlex,
    type WithGrow,
    type WithHeight,
    type WithNoShrink,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { FlowbiteSizes } from "flowbite-react/types";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        page: PageTheme;
    }
}

export interface PageTheme extends BaseTheme, WithHeight, WithGrow, WithNoShrink, WithFlex {
    sticky: Record<"true", string>;
    width: FlowbiteSizes & { full: string };
    bg: Record<"none" | "1" | "2" | "3" | "4", string>;
}

const page = createTheme<PageTheme>({
    base: "box-border w-full min-h-0",
    sticky: {
        true: "sticky top-0 z-10",
    },
    width: {
        xs: "max-w-xl mx-auto",
        sm: "max-w-2xl mx-auto",
        md: "max-w-3xl mx-auto",
        lg: "max-w-4xl mx-auto",
        xl: "max-w-5xl mx-auto",
        "2xl": "max-w-6xl mx-auto",
        "3xl": "max-w-7xl mx-auto",
        "4xl": "max-w-8xl mx-auto",
        "5xl": "max-w-8xl mx-auto",
        "6xl": "max-w-8xl mx-auto",
        "7xl": "max-w-8xl mx-auto",
        full: "w-full",
    },
    noShrink,
    grow: flexGrow,
    ...withHeight,
    flex: flexDirection,
    bg: {
        none: "",
        "1": "bg-paper",
        "2": "bg-paper2",
        "3": "bg-paper3",
        "4": "bg-paper4",
    },
    defaultVariants: {
        width: "lg",
        variant: "default",
        noShrink: true,
    },
});

export interface PageProps extends TProps<PageTheme>, ComponentProps<"div"> {}

/**
 * A `Page` vertically centers its content. Generally there should only be one `Page` per route.
 */
export const Page: FC<PageProps> = (props) => {
    const { className, restProps, children } = useResolveT("page", page, props);

    return (
        <div className={className} {...restProps}>
            {children}
        </div>
    );
};

/**
 * {@link Page} alias
 */
export const PageLike = Page;
