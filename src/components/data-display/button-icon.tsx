import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { cloneElement, type FC, type ReactElement } from "react";

interface ButtonIconProps {
    children: ReactElement<{ className?: string }>;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ children }) => {
    return cloneElement(children, {
        className: twMerge(children.props.className, "first:mr-3 last:ml-3"),
    });
};
