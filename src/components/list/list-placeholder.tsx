"use client";

import { type FC } from "react";
import { Placeholder, type PlaceholderProps } from "../placeholder/placeholder.js";
import type { PropsOf } from "../../types/index.js";

export interface ListPlaceholderProps extends PlaceholderProps<"li"> {}

/**
 * Place this inside a *table body* to show a placeholder when there is no data.
 */
export const ListPlaceholder: FC<ListPlaceholderProps> = (props) => {
    return <Placeholder as="li" grow py="md" {...props} />;
};
