/**
 * Input base properties. Each input component's props should conform this interface.
 */
export interface InputLikeProps<T = any, E = any> {
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
    onChange?: (e: E & { value: T }) => void;
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
