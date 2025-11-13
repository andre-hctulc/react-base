import type {
    JSXElementConstructor,
    ComponentProps,
    CSSProperties,
    ReactNode,
    JSX,
    Ref,
    ElementType,
} from "react";
import type { IconFC } from "../components";

// #### Props ####

/**
 * Alias for react's {@link ComponentProps}
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

export interface ASProps<T extends ElementType> {
    /**
     * The element type to render as
     */
    as?: T;
}

export type RichAsProps<T extends ElementType> = ComponentProps<T> & {
    /**
     * The element type to render as
     */
    as?: T;
};
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
    icon?: IconFC;
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
