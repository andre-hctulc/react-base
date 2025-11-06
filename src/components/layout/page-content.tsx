"use client";

import { type FC, type ComponentProps } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type {
    BaseTheme,
    TProps,
    WithAlignItems,
    WithFlex,
    WithGrow,
    WithHeight,
    WithJustifyContent,
    WithPadding,
    WithWidth,
} from "../../util/style.js";
import {
    alignItems,
    flexDirection,
    flexGrow,
    justifyContent,
    withHeight,
    withPadding,
    withWidth,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        pageContent: PageContentTheme;
    }
}

export interface PageContentTheme
    extends BaseTheme,
        WithPadding,
        WithHeight,
        WithWidth,
        WithJustifyContent,
        WithAlignItems,
        WithFlex,
        WithGrow {}

const pageContent = createTheme<PageContentTheme>({
    base: "max-w-full box-border",
    ...withHeight,
    ...withWidth,
    justifyContent,
    alignItems,
    flex: flexDirection,
    grow: flexGrow,
    ...withPadding,
    defaultVariants: {
        p: "md",
        width: "full",
    },
});

export interface PageContentProps extends ComponentProps<"main">, TProps<PageContentTheme> {}

/**
 * Use this inside a `Page` component to display page content.
 */
export const PageContent: FC<PageContentProps> = (props) => {
    const { className, restProps, children } = useResolveT("pageContent", pageContent, props);

    return (
        <main className={className} {...restProps}>
            {children}
        </main>
    );
};
