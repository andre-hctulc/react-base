import React from "react";
import type { PropsOf } from "../../types";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";

interface CheckIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const CheckIcon = React.forwardRef<HTMLElement, CheckIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
            </svg>
        </Icon>
    );
});

CheckIcon.displayName = withPrefix("CheckIcon");
