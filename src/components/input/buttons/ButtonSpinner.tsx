import type { PropsOf } from "../../../types";
import Spinner from "../../feedback/Spinner";

interface ButtonSpinnerProps extends PropsOf<typeof Spinner> {}

/** Kann als `Button.endIcon` verwendet werden, um ein Ladezustand in einem Button anzuzeigen. */
export default function ButtonSpinner(props: ButtonSpinnerProps) {
    return <Spinner className="ml-3" size={14} {...props} />;
}
