import { collapse } from "@dre44/util";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { LinkComponent, LinkProps, PropsOf, TVCProps } from "../../types/index.js";
import { Subtitle } from "../text/subtitle.js";
import { Icon } from "../icons/icon.js";
import { CheckCircleIcon } from "../icons/check-circle.js";
import { XCircleIcon } from "../icons/x-circle.js";

const checklist = tv({
    base: "",
    variants: {
        size: {
            sm: "space-y-1",
            md: "space-y-1.5",
            lg: "space-y-2",
            xl: "space-y-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

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
}

interface ChecklistProps extends TVCProps<typeof checklist, "ol">, ComponentProps {
    items: ChecklistItem[];
    checkedIcon?: ReactNode;
    uncheckedIcon?: ReactNode;
    checked?: string | string[] | ((item: ChecklistItem) => boolean);
}

export const Checklist: FC<ChecklistProps> = ({
    className,
    items,
    checkedIcon,
    uncheckedIcon,
    checked,
    titleProps,
    textProps,
    secondaryTextProps,
    iconProps,
    size = "md",
    LinkComponent,
    linkProps,
    ...props
}) => {
    const cIcon = checkedIcon || <CheckCircleIcon />;
    const uncIcon = uncheckedIcon || <XCircleIcon />;
    const iconSize = collapse(size, {
        sm: "md",
        md: "lg",
        lg: "2xl",
        xl: "4xl",
    } as const);
    const iconClasses = collapse(size, {
        sm: "mt-0.5 mr-2",
        md: "mt-0.5 mr-2.5",
        lg: "mt-0.5 mr-3",
        xl: "mr-4",
    } as const);
    const textClasses = collapse(size, {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    } as const);
    const secTextClasses = collapse(size, {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
    } as const);
    const subtitleVariant = collapse(size, {
        sm: "h5",
        md: "h4",
        lg: "h3",
        xl: "h2",
    } as const);
    const mainClasses = collapse(size, {
        sm: "",
        md: "",
        lg: "",
        xl: "pt-1",
    } as const);

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
        <ol {...props} className={checklist({ className, size })}>
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
                                    className={clsx(
                                        iconClasses,
                                        iconProps?.className,
                                        item.iconProps?.className
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
                                        className={clsx(
                                            textClasses,
                                            item.textProps?.className,
                                            textProps?.className
                                        )}
                                    >
                                        {item.text}
                                    </p>
                                )}
                                {item.secondaryText && (
                                    <p
                                        {...secondaryTextProps}
                                        {...item.secondaryTextProps}
                                        className={clsx(
                                            "text-sm ",
                                            secTextClasses,
                                            secondaryTextProps?.className,
                                            item.secondaryTextProps?.className
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
