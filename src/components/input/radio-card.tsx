import { tv } from "tailwind-variants";
import type { PropsOf } from "../../types/index.js";
import { Card } from "../containers/card.js";
import type { RadioRenderParams } from "./radio.js";
import type { FC, ReactNode } from "react";

const radioCard = tv({
    base: "transition border-[1.5px]",
    variants: {
        active: {
            true: "border-primary outline-0",
            false: "outline-primary",
        },
        disabled: {
            true: "opacity-50",
            false: "",
        },
        readOnly: {
            true: "",
        },
    },
    compoundVariants: [
        {
            disabled: false,
            readOnly: false,
            active: false,
            className: "hover:outline-offset-2 hover:outline cursor-pointer",
        },
        { disabled: false, readOnly: false, className: "hover:bg-neutral/5" },
    ],
    defaultVariants: {
        active: false,
        disabled: false,
        readOnly: false,
    },
});

interface RadioCardProps extends PropsOf<typeof Card> {
    children?: ReactNode;
    params?: Partial<RadioRenderParams>;
}

/**
 * A helper component to render a card as a radio option
 */
export const RadioCard: FC<RadioCardProps> = ({ params, className, children, ...props }) => {
    const p: RadioRenderParams = {
        option: { value: "", data: { label: "<option-not-defined>" } },
        active: false,
        activate: () => {},
        disabled: false,
        readOnly: false,
        ...params,
    };

    return (
        <Card
            {...props}
            key={p.option.value}
            className={radioCard({ className, active: p.active, disabled: p.disabled, readOnly: p.readOnly })}
            onClick={(e) => {
                p.activate();
                props.onClick?.(e);
            }}
        >
            {children}
        </Card>
    );
};
