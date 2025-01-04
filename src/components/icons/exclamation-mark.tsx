import React from "react";
import type { PropsOf } from "../../types";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";

interface ExclamationMarkIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ExclamationMarkIcon = React.forwardRef<HTMLElement, ExclamationMarkIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path
                    fill="currentColor"
                    d="M148 200a20 20 0 1 1-20-20a20 20 0 0 1 20 20m-20-40a12 12 0 0 0 12-12V48a12 12 0 0 0-24 0v100a12 12 0 0 0 12 12"
                />
            </svg>
        </Icon>
    );
});

ExclamationMarkIcon.displayName = withPrefix("ExclamationMarkIcon");
