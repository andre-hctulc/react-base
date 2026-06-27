"use client";

import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    createTheme,
    type AccordionContentProps,
    type AccordionPanelProps,
    type AccordionProps,
    type AccordionTitleProps,
} from "flowbite-react";
import { type TProps } from "../../util/style.js";
import type { FC, ReactNode } from "react";
import { useResolveT } from "../../hooks/index.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        section: SectionTheme;
    }

    interface FlowbiteProps {
        section: Partial<WithoutThemingProps<SectionProps>>;
    }
}

export interface SectionTheme {}

const section = createTheme<SectionTheme>({});

interface SectionProps extends TProps<SectionTheme>, Omit<AccordionProps, "children"> {
    title?: string;
    accordionTitleProps?: AccordionTitleProps;
    accordionPanelProps?: AccordionPanelProps;
    accordionContentProps?: AccordionContentProps;
    children?: ReactNode;
    /**
     * Merged into `accordionContentProps.className`
     */
    contentClassName?: string;
}

/**
 * Displays a section with a title and content using the {@link Accordion} component with a single panel.
 */
export const Section: FC<SectionProps> = (props) => {
    const { className, children, restProps } = useResolveT("cardFooter", section, props);
    const {
        title,
        accordionPanelProps,
        accordionTitleProps,
        accordionContentProps,
        contentClassName,
        ...rootProps
    } = restProps;
    return (
        <Accordion className={className} {...rootProps}>
            <AccordionPanel {...accordionPanelProps}>
                <AccordionTitle {...accordionTitleProps}>{title}</AccordionTitle>
                <AccordionContent
                    {...accordionContentProps}
                    className={twMerge(contentClassName, accordionContentProps?.className)}
                >
                    {children}
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    );
};
