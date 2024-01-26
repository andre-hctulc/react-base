import Label from "@react-client/components/input/label";
import Subtitle from "@react-client/components/text/subtitle";
import { PropsOf } from "@react-client/types";
import clsx from "clsx";

interface LabelizeProps {
    label: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    vertical?: boolean;
    labelWidth?: string;
    icon?: React.ReactElement;
    /** @default "large" */
    variant?: "large" | "small" | "caption";
    bold?: boolean;
    slotProps?: { body: PropsOf<"div"> };
    card?: boolean;
}

export default function Labelize(props: LabelizeProps) {
    const variant = props.variant || "large";
    const width = props.vertical ? undefined : props.labelWidth || 100;
    const classes = clsx(
        "flex",
        props.card && "bg-bg-paper rounded p-2",
        props.vertical ? ["flex-col", variant !== "caption" && "space-y-2"] : "flex-row space-x-2 items-start",
        props.className
    );
    const bodyClasses = clsx(
        "flex-grow flex-shrink-0 flex flex-col",
        variant === "large" && (props.icon ? "pl-6" : "pl-6"),
        variant === "caption" && "pl-0.5",
        props.slotProps?.body.className
    );

    return (
        <div className={classes} style={props.style}>
            {variant === "large" ? (
                <Subtitle
                    noMargin
                    variant="subtitle2"
                    className="whitespace-nowrap text-ellipsis overflow-hidden"
                    bold={props.bold}
                    tag="label"
                    style={{ width, maxWidth: width }}
                    icon={props.icon}
                >
                    {props.label}
                </Subtitle>
            ) : (
                <Label variant={variant === "caption" ? "caption" : "form_control"} className="whitespace-nowrap text-ellipsis overflow-hidden" noMargin>
                    {props.label}
                </Label>
            )}
            <div {...props.slotProps?.body} className={bodyClasses}>
                {props.children}
            </div>
        </div>
    );
}
