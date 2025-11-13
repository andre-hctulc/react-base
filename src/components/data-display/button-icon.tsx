import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { cloneElement, type FC, type ReactElement } from "react";

interface ButtonIconProps {
    children: ReactElement<{ className?: string }>;
    right?: boolean;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ children, right }) => {
    return cloneElement(children, {
        // TODO
        // do this with css. 
        // PROBLEM: last, first selectors do not work with the button text.
        className: twMerge(children.props.className, "", right ? "ml-3" : "mr-3"),
    });
};
