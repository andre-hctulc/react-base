import { useAlerts } from "@react-client/contexts/alert-context";
import { mapChildren } from "@react-client/util";
import clsx from "clsx";
import React from "react";

interface CopyProps {
    children: React.ReactElement<{ className?: string; onClick?: (...args: any) => void }>;
    text: string | undefined | null;
    successMessage?: string;
}

export default function Copy(props: CopyProps) {
    const { success } = useAlerts();
    const child = mapChildren(
        props.children,
        child => ({
            props: {
                ...child.props,
                onClick: (...args: any) => {
                    child.props.onClick?.(...args);
                    if (props.text) {
                        navigator.clipboard.writeText(props.text);
                        success(props.successMessage || "Kopiert");
                    }
                },
                className: clsx(props.text && "cursor-pointer", child.props.className),
            },
        }),
        true
    );

    return <>{child}</>;
}
