"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { PropsOf } from "../../types/index.js";
// import type { RadioRenderParams } from "./radio.js";
import type { FC, ReactNode } from "react";
import { Card, type CardProps } from "flowbite-react";
import { type BaseTheme, type TProps } from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        radioCard: RadioCardTheme;
    }

    interface FlowbiteProps {
        radioCard: Partial<WithoutThemingProps<RadioCardProps>>;
    }
}

export interface RadioCardTheme extends BaseTheme {
    active: FlowbiteBoolean;
    disabled: FlowbiteBoolean;
    readOnly: FlowbiteBoolean;
}

const radioCard = createTheme<RadioCardTheme>({
    base: "transition border-[1.5px]",
    active: {
        on: "border-primary outline-0",
        off: "outline-primary",
    },
    disabled: {
        on: "opacity-50",
        off: "",
    },
    readOnly: {
        on: "",
        off: "",
    },
    defaultVariants: {
        active: false,
        disabled: false,
        readOnly: false,
    },
});

export type RadioCardProps = CardProps &
    TProps<RadioCardTheme> & {
        params?: Partial<any /* RadioRenderParams */>;
    };

/**
 * A helper component to render a card as a radio option
 */
export const RadioCard: FC<RadioCardProps> = (props) => {
    const { className, restProps, children } = useResolveT("radioCard", radioCard, props);
    const { params, onClick, ...rootProps } = restProps;

    return (
        <Card
            className={className}
            onClick={(e) => {
                params?.activate();
                onClick?.(e);
            }}
            {...(rootProps as any)}
        >
            {children}
        </Card>
    );
};
