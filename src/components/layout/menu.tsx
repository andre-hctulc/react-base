import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types";
import { CollapseH } from "../transitions";
import { IconButton } from "../input";
import { XIcon } from "../icons/x";

const menu = tv({
    base: "box-border w-full",
    variants: {
        size: {
            none: "",
            sm: "w-[250px]",
            md: "w-[350px]",
            lg: "w-[450px]",
            responsive: "w-full sm:w-[200px] md:w-[300px] lg:w-[400px]",
        },
        position: {
            left: "left-0",
            right: "right-0 ml-auto",
        },
        border: {
            true: "",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
        },
    },
    compoundVariants: [
        {
            position: "right",
            border: true,
            class: "border-l",
        },
        {
            position: ["left"],
            border: true,
            class: "border-r",
        },
    ],
    defaultVariants: {
        size: "md",
        position: "left",
        border: true,
    },
});

interface MenuProps extends VariantProps<typeof menu>, StyleProps {
    children?: React.ReactNode;
    /** @default true */
    closable?: boolean;
    open?: boolean;
    as?: any;
    onClose?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
    children,
    style,
    className,
    size,
    as,
    open,
    closable,
    position,
    shadow,
    border,
    onClose,
}) => {
    const Comp = as || "div";

    return (
        <CollapseH show={!!open}>
            <Comp
                className={menu({
                    className,
                    size,
                    position,
                    shadow,
                    border,
                })}
                style={style}
            >
                {closable !== false && (
                    <div className="p-3">
                        <IconButton className="ml-auto" onClick={() => onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </div>
                )}
                {children}
            </Comp>
        </CollapseH>
    );
};
