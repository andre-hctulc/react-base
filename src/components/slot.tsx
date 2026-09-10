import { cloneElement, isValidElement, type ComponentProps, type ElementType, type ReactNode } from "react";

export type SlotProps<T extends ElementType = ElementType> = Partial<ComponentProps<T>> & {
    children: ReactNode;
};

export const Slot = <T extends ElementType = ElementType>(props: SlotProps<T>) => {
    const { children, ...restProps } = props;

    if (!isValidElement(children)) {
        return children;
    }

    return cloneElement(children, restProps as any);
};
