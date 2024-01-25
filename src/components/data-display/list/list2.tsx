"use client";

import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { ReactElement } from "react";

export default function List2(props: { style?: React.CSSProperties; className?: string; children: ReactElement | ReactElement[] }) {
    return (
        <Stack style={{ ...props.style }} className={props.className} tag="ol">
            {props.children}
        </Stack>
    );
}
