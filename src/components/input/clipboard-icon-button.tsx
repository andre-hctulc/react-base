"use client";

import { CheckIcon, type ButtonProps, ClipboardListIcon } from "flowbite-react";
import { useRef, useState, type ElementType } from "react";
import { IconButton } from "./icon-button";
import type { PropsOf } from "../../types";

type ClipboardIconButtonProps<T extends ElementType = "button"> = PropsOf<typeof IconButton<T>> & {
    onCopySuccess?: () => void;
    valueToCopy: string;
    /**
     * @default 2000
     */
    timeout?: number;
};

export const ClipboardIconButton = <T extends ElementType = "button">({
    valueToCopy,
    onCopySuccess,
    onClick,
    timeout,
    ...props
}: ClipboardIconButtonProps<T>) => {
    const [copied, setCopied] = useState(false);
    const currentTimeout = useRef<NodeJS.Timeout | null>(null);

    return (
        <IconButton<"button">
            onClick={(e) => {
                if (currentTimeout.current) {
                    clearTimeout(currentTimeout.current);
                }
                navigator.clipboard.writeText(valueToCopy).then(() => {
                    setCopied(true);
                    onCopySuccess?.();
                    currentTimeout.current = setTimeout(() => setCopied(false), timeout ?? 2000);
                });
                onClick?.(e);
            }}
            {...props}
        >
            {copied ? <CheckIcon /> : <ClipboardListIcon />}
        </IconButton>
    );
};
