// /**
//  * Single input value
//  */
// export type SingleInputValue = string | number | boolean | File;

// /**
//  * Array of valid input value types
//  */
// export type InputValueArray = string[] | number[] | boolean[] | File[];

// /**
//  * Valid input value types
//  */
// export type InputValue = SingleInputValue | InputValueArray;

/**
 * Input base properties. Each input component's props should conform this interface.
 */
export interface InputLikeProps<T = any, E extends object = {}> {
    /**
     * Default value of the input
     */
    defaultValue?: T;
    /**
     * Controlled value of the input
     */
    value?: T;
    /**
     * Callback when the value of the input changes
     */
    onChange?: (value: { value: T } & E) => void;
    /**
     * Name of the input element
     */
    name?: string;
    /**
     * Required?
     */
    required?: boolean;
    /**
     * Disabled?
     */
    disabled?: boolean;
    /**
     * Read only?
     */
    readOnly?: boolean;
    /**
     * Id associated with the input element
     */
    id?: string;
}
