import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";

interface CheckCircleIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const CheckCircleIcon: FC<CheckCircleIconProps> = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path
                    fill="currentColor"
                    d="M172.24 99.76a6 6 0 0 1 0 8.48l-56 56a6 6 0 0 1-8.48 0l-24-24a6 6 0 0 1 8.48-8.48L112 151.51l51.76-51.75a6 6 0 0 1 8.48 0M230 128A102 102 0 1 1 128 26a102.12 102.12 0 0 1 102 102m-12 0a90 90 0 1 0-90 90a90.1 90.1 0 0 0 90-90"
                />
            </svg>
        </Icon>
    );
};
