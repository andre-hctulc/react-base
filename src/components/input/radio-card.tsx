"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { PropsOf } from "../../types/index.js";
// import type { RadioRenderParams } from "./radio.js";
import type { FC, ReactNode } from "react";
import { Card } from "flowbite-react";
import { type BaseTheme, type TProps } from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        radioCard: RadioCardTheme;
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

type RadioCardProps = PropsOf<typeof Card> &
    TProps<RadioCardTheme> & {
        children?: ReactNode;
        params?: Partial<any /* RadioRenderParams */>;
        onClick?: (e: any) => void;
    };

/**
 * A helper component to render a card as a radio option
 */
export const RadioCard: FC<RadioCardProps> = ({ params, children, onClick, ...restProps }) => {
    const p: any /* RadioRenderParams */ = {
        option: { value: "", data: { label: "<option-not-defined>" } },
        active: false,
        activate: () => {},
        disabled: false,
        readOnly: false,
        ...params,
    };

    const { className, restProps: themeRestProps } = useResolveT("radioCard", radioCard, {
        active: p.active,
        disabled: p.disabled,
        readOnly: p.readOnly,
        ...restProps,
    });

    // Add hover effects manually since we need compound variants
    let additionalClasses = "";
    if (!p.disabled && !p.readOnly) {
        if (!p.active) {
            additionalClasses += " hover:outline-offset-2 hover:outline cursor-pointer";
        }
        additionalClasses += " hover:bg-neutral/5";
    }

    return (
        <Card
            {...themeRestProps}
            key={p.option.value}
            className={twMerge(className, additionalClasses)}
            onClick={(e: any) => {
                p.activate();
                onClick?.(e);
            }}
        >
            {children}
        </Card>
    );
};
