import { Card, type CardProps, type CardTheme } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { FC } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        dangerZoneCard: DangerZoneCardTheme;
    }

    interface FlowbiteProps {
        dangerZoneCard: Partial<WithoutThemingProps<DangerZoneCardProps>>;
    }
}

export interface DangerZoneCardTheme extends CardTheme {}

export type DangerZoneCardProps = CardProps;

export const DangerZoneCard: FC<DangerZoneCardProps> = ({ className, children, ...props }) => {
    return (
        <Card className={twMerge("bg-error-50 border-error", className)} {...props}>
            {children}
        </Card>
    );
};
