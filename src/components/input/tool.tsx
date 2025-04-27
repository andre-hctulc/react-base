"use client";

import { cloneElement, type ReactElement, type ReactNode } from "react";
import { usePromise } from "../../hooks/index.js";
import type { PartialPropsOf } from "../../types/index.js";
import { Tooltip } from "../dialog/tooltip.js";

type Action<T> = (data: any, ...arg: any[]) => T | Promise<T>;

export interface ToolBaseProps {
    loading?: boolean;
    onClick?: (...args: any) => void;
}

/**
 * @template T - The type of the action result
 * @template D - The type of the data passed to the action
 * @template E - The type of the error passed to the onError callback
 */
export interface ToolProps<T = any, D = any, E = unknown> {
    /**
     * The action to be performed. Errors are caught and handled by the {@link onError} callback.
     */
    action: Action<T>;
    tooltip?: ReactNode;
    tooltipProps?: PartialPropsOf<typeof Tooltip>;
    onSuccess?: (data: T) => void;
    onError?: (error: E) => void;
    data?: D;
    children: ReactElement<ToolBaseProps>;
}

/**
 * ### Props
 * - `action` - The action to be performed. Errors are caught and handled by the `onError` callback.
 * - `onSuccess` - Callback when the action is successful
 * - `onError` - Callback when the action fails
 *
 * @template T - The type of the action result
 * @template D - The type of the data passed to the action
 * @template E - The type of the error passed to the onError callback
 */
export const Tool = <T = any, D = any, E = unknown>({
    action,
    tooltip,
    children,
    tooltipProps,
    onError,
    onSuccess,
    data,
    ...props
}: ToolProps<T, D, E>) => {
    const { isPending, promise } = usePromise<T, E>({ onError, onSuccess });

    function act(...args: any[]) {
        // transform to promise
        const prom = async () => action(data, ...args);
        promise(prom());
    }

    const btn = cloneElement(children, {
        onClick: (...args: any[]) => {
            children.props.onClick?.(...args);
            act(...args);
        },
        loading: children.props.loading || isPending,
        ...props,
    });

    if (tooltip) {
        return (
            <Tooltip content={tooltip} {...tooltipProps}>
                {btn as any}
            </Tooltip>
        );
    }

    return btn;
};
