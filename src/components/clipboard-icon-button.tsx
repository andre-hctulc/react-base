"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button.js";

export interface ClipboardIconButtonProps extends ComponentProps<typeof Button> {
    onCopySuccess?: () => void;
    valueToCopy: string;
    /**
     * @default 2000
     */
    timeout?: number;
}

export const ClipboardIconButton = ({
    valueToCopy,
    onCopySuccess,
    onClick,
    timeout,
    ...props
}: ClipboardIconButtonProps) => {
    const [copied, setCopied] = useState(false);
    const currentTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
                if (currentTimeout.current) clearTimeout(currentTimeout.current);
                navigator.clipboard.writeText(valueToCopy).then(() => {
                    setCopied(true);
                    onCopySuccess?.();
                    currentTimeout.current = setTimeout(() => setCopied(false), timeout ?? 2000);
                });
                onClick?.(e);
            }}
            {...props}
        >
            {copied ? <Check /> : <ClipboardList />}
        </Button>
    );
};
