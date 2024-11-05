"use client";

import type { TVCProps, XStyleProps } from "../../types";
import { IconButton } from "../input";
import { tv, type VariantProps } from "tailwind-variants";

const dialogHeader = tv({
    base: "flex items-center justify-between px-6 pt-5 gap-2 box-border",
    variants: {},
    defaultVariants: {},
});

interface DialogHeaderProps extends Omit<TVCProps<typeof dialogHeader, "div">, "title"> {
    closeIcon?: React.ReactNode;
    onClose?: () => void;
    title?: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
    title,
    className,
    onClose,
    closeIcon,
    ...props
}) => {
    return (
        <div className={dialogHeader({ className })} style={props.style}>
            {typeof title === "string" ? <h2 className="text-lg/6 font-medium">{title}</h2> : title}
            {onClose && (
                <IconButton onClick={() => onClose()} variant="text" color="neutral" className="ml-auto">
                    {closeIcon || "×"}
                </IconButton>
            )}
        </div>
    );
};
