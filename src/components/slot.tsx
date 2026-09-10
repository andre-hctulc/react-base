import type { ComponentProps, JSX, JSXElementConstructor } from "react";

export type SlotProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any> =
    ComponentProps<T> & {
        children: T;
    };

export const Slot = <T extends JSXElementConstructor<any>>(props: SlotProps<T>) => {
    const { children, ...restProps } = props;
    return <children.type {...restProps}>{children.props.children}</children.type>;
};
