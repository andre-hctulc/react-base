import { type FC } from "react";
import { Placeholder, type PlaceholderProps } from "../placeholder/placeholder.js";
import { Spinner } from "flowbite-react";

export interface ListSpinnerProps extends PlaceholderProps<"li"> {}

/**
 * Place this inside a *table body* to show a placeholder when there is no data.
 */
export const ListSpinner: FC<ListSpinnerProps> = (props) => {
    return (
        <Placeholder as="li" grow py="lg" {...props}>
            <Spinner size="md" {...props} />
        </Placeholder>
    );
};
