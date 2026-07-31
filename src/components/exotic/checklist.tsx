import { collapse } from "@dre44/util/objects";
import type { FC, ReactNode } from "react";
import type { LinkComponent, LinkProps, PropsOf, StyleProps } from "../../types/index.js";
import { Subtitle } from "../text/subtitle.js";
import { Icon } from "../icons/icon.js";
import { cn } from "@/util/cn.js";
import { Check, X } from "lucide-react";

const sizeMap = {
    sm: "space-y-1.5",
    md: "space-y-3",
    lg: "space-y-4.5",
    xl: "space-y-7",
} as const;

type ChecklistSize = keyof typeof sizeMap;

interface ComponentProps {
    titleProps?: PropsOf<typeof Subtitle>;
    textProps?: PropsOf<"p">;
    secondaryTextProps?: PropsOf<"p">;
    iconProps?: PropsOf<typeof Icon>;
    LinkComponent?: LinkComponent;
    linkProps?: LinkProps;
}

export interface ChecklistItem extends ComponentProps {
    key: string;
    title?: ReactNode;
    text?: string;
    secondaryText?: string;
    checked?: boolean;
    href?: string;
    disabled?: boolean;
    secondary?: boolean;
}

export type ChecklistProps = StyleProps &
    ComponentProps & {
        size?: ChecklistSize;
        items: ChecklistItem[];
        checkedIcon?: ReactNode;
        uncheckedIcon?: ReactNode;
        checked?: string | string[] | ((item: ChecklistItem) => boolean);
    };

export const Checklist: FC<ChecklistProps> = ({
    size = "md",
    items,
    checkedIcon,
    uncheckedIcon,
    checked,
    titleProps,
    textProps,
    secondaryTextProps,
    iconProps,
    LinkComponent,
    linkProps,
    className,
    style,
}) => {
    const cIcon = checkedIcon || <Check />;
    const uncIcon = uncheckedIcon || <X />;
    const iconSize = collapse(
        {
            sm: "md",
            md: "lg",
            lg: "2xl",
            xl: "4xl",
        } as const,
        size,
    );
    const iconClasses = collapse(
        {
            sm: "mt-0.5 mr-2",
            md: "mt-0.5 mr-3",
            lg: "mt-0.5 mr-3.5",
            xl: "mr-4",
        } as const,
        size,
    );
    const textClasses = collapse(
        {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
            xl: "text-lg",
        } as const,
        size,
    );

    const secTextClasses = collapse(
        {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
            xl: "text-lg",
        } as const,
        size,
    );
    const subtitleVariant = collapse(
        {
            sm: "h5",
            md: "h4",
            lg: "h3",
            xl: "h2",
        } as const,
        size,
    );
    const mainClasses = collapse(
        {
            sm: "",
            md: "",
            lg: "",
            xl: "pt-1",
        } as const,
        size,
    );

    const isChecked = (item: ChecklistItem): boolean => {
        if (item.checked) {
            return true;
        }
        if (typeof checked === "function") {
            return checked(item);
        }
        if (Array.isArray(checked)) {
            return checked.includes(item.key);
        }
        if (typeof checked === "string") {
            return checked === item.key;
        }
        return false;
    };

    return (
        <ol className={cn(collapse(sizeMap, size), className)} style={style}>
            {items.map((item) => {
                const checked = isChecked(item);
                const Comp: any = item.href ? item.LinkComponent || LinkComponent || "a" : "div";
                const p = item.href ? { ...linkProps, href: item.href } : {};

                return (
                    <li key={item.key}>
                        <Comp className="flex" {...p}>
                            <div className="">
                                <Icon
                                    color={checked ? "success" : "error"}
                                    size={iconSize}
                                    {...iconProps}
                                    {...item.iconProps}
                                    className={cn(
                                        iconClasses,
                                        iconProps?.className,
                                        item.iconProps?.className,
                                    )}
                                >
                                    {checked ? cIcon : uncIcon}
                                </Icon>
                            </div>
                            <div className={mainClasses}>
                                {item.title && (
                                    <Subtitle variant={subtitleVariant} {...titleProps} {...item.titleProps}>
                                        {item.title}
                                    </Subtitle>
                                )}
                                {item.text && (
                                    <p
                                        {...textProps}
                                        {...item.textProps}
                                        className={cn(
                                            textClasses,
                                            item.disabled && "text-t-4 line-through",
                                            item.secondary && "text-t-3",
                                            item.textProps?.className,
                                            textProps?.className,
                                        )}
                                    >
                                        {item.text}
                                    </p>
                                )}
                                {item.secondaryText && (
                                    <p
                                        {...secondaryTextProps}
                                        {...item.secondaryTextProps}
                                        className={cn(
                                            " text-t-2",
                                            secTextClasses,
                                            secondaryTextProps?.className,
                                            item.secondaryTextProps?.className,
                                        )}
                                    >
                                        {item.secondaryText}
                                    </p>
                                )}
                            </div>
                        </Comp>
                    </li>
                );
            })}
        </ol>
    );
};
