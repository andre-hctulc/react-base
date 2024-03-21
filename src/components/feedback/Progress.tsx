"use client";

import React from "react";
import clsx from "clsx";
import type {
    default as ProgressController,
    ProgressListener,
    ProgressStep,
} from "../../util/ProgressController";
import ProgressBar, { ProgressBarAppearance } from "./ProgressBar";
import type { ThemeColor, PropsOf, StyleProps } from "../../types";
import Flex from "../layout/Flex";
import Styled from "../shadow/Styled";
import Typography from "../text/Typography";
import { styleProps } from "../../util";

interface ProgressProps<D = any> extends ProgressBarAppearance, StyleProps {
    controller: ProgressController<D>;
    label?: string;
    icon?: React.ReactElement;
    /**
     * Wird gerendert, wenn der Progress fertig ist. Die Funktion erhält `ProgressController.state.data` als Parameter.
     * Für einheitliche Messages kann hier `ProgressSuccess` verwendet werden
     * */
    renderFinished?: (data: D, isError: boolean) => React.ReactNode;
    /** Nachricht, die dem default Error message angezeigt wird. Siehe `renderError`*/
    errorMessage?: string;
    children?: React.ReactNode;
    /** @default 100 */
    color?: ThemeColor;
    slotProps?: {
        label?: PropsOf<typeof Typography>;
        header?: PropsOf<typeof Flex>;
        progressText?: PropsOf<typeof Typography>;
    };
    steps?: { [stepId: string]: ProgressBarAppearance };
}

export default function Progress<D = any>(props: ProgressProps<D>) {
    const [progress, setProgress] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [isError, setIsError] = React.useState(false);
    const [readyData, setReadyData] = React.useState<any>();
    const [message, setMessage] = React.useState<any>();
    const [step, setStep] = React.useState<ProgressStep | null>();
    const [totalSteps, setTotalSteps] = React.useState(0);
    const [finished, setFinished] = React.useState(false);
    const stepAppearance = step && props.steps ? props.steps[step.id] : null;

    React.useEffect(() => {
        const controller = props.controller;

        if (!controller) return;

        const listener: ProgressListener = ({
            progress,
            total,
            finished,
            error,
            data,
            step,
            totalSteps,
            message,
        }) => {
            setTotalSteps(totalSteps || 0);
            setIsError(error);
            setFinished(finished);
            if (data !== undefined) setReadyData(data);
            setMessage(message);
            setProgress(progress);
            setMax(total);
            setStep(step);
        };

        controller?.addListener(listener, true);

        return () => {
            controller?.removeListener(listener);
        };
    }, [props.controller]);

    return (
        <div {...styleProps({ className: "flex flex-col space-y-2 min-w-0 flex-grow" }, props)}>
            {props.label && (
                <Flex
                    direction="row"
                    align="center"
                    {...props.slotProps?.header}
                    className={clsx("space-x-1.5", props.slotProps?.header?.className)}
                >
                    {props.icon && <Styled disabled>{props.icon}</Styled>}
                    <Typography
                        truncate
                        variant="body2"
                        secondary
                        {...props.slotProps?.label}
                        className={clsx(props.slotProps?.label?.className)}
                    >
                        {props.label}
                    </Typography>
                </Flex>
            )}
            {step && (
                <Typography variant="caption" secondary>{`${step.label} (${
                    step.index + 1
                }/${totalSteps})`}</Typography>
            )}
            <ProgressBar
                slotProps={{ progressText: props.slotProps?.progressText }}
                className="flex-grow"
                absolute={props.absolute}
                unit={props.unit}
                max={max}
                progress={progress}
                color={props.color}
                showMax={props.showMax}
            />
            {step?.progress && (
                <ProgressBar
                    slotProps={{ progressText: props.slotProps?.progressText }}
                    {...stepAppearance}
                    color={stepAppearance?.color || props.color}
                    max={step.progress.total}
                    progress={step.progress.progress}
                />
            )}
            {message && <Typography long>{message}</Typography>}
            {finished && props.renderFinished?.(readyData, isError)}
            {props.children}
        </div>
    );
}
