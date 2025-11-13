"use client";

import { collapse } from "@dre44/util/objects";
import type { FC, ReactNode } from "react";
import type { LinkComponent, LinkProps, PropsOf, StyleProps } from "../../types/index.js";
import { Subtitle } from "../text/subtitle.js";
import { Icon } from "../icons/icon.js";
import { CheckCircleIcon } from "../icons/phosphor/check-circle.js";
import { XCircleIcon } from "../icons/phosphor/x-circle.js";
import type { BaseTheme, TProps } from "../../util/style.js";
import { createTheme } from "flowbite-react";
import { useResolveT } from "../../hooks/index.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        checklist: ChecklistTheme;
    }

    interface FlowbiteProps {
        checklist: Partial<WithoutThemingProps<ChecklistProps>>;
    }
}

export interface ChecklistTheme extends BaseTheme {
    size: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

const checklist = createTheme<ChecklistTheme>({
    base: "",
    size: {
        sm: "space-y-1",
        md: "space-y-1.5",
        lg: "space-y-2",
        xl: "space-y-3",
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

type ChecklistProps = TProps<ChecklistTheme> &
    StyleProps &
    ComponentProps & {
        items: ChecklistItem[];
        checkedIcon?: ReactNode;
        uncheckedIcon?: ReactNode;
        checked?: string | string[] | ((item: ChecklistItem) => boolean);
    };

export const Checklist: FC<ChecklistProps> = (props) => {
    const { restProps, children, className } = useResolveT("checklist", checklist, props);
    const {
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
        ...rootProps
    } = restProps;
    const cIcon = checkedIcon || <CheckCircleIcon />;
    const uncIcon = uncheckedIcon || <XCircleIcon />;
    const size = props.size ?? "md";
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
        <ol className={className} {...rootProps}>
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
                                    className={twMerge(
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
                                        className={twMerge(
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
                                        className={twMerge(
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
