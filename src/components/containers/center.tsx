import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { type ComponentProps, type FC } from "react";

export interface CenterProps extends ComponentProps<"div"> {}

/**
 * A container that centers its children both horizontally and vertically.
 */
export const Center: FC<CenterProps> = ({ className, ref, ...props }) => {
    return (
        <div ref={ref} className={twMerge("flex items-center justify-center", className)} {...props}>
            {props.children}
        </div>
    );
};

/**
 * A container that centers its children horizontally.
 */
export const CenterH: FC<CenterProps> = ({ className, ref, ...props }) => {
    return (
        <div ref={ref} className={twMerge("flex justify-center", className)} {...props}>
            {props.children}
        </div>
    );
};

/**
 * A container that centers its children vertically.
 */
export const CenterV: FC<CenterProps> = ({ className, ref, ...props }) => {
    return (
        <div ref={ref} className={twMerge("flex items-center", className)} {...props}>
            {props.children}
        </div>
    );
};
