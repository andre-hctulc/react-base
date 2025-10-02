import { tv, type VariantProps } from "tailwind-variants";
import type { PartialPropsOf, PropsOf } from "../../types/index.js";
import clsx from "clsx";
import { Icon } from "../icons/icon.js";
import { Title } from "../text/title.js";
import type { CSSProperties, FC, ReactNode } from "react";
import { Subtitle } from "../text/subtitle.js";
import { collapse } from "@dre44/util/objects";

const cardHeader = tv({
    variants: {
        border: {
            true: "border-b",
            false: "",
        },
        size: {
            none: "",
            xs: "p-2",
            sm: "p-3 ",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
            "2xl": "p-10",
            "3xl": "p-14",
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
    subtitle?: ReactNode;
    subtitleProps?: PartialPropsOf<typeof Subtitle>;
    /**
     * Rendered after the title
     */
    after?: ReactNode;
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
 * - `after`: Content rendered after the title
 * - `start`: Rendered before the title
 * - `end`: Rendered after the title
 * - `pre`: Rendered at the top of the card header
 */
export const CardHeader: FC<CardHeaderProps> = ({
    children,
    className,
    title,
    size = "md",
    border,
    after,
    end,
    innerProps,
    iconProps,
    icon,
    start,
    titleProps,
    as,
    pre,
    subtitle,
    subtitleProps,
    ...props
}) => {
    const renderMain = !!title || !!end || !!after || !!icon || !!start;
    const Comp = as || "div";

    return (
        <Comp className={cardHeader({ className, size, border })} style={props.style}>
            {pre}
            {renderMain && (
                <div {...innerProps} className={clsx("flex items-center gap-3", innerProps?.className)}>
                    {start}
                    {!!(title || icon) && (
                        <Title
                            icon={icon}
                            variant={collapse(size, {
                                xs: "h5",
                                sm: "h5",
                                md: "h4",
                                lg: "h3",
                                xl: "h2",
                                "2xl": "h1",
                                "3xl": "h1",
                                none: "h4",
                            } as const)}
                            {...titleProps}
                        >
                            {title}
                        </Title>
                    )}
                    {after}
                    {end && <div className="ml-auto min-w-0">{end}</div>}
                </div>
            )}
            {subtitle && (
                <Subtitle
                    variant={collapse(size, {
                        xs: "h5",
                        sm: "h5",
                        md: "h4",
                        lg: "h4",
                        xl: "h3",
                        "2xl": "h2",
                        "3xl": "h2",
                        none: "h5",
                    } as const)}
                    {...subtitleProps}
                    className={clsx(
                        renderMain &&
                            collapse(size, {
                                xs: ["mt-1"],
                                sm: ["mt-1"],
                                md: ["mt-2"],
                                lg: ["mt-2.5"],
                                xl: ["mt-3"],
                                "2xl": ["mt-4"],
                                "3xl": ["mt-5"],
                                none: ["mt-2"],
                            } as const),
                        subtitleProps?.className
                    )}
                >
                    {subtitle}
                </Subtitle>
            )}
            {children}
        </Comp>
    );
};
