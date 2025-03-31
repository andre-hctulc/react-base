import { type FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";

interface ExclamationMarkIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ExclamationMarkIcon: FC<ExclamationMarkIconProps> = (props) => {
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
                    d="M148 200a20 20 0 1 1-20-20a20 20 0 0 1 20 20m-20-40a12 12 0 0 0 12-12V48a12 12 0 0 0-24 0v100a12 12 0 0 0 12 12"
                />
            </svg>
        </Icon>
    );
};
