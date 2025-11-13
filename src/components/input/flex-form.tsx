"use client";

import { useResolveT } from "../../hooks/index.js";
import type { PropsOf } from "../../types/index.js";
import {
    flexDirection,
    flexWrap,
    withGap,
    type BaseTheme,
    type TProps,
    type WithFlexDirection,
    type WithFlexWrap,
    type WithGap,
} from "../../util/style.js";
import { createTheme } from "flowbite-react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        flexForm: FlexFormTheme;
    }

    interface FlowbiteProps {
        flexForm: Partial<WithoutThemingProps<FlexFormProps>>;
    }
}

interface FlexFormTheme extends BaseTheme, WithFlexDirection, WithFlexWrap, WithGap {}

const flexForm = createTheme<FlexFormTheme>({
    base: "flex",
    direction: flexDirection,
    wrap: flexWrap,
    ...withGap,
    defaultVariants: {
        gap: "md",
        direction: "col",
    },
});

export type FlexFormProps = TProps<FlexFormTheme> & PropsOf<"form">;

/**
 * Use `formEventToFormData` or `formEventToValues` to convert form event to values.
 */
export const FlexForm: React.FC<FlexFormProps> = (props) => {
    const { children, className, restProps } = useResolveT("flexForm", flexForm, props);
    return (
        <form className={className} {...restProps}>
            {children}
        </form>
    );
};
