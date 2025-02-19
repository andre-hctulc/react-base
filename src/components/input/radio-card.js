import { createElement as _createElement } from "react";
import { tv } from "tailwind-variants";
import { Card } from "../containers";
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
/**
 * A helper component to render a card as a radio option
 */
export const RadioCard = ({ params, className, children, ...props }) => {
    const p = {
        option: { value: "", data: { label: "<option-not-defined>" } },
        active: false,
        activate: () => { },
        disabled: false,
        readOnly: false,
        ...params,
    };
    return (_createElement(Card, { ...props, key: p.option.value, className: radioCard({ className, active: p.active, disabled: p.disabled, readOnly: p.readOnly }), onClick: (e) => {
            p.activate();
            props.onClick?.(e);
        } }, children));
};
