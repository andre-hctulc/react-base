import { Spinner } from "flowbite-react";
import { ButtonIcon } from "./button-icon";
import type { PropsOf } from "../../types";
import type { FC } from "react";

interface ButtonSpinnerProps extends PropsOf<typeof Spinner> {}

export const ButtonSpinner: FC<ButtonSpinnerProps> = (props) => {
    return (
        <ButtonIcon>
            <Spinner color="gray" light size="sm" {...props} />
        </ButtonIcon>
    );
};
