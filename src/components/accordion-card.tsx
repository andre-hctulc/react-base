import { type ComponentProps, type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion.js";

export const AccordionOutline: FC<ComponentProps<typeof Accordion>> = ({ className, ...props }) => {
    return <Accordion className={cn("rounded-lg border", className)} {...props} />;
};

export const AccordionOutlineItem: FC<ComponentProps<typeof AccordionItem>> = ({ className, ...props }) => {
    return <AccordionItem className={cn("border-b px-4 last:border-b-0", className)} {...props} />;
};

export const AccordionOutlineTrigger: FC<ComponentProps<typeof AccordionTrigger>> = ({
    className,
    ...props
}) => {
    return <AccordionTrigger className={cn("items-center", className)} {...props} />;
};

interface AccordionCardProps extends Omit<ComponentProps<typeof AccordionOutline>, "title"> {
    collapsible?: boolean;
    title?: ReactNode;
    keepMounted?: boolean;
}

export const AccordionCard: FC<AccordionCardProps> = ({
    children,
    collapsible,
    title,
    keepMounted,
    ...props
}) => {
    const value = "content";
    const hasHeader = !!title || collapsible;

    return (
        <AccordionOutline defaultValue={[value]} {...props}>
            <AccordionOutlineItem value={value}>
                {hasHeader ? (
                    collapsible ? (
                        <AccordionOutlineTrigger>{title}</AccordionOutlineTrigger>
                    ) : (
                        <AccordionStaticHeader>
                            <AccordionTitle>{title}</AccordionTitle>
                        </AccordionStaticHeader>
                    )
                ) : null}
                <AccordionContent keepMounted={keepMounted}>{children}</AccordionContent>
            </AccordionOutlineItem>
        </AccordionOutline>
    );
};

interface FormCardProps extends AccordionCardProps {}

/**
 * Accordion card that defaults the {@link AccordionCardProps.keepMounted} prop to true for use in forms.
 */
export const FormCard: FC<FormCardProps> = ({ children, ...props }) => {
    return (
        <AccordionCard keepMounted {...props}>
            {children}
        </AccordionCard>
    );
};

interface AccordionTitleProps extends ComponentProps<"div"> {}

export const AccordionTitle: FC<AccordionTitleProps> = ({ className, children, ...props }) => {
    return <h3 className="text-sm font-medium">{children}</h3>;
};

interface AccordionStaticHeaderProps extends ComponentProps<"div"> {}

export const AccordionStaticHeader: FC<AccordionStaticHeaderProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn("flex flex-1 items-center justify-between py-2.5", className)} {...props}>
            {children}
        </div>
    );
};
