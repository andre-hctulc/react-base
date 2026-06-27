import type { ElementType } from "react";
import { ColorText, type ColorTextProps } from "./color-text";

export const ErrorText = <T extends ElementType = "p">(props: ColorTextProps<T>) => {
    return <ColorText<T> color="error" {...props} />;
};
