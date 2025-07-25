import { type FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";

interface CheckFatIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const CheckFactIcon: FC<CheckFatIconProps> = (props) => {
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
                    d="m243.31 90.91l-128.4 128.4a16 16 0 0 1-22.62 0l-71.62-72a16 16 0 0 1 0-22.61l20-20a16 16 0 0 1 22.58 0L104 144.22l96.76-95.57a16 16 0 0 1 22.59 0l19.95 19.54a16 16 0 0 1 .01 22.72"
                />
            </svg>
        </Icon>
    );
};
