import { type PropsOf } from "@react-client/util";
import Button from "../button";
import clsx from "clsx";
import { collapse } from "@client-util/helpers";

export default function BlankButton(props: Omit<PropsOf<typeof Button>, "color" | "unstyled">) {
    const variant = props.variant || "text";
    const [variantClasses, variantIconClasses] = collapse(variant, {
        contained: ["bg-bg-dark/60 hover:bg-bg-dark/80 active:bg-bg-dark text-text", ["text-text-secondary"]],
        text: ["text-text-secondary hover:bg-action-hover active:bg-action-focus", ["text-text-secondary"]],
        outlined: ["bg-bg-paper text-text-secondary border border-text-secondary hover:bg-bg-dark/50 active:bg-bg-dark/70", ["text-text-secondary"]],
    });
    const classes = clsx(variantClasses, props.className);

    return (
        <Button {...props} unstyled className={classes}>
            {props.children}
        </Button>
    );
}
