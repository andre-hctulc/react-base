import clsx from "clsx";
import { cloneElement, type FC, type ReactElement, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeWrapper = tv({
    base: "absolute",
    variants: {
        position: {
            "top-left": "top-0 left-0",
            "top-right": "top-0 right-0",
            "bottom-left": "bottom-0 left-0",
            "bottom-right": "bottom-0 right-0",
        },
        baseShape: {
            circle: "",
            square: "",
            sharp: "",
            rounded: "",
        },
    },
    compoundVariants: [
        // square
        {
            position: ["top-left", "top-right"],
            baseShape: "square",
            className: "translate-y-[-50%]",
        },
        {
            position: ["bottom-left", "bottom-right"],
            baseShape: "square",
            className: "translate-y-[50%]",
        },
        {
            position: ["top-left", "bottom-left"],
            baseShape: "square",
            className: "translate-x-[-50%]",
        },
        {
            position: ["top-right", "bottom-right"],
            baseShape: "square",
            className: "translate-x-[50%]",
        },
        // circle
        {
            position: ["top-left", "top-right"],
            baseShape: "circle",
            className: "translate-y-[25%]",
        },
        {
            position: ["bottom-left", "bottom-right"],
            baseShape: "circle",
            className: "translate-y-[-25%]",
        },
        {
            position: ["top-left", "bottom-left"],
            baseShape: "circle",
            className: "translate-x-[25%]",
        },
        {
            position: ["top-right", "bottom-right"],
            baseShape: "circle",
            className: "translate-x-[-25%]",
        },
        // rounded
        {
            position: ["top-left", "top-right"],
            baseShape: "rounded",
            className: "translate-y-[5%]",
        },
        {
            position: ["bottom-left", "bottom-right"],
            baseShape: "rounded",
            className: "translate-y-[-5%]",
        },
        {
            position: ["top-left", "bottom-left"],
            baseShape: "rounded",
            className: "translate-x-[5%]",
        },
        {
            position: ["top-right", "bottom-right"],
            baseShape: "rounded",
            className: "translate-x-[-5%]",
        },
    ],
    defaultVariants: {
        position: "top-right",
        baseShape: "square",
    },
});

interface BadgifyProps extends VariantProps<typeof badgeWrapper> {
    badge: ReactNode;
    children: ReactElement<{ className?: string; children?: ReactNode }>;
    /**
     * Badge active?
     *
     * If false, the children are rendered as received
     *
     * @default true
     */
    active?: boolean;
}

export const Badgify: FC<BadgifyProps> = ({ badge, baseShape, children, position, active }) => {
    if (active === false) {
        return children;
    }
    return cloneElement(children, {
        className: clsx("relative overflow-visible", children.props.className),
        children: (
            <>
                {children.props.children}
                {badge && <div className={badgeWrapper({ position, baseShape })}>{badge}</div>}
            </>
        ),
    });
};
