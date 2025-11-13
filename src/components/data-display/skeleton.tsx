"use client";

import { createTheme } from "flowbite-react";
// @ts-ignore
import "./skeleton.css";
import { withPrefix } from "../../util/system.js";
import type { ElementType } from "react";
import {
    shape,
    withMargin,
    withPadding,
    withWidthAndHeight,
    type BaseTheme,
    type TProps,
    type WithMargin,
    type WithPadding,
    type WithShape,
    type WithWidthAndHeight,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { RichAsProps } from "../../types/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        skeleton: SkeletonTheme;
    }

    interface FlowbiteProps {
        skeleton: Partial<WithoutThemingProps<SkeletonProps>>;
    }
}

export interface SkeletonTheme extends BaseTheme, WithShape, WithPadding, WithMargin, WithWidthAndHeight {}

const skeleton = createTheme<SkeletonTheme>({
    base: [withPrefix("Skeleton"), "animate-skeleton"].join(" "),
    shape,
    ...withPadding,
    ...withMargin,
    ...withWidthAndHeight,
    defaultVariants: {
        p: "md",
        shape: "rounded-md"
    },
});

export type SkeletonProps<T extends ElementType = "div"> = TProps<SkeletonTheme> &
    RichAsProps<T> & {
        /**
         * The content is always rendered, but hidden.
         * Does not work for text nodes.
         * @default true
         */
        occupy?: boolean;
        /**
         * Is skeleton active?
         *
         * `false`: Render children as received
         *
         * @default true
         */
        active?: boolean;
    };

/***
 * ### Props
 * - `occupy` - Whether to occupy the space of children
 * - `active` - Whether skeleton is active (false renders children normally)
 * - `shape` - Border radius of skeleton
 * - `padding` - Internal padding
 */
export const Skeleton = <T extends ElementType = "div">(props: SkeletonProps<T>) => {
    const { className, children, restProps } = useResolveT("skeleton", skeleton, props);
    const { occupy, active, as, ...rootProps } = restProps;
    const Comp: any = as || "div";

    if (active === false) {
        return children;
    }

    return (
        <Comp data-children-occupy-space={occupy} className={className} {...rootProps}>
            {occupy !== false && children}
        </Comp>
    );
};
