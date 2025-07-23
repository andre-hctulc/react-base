import { tv, type VariantProps } from "tailwind-variants";
import type { PartialPropsOf, PropsOf } from "../../types/index.js";
import clsx from "clsx";
import { Icon } from "../icons/icon.js";
import { Title } from "../text/title.js";
import type { CSSProperties, FC, ReactNode } from "react";

const cardHeader = tv({
    variants: {
        border: {
            true: "border-b",
            false: "",
        },
        size: {
            none: "",
            xs: "p-1.5",
            sm: "p-2 ",
            md: "p-3",
            lg: "p-5",
            xl: "p-7",
            "2xl": "p-10",
        },
    },
    defaultVariants: {
        size: "md",
        border: false,
    },
});

interface CardHeaderProps extends VariantProps<typeof cardHeader> {
    children?: ReactNode;
    className?: string;
    title?: ReactNode;
    titleProps?: PartialPropsOf<typeof Title>;
    /**
     * Rendered before the title and after the icon
     */
    badges?: ReactNode;
    /**
     * Rendered before the title
     */
    start?: ReactNode;
    /**
     * Rendered after the title
     */
    end?: ReactNode;
    /**
     * Rendered at the top of the card header
     */
    pre?: ReactNode;
    style?: CSSProperties;
    innerProps?: PropsOf<"div">;
    icon?: ReactNode;
    iconProps?: PartialPropsOf<typeof Icon>;
    as?: any;
}

/**
 * ### Props
 * - `title`: Title of the card
 * - `size`: Padding size
 * - `border`: Whether to show a border
 * - `badges`: Content rendered before the title and after the icon
 * - `start`: Rendered before the title
 * - `end`: Rendered after the title
 * - `pre`: Rendered at the top of the card header
 */
export const CardHeader: FC<CardHeaderProps> = ({
    children,
    className,
    title,
    size,
    border,
    badges,
    end,
    innerProps,
    iconProps,
    icon,
    start,
    titleProps,
    as,
    pre,
    ...props
}) => {
    const renderInner = !!title || !!end || !!badges || !!icon;
    const Comp = as || "div";

    return (
        <Comp className={cardHeader({ className, size, border })} style={props.style}>
            {pre}
            {renderInner && (
                <div {...innerProps} className={clsx("flex items-center gap-3", innerProps?.className)}>
                    {start}
                    {icon && <Icon {...iconProps}>{icon}</Icon>}
                    {badges}
                    <Title variant="h4" {...titleProps}>
                        {title}
                    </Title>
                    {end && <div className="ml-auto min-w-0">{end}</div>}
                </div>
            )}
            {children}
        </Comp>
    );
};
