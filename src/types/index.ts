import type {
    JSXElementConstructor,
    ComponentProps,
    CSSProperties,
    ReactNode,
    ComponentType,
    ReactElement,
} from "react";
import type { VariantProps } from "tailwind-variants";

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

/**
 * Children props
 */
export interface ChildrenProps {
    /**
     * Child elements
     */
    children?: ReactNode;
}

export interface RequiredChildrenProps {
    children: ReactNode;
}

/**
 * A Helper type for a `tailwind-variants` component's props.
 * It bundles the variant props with the root element's props.
 * @template T tailwind-variant object
 * @template R Root element type
 */
export type TVCProps<
    T extends (...args: any) => any,
    R extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> | never = never
> = VariantProps<T> & Omit<ComponentProps<R>, "className"> & StyleProps;


// #### Components ####

export type LinkComponent = ComponentType<{ href: any; className?: string }>;

// #### Helpers ####

export type Falsy = null | undefined | "" | 0 | false;

/**
 * General purpose choice type
 */
export interface Choice<D = any> {
    /**
     * The value of the choice. Should be unique among the choices
     */
    value: string;
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
export interface LabeledChoice<D = any> extends Choice<D> {
    /**
     * The label to display
     */
    label: React.ReactNode;
    /**
     * Icon to display next to the label
     */
    icon?: React.ReactNode;
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
