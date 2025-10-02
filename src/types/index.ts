import type {
    JSXElementConstructor,
    ComponentProps,
    CSSProperties,
    ReactNode,
    JSX,
    Ref,
    ElementType,
} from "react";
import type { VariantProps } from "tailwind-variants";
import type { ListItem } from "../components/index.js";

// #### Props ####

/**
 * Alias for {@link ComponentProps}
 */
export type PropsOf<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = ComponentProps<T>;

export type PartialPropsOf<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Partial<
    PropsOf<T>
>;

/**
 * Style and class name props.
 */
export interface StyleProps {
    /**
     * Inline style
     */
    style?: CSSProperties;
    /**
     * CSS classes
     */
    className?: string;
}

export type ChildrenProps<T extends ReactNode = ReactNode> = {
    /**
     * Child nodes
     */
    children?: T;
};

export type RefProps<T extends HTMLElement = HTMLElement> = {
    /**
     * Ref to the root element
     */
    ref?: Ref<T>;
};

export interface RequiredChildrenProps {
    children: ReactNode;
}

// /**
//  * A Helper type for a `tailwind-variants` component's props.
//  * It bundles the variant props with the root element's props.
//  * @template T tailwind-variant object
//  * @template R Root element type
//  */
// export type TVCProps<
//     T extends (...args: any) => any,
//     R extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> | never = never
// > = VariantProps<T> & Omit<ComponentProps<R>, "className"> & StyleProps;

export type ELEMENT = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export interface ASProps<T extends ELEMENT> {
    /**
     * The element type to render as
     */
    as?: T;
}

export type RichAsProps<T extends ELEMENT> = ComponentProps<T> & {
    /**
     * The element type to render as
     */
    as?: T;
};

export type WithTVProps<T extends object, E extends (...args: any) => any> = VariantProps<E> &
    Omit<T, keyof VariantProps<E>>;

// #### Components ####

export type LinkProps = PropsOf<"a">;

export type LinkComponent = ElementType<LinkProps & { href: string }>;

// #### Helpers ####

export type Falsy = null | undefined | "" | 0 | false;

/**
 * General purpose choice type
 */
export interface Choice<V = string, D = any> {
    /**
     * The value of the choice. Should be unique among the choices
     */
    value: V;
    /**
     * Data associated with the choice
     */
    data?: D;
    /**
     * Choice disabled?
     */
    disabled?: boolean;
    listItemProps?: PartialPropsOf<typeof ListItem>;
}

/**
 * Choice with a label
 */
export interface LabeledChoice<V = string, D = any> extends Choice<V, D> {
    /**
     * The label to display
     */
    label: ReactNode;
    /**
     * Icon to display next to the label
     */
    icon?: ReactNode;
}

// #### Colors ####

export type ThemeColorSet = {
    bg: string;
    /**
     * bg alpha
     */
    bgA: (alpha: number) => string;
    border: string;
    text: string;
    /**
     * contrast text color
     */
    textC: string;
};
