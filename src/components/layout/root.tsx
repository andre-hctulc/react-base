"use client";

import type { FC, ComponentProps } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import {
    flexDirection,
    flexGrow,
    overflow,
    withHeight,
    withScroll,
    type BaseTheme,
    type Overflow,
    type TProps,
    type WithFlexDirection,
    type WithGrow,
    type WithHeight,
    type WithScroll,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { FlowbiteBoolean } from "flowbite-react/types";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        root: RootTheme;
    }

    interface FlowbiteProps {
        root: Partial<WithoutThemingProps<RootProps>>;
    }
}

export interface RootTheme extends BaseTheme, WithFlexDirection, WithHeight, WithGrow, WithScroll {
    relative: FlowbiteBoolean;
    overflow: Overflow;
    bg: Record<"none" | "1" | "2" | "3" | "4", string>;
}

const root = createTheme<RootTheme>({
    base: "max-w-full box-border flex",
    direction: flexDirection,
    ...withHeight,
    grow: flexGrow,
    overflow,
    ...withScroll,
    relative: {
        on: "relative",
        off: "",
    },
    bg: {
        none: "",
        "1": "bg-paper",
        "2": "bg-paper-2",
        "3": "bg-paper-3",
        "4": "bg-paper-4",
    },
    defaultVariants: {
        direction: "col",
        grow: true,
    },
});

export interface RootProps extends TProps<RootTheme>, ComponentProps<"div"> {}

/**
 * A flex container. Use it as contextual root container for your layout.
 */
export const Root: FC<RootProps> = (props) => {
    const { className, restProps, children } = useResolveT("root", root, props);

    return (
        <div className={className} {...restProps}>
            {children}
        </div>
    );
};
