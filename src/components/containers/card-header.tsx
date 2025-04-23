import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf } from "../../types/index.js";
import clsx from "clsx";
import { Icon } from "../icons/icon.js";
import { Title } from "../text/title.js";
import type { CSSProperties, FC, ReactNode } from "react";

const cardHeader = tv({
    variants: {
        border: {
            true: "border-b",
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
        border: true,
    },
});

interface CardHeaderProps extends VariantProps<typeof cardHeader> {
    children?: ReactNode;
    className?: string;
    title?: ReactNode;
    titleProps?: PropsOf<typeof Title>;
    badges?: ReactNode;
    actions?: ReactNode;
    style?: CSSProperties;
    innerProps?: PropsOf<"div">;
    icon?: ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    as?: any;
}

export const CardHeader: FC<CardHeaderProps> = ({
    children,
    className,
    title,
    size,
    border,
    badges,
    actions,
    innerProps,
    iconProps,
    icon,
    titleProps,
    as,
    ...props
}) => {
    const renderInner = !!title || !!actions || !!badges || !!icon;
    const Comp = as || "div";

    return (
        <Comp className={cardHeader({ className, size, border })} style={props.style}>
            {renderInner && (
                <div {...innerProps} className={clsx("flex items-center gap-3", innerProps?.className)}>
                    {icon && <Icon {...iconProps}>{icon}</Icon>}
                    {badges}
                    <Title variant="h4" {...titleProps}>
                        {title}
                    </Title>
                    {actions && <div className="ml-auto min-w-0">{actions}</div>}
                </div>
            )}
            {children}
        </Comp>
    );
};
