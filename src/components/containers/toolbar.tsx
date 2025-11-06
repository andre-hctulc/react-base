"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
    alignItems,
    flexDirection,
    flexGrow,
    flexWrap,
    justifyContent,
    noShrink,
    withGap,
    withPadding,
    withScroll,
    type BaseTheme,
    type TProps,
    type WithAlignItems,
    type WithFlexDirection,
    type WithFlexWrap,
    type WithGap,
    type WithGrow,
    type WithJustifyContent,
    type WithNoShrink,
    type WithPadding,
    type WithScroll,
} from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import type { RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import { type FC, type ElementType } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        toolbar: ToolbarTheme;
    }

    interface FlowbiteProps {
        toolbar: Partial<WithoutThemingProps<ToolbarProps>>;
    }
}

export interface ToolbarTheme
    extends BaseTheme,
        WithFlexDirection,
        WithGap,
        WithPadding,
        WithAlignItems,
        WithJustifyContent,
        WithGrow,
        WithNoShrink,
        WithFlexWrap,
        WithScroll {
    mlAuto: FlowbiteBoolean;
}

const toolbar = createTheme<ToolbarTheme>({
    base: "flex min-w-0",
    direction: flexDirection,
    ...withScroll,
    ...withGap,
    ...withPadding,
    justifyContent: justifyContent,
    alignItems: alignItems,
    grow: flexGrow,
    wrap: flexWrap,
    noShrink,
    mlAuto: {
        on: "ml-auto",
        off: "",
    },
});

type ToolbarProps<T extends ElementType = "div"> = RichAsProps<T> &
    TProps<ToolbarTheme> & {
        stopEventPropagation?: boolean;
    };

/**
 * ### Props
 * - `stopEventPropagation`
 */
export const Toolbar: FC<ToolbarProps> = (props) => {
    const { className, children } = useResolveT("toolbar", toolbar, props);
    const Comp: any = props.as || "div";

    return (
        <Comp
            className={twMerge(className)}
            ref={props.ref as any}
            onClick={
                props.stopEventPropagation
                    ? (e: React.MouseEvent<any>) => {
                          e.stopPropagation();
                          props.onClick?.(e);
                      }
                    : props.onClick
            }
            {...props}
        >
            {children}
        </Comp>
    );
};
