import React from "react";
import clsx from "clsx";
import Label from "./label";
import HelperText from "@react-client/components/text/helper-text";
import Typography from "@react-client/components/text/typography";
import { useJSForm } from "./form/js-form";
import Divider from "@react-client/components/layout/divider";

export type FancyRadioButtonsOption = { label: string; value: string; icon?: React.ReactNode; description: string; children?: React.ReactNode };

interface FancyRadioButtonsProps {
    name?: string;
    options: FancyRadioButtonsOption[];
    error?: boolean;
    helperText?: string;
    className?: string;
    style?: React.CSSProperties;
    defaultValue: string;
    label?: string;
    dividers?: boolean;
    onChange?: (newValue: string, option: FancyRadioButtonsOption) => void;
}

export default function FancyRadioButtons(props: FancyRadioButtonsProps) {
    const form = useJSForm();
    const formProps = form?.getInputState(props.name);
    const [value, setValue] = React.useState(props.defaultValue);
    const classes = clsx("flex flex-xol", props.className);

    function changeValue(option: FancyRadioButtonsOption) {
        const newValue = option.value;
        setValue(newValue);
        if (props.name) form?.change(props.name, newValue);
        props.onChange?.(newValue, option);
    }

    React.useEffect(() => {
        if (props.name) form?.change(props.name, value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={classes} style={props.style}>
            {props.label && <Label className="mb-3">{props.label}</Label>}
            <ul className="unstyled-list space-y-2">
                {props.options.map((option, i) => {
                    const isLastItem = i === props.options.length - 1;

                    return (
                        <React.Fragment key={option.value}>
                            <li className={"flex cursor-pointer"} onClick={() => changeValue(option)}>
                                <input type="radio" className="self-start p-1 mt-[6px] mr-2" checked={option.value === value} name={props.name} value={option.value} />
                                <div className="flex flex-col">
                                    <Typography className="font-medium">{option.label}</Typography>
                                    <Typography variant="caption" disabled>
                                        {option.description}
                                    </Typography>
                                </div>
                            </li>
                            {!isLastItem && props.dividers && <Divider />}
                        </React.Fragment>
                    );
                })}
            </ul>
            {(props.helperText || formProps?.errorMessage) && (
                <HelperText error={props.error || formProps?.error}>{formProps?.errorMessage || props.helperText}</HelperText>
            )}
        </div>
    );
}
