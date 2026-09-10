import {
    cloneElement,
    isValidElement,
    type ComponentProps,
    type ElementType,
    type ReactElement,
} from "react";

export type SlotProps<T extends ElementType = ElementType> = ComponentProps<T> & {
    children: ReactElement<ComponentProps<T>>;
};

export const Slot = <T extends ElementType = ElementType>(props: SlotProps<T>) => {
    const { children, ...restProps } = props;

    if (!isValidElement(children)) {
        throw new Error("Slot requires exactly one valid React element child.");
    }

    return cloneElement(children, restProps);
};
