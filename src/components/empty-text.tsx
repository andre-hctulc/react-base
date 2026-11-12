import type { ComponentProps, FC, ReactNode } from "react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.js";

interface EmptyTextProps extends Omit<ComponentProps<typeof Empty>, "title"> {
    title?: ReactNode;
    icon?: ReactNode;
}

export const EmptyText: FC<EmptyTextProps> = ({ title, children, icon, ...props }) => {
    return (
        <Empty {...props}>
            <EmptyHeader>
                {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                {title && <EmptyTitle>{title}</EmptyTitle>}
                <EmptyDescription>{children}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};
