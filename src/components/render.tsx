import { mergeProps } from "@base-ui/react";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type Props = Record<string, unknown>;
type ElementFactory<P = unknown, S = unknown> = (props: P, state: S) => ReactElement;

export function render<P = any, S = any>(
    renderer: ReactElement<P> | ElementFactory<P, S> | undefined,
    children: ReactNode,
    props?: P,
    state?: S,
): ReactNode {
    if (renderer === undefined) {
        return children;
    }

    const childProps = isValidElement(children) ? children.props : { children };
    const renderProps = { ...(childProps as Props), ...(props as Props | undefined) } as P;

    if (typeof renderer === "function") {
        return renderer(renderProps, (state ?? {}) as S);
    }

    return cloneElement(renderer, mergeProps(renderProps as Props, renderer.props as Props) as Partial<P>);
}

export type RenderProp<P = any, S = any> = ReactElement<P> | ElementFactory<P, S>;

interface _RenderProps<P = any, S = any> {
    render: RenderProp<P, S> | undefined;
    children?: ReactNode;
    props?: P;
    state?: S;
}

export function Render<P = any, S = any>({ render: renderer, children, props, state }: _RenderProps<P, S>) {
    return render(renderer, children, props, state);
}

export interface RenderProps<P = any, S = any> {
    render?: RenderProp<P, S>;
}
