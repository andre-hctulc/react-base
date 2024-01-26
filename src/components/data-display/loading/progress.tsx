"use client";

import type { default as ProgressController, ProgressListener, ProgressStep } from "@client-util/progress-controller";
import React from "react";
import ShortText from "@react-client/components/text/short-text";
import LongText from "@react-client/components/text/long-text";
import Styled from "@react-client/components/others/Styled";
import clsx from "clsx";
import Typography from "@react-client/components/text/typography";
import { PropsOf } from "@react-client/types";
import ProgressBar, { ProgressBarAppearance } from "./progress-bar";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { ThemeColor } from "@react-client/types";

interface ProgressProps<D = any> extends ProgressBarAppearance {
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
    className?: string;
    style?: React.CSSProperties;
    /** @default 100 */
    color?: ThemeColor;
    slotProps?: { label?: PropsOf<typeof ShortText>; header?: PropsOf<typeof Stack>; progressText?: PropsOf<typeof ShortText> };
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

        const listener: ProgressListener = ({ progress, total, finished, error, data, step, totalSteps, message }) => {
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
        <div className={clsx("flex flex-col space-y-2 min-w-0 flex-grow", props.className)} style={props.style}>
            {props.label && (
                <Stack direction="row" align="center" {...props.slotProps?.header} className={clsx("space-x-1.5", props.slotProps?.header?.className)}>
                    {props.icon && <Styled disabled>{props.icon}</Styled>}
                    <ShortText variant="body2" secondary {...props.slotProps?.label} className={clsx(props.slotProps?.label?.className)}>
                        {props.label}
                    </ShortText>
                </Stack>
            )}
            {step && <Typography variant="caption" secondary>{`${step.label} (${step.index + 1}/${totalSteps})`}</Typography>}
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
            {message && <LongText>{message}</LongText>}
            {finished && props.renderFinished?.(readyData, isError)}
            {props.children}
        </div>
    );
}

interface ProgressSuccessProps {
    children?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function ProgressSuccess(props: ProgressSuccessProps) {
    return (
        <Typography className={clsx(props.className, "text-success")} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}

interface ProgressErrorProps {
    children?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function ProgressError(props: ProgressErrorProps) {
    return (
        <Typography className={clsx(props.className, "text-error")} variant="caption" style={props.style}>
            {props.children}
        </Typography>
    );
}
