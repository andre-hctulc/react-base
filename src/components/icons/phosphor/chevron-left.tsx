import { type FC } from "react";
import type { PropsOf } from "../../../types/index.js";
import { Icon } from "../icon.js";

interface ChevronLeftIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ChevronLeftIcon: FC<ChevronLeftIconProps> = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
            </svg>
        </Icon>
    );
};
