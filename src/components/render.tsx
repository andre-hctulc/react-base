import type { ComponentRenderFn } from "@base-ui/react";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

export function render<P = unknown, S = any>(
    renderer: ReactElement<P> | ComponentRenderFn<P, S> | undefined,
    children: ReactNode,
    props?: P,
    state?: S,
): ReactNode {
    if (renderer === undefined) {
        return children;
    }
    let element: ReactElement | null = null;
    if (isValidElement(renderer)) {
        element = renderer;
    } else {
        element = renderer(props || ({} as P), state as S);
    }
    return cloneElement(element, { ...props }, children);
}

export type RenderProp<P = unknown, S = any> = ReactElement<P> | ComponentRenderFn<P, S>;

interface _RenderProps<P = unknown, S = any> {
    render: RenderProp<P, S> | undefined;
    children?: ReactNode;
    props?: P;
    state?: S;
}

export const Render = <P, S = any>({ render: renderer, children, props, state }: _RenderProps<P, S>) => {
    return render(renderer, children, props, state);
};

export interface RenderProps<P = unknown, S = any> {
    render?: RenderProp<P, S>;
}
