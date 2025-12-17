import { Spinner } from "flowbite-react";
import type { PropsOf } from "../../types";
import type { FC } from "react";

interface IconButtonSpinnerProps extends PropsOf<typeof Spinner> {}

export const IconButtonSpinner: FC<IconButtonSpinnerProps> = (props) => {
    return <Spinner color="gray" light size="sm" {...props} />;
};
