import clsx from "clsx";
import React from "react";
import ErrorCircleOutlineIcon from "../../icons/collection/ErrorCircleOutline";
import CheckCircleOutlineIcon from "../../icons/collection/CheckCircleOutline";
import InfoCircleOutlineIcon from "../../icons/collection/InfoCircleOutline";
import WarningOutlineIcon from "../../icons/collection/WarningOutline";
import XIcon from "../../icons/collection/X";
import Styled from "../../others/Styled";
import IconButton from "../../input/buttons/IconButton";

function getIcon(severity: AlertProps["severity"]) {
    switch (severity) {
        case "error":
            return <ErrorCircleOutlineIcon />;
        case "success":
            return <CheckCircleOutlineIcon />;
        case "warning":
            return <WarningOutlineIcon />;
        case "info":
        default:
            return <InfoCircleOutlineIcon />;
    }
}

interface AlertProps {
    severity?: "error" | "info" | "success" | "warning";
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    margin?: boolean;
    fullWidth?: boolean;
}

function getAlertBg(severity: AlertProps["severity"]) {
    switch (severity) {
        case "success":
            return "bg-success-super-light";
        case "warning":
            return "bg-warning-super-light";
        case "error":
            return "bg-error-super-light";
        case "info":
        default:
            return "bg-info-super-light";
    }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    const severity = props.severity || "info";
    const bg = getAlertBg(severity);
    const icon = getIcon(severity);
    const margin = 20;
    let width: string | undefined;

    // margin führt bei width 100% zu overflow - Fix
    if (props.fullWidth) {
        if (props.margin) width = `calc(100% - ${margin * 2}px)`;
        else width = "100%";
    }

    return (
        <div
            ref={ref}
            className={clsx("Alert flex flex-row rounded px-2.5  pr-2", bg, props.className)}
            style={{ margin: props.margin ? margin : undefined, width, ...props.style }}
        >
            <Styled className="self-start my-2.5" size={"small"} color={severity}>
                {icon}
            </Styled>
            <div className="flex flex-grow flex-col pl-3 py-[9px] text-[#00000099] text-sm">{props.children}</div>
            {props.onClose && (
                <IconButton size="small" onClick={props.onClose} className="ml-2 mt-[7.5px]">
                    <XIcon className="text-opacity-50" />
                </IconButton>
            )}
        </div>
    );
});

Alert.displayName = "Alert";

export default Alert;
