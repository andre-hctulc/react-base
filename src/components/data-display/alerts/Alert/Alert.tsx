// * SSR

import CheckCircleOutlineIcon from "@react-client/components/icons/collection/check-circle-outline";
import ErrorCircleOutlineIcon from "@react-client/components/icons/collection/error-circle-outline";
import InfoCircleOutlineIcon from "@react-client/components/icons/collection/info-circle-outline";
import WarningOutlineIcon from "@react-client/components/icons/collection/warning-outline";
import XIcon from "@react-client/components/icons/collection/x";
import Styled from "@react-client/components/others/Styled";
import IconButton from "@react-client/components/input/buttons/IconButton/IconButton";
import clsx from "clsx";
import React from "react";

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
        <div ref={ref} className={clsx("Alert flex flex-row rounded px-2.5  pr-2", bg, props.className)} style={{ margin: props.margin ? margin : undefined, width }}>
            <Styled className="self-start my-2.5" size={"small"} color={severity}>
                {icon}
            </Styled>
            <div className="flex flex-grow flex-col pl-3 py-[9px] text-[#00000099] text-sm">{props.children}</div>
            {props.onClose && (
                <div className="pl-2 flex-shrink-0">
                    <IconButton size="small" onClick={props.onClose} className="mt-[7.5px]">
                        <XIcon className="text-opacity-50" />
                    </IconButton>
                </div>
            )}
        </div>
    );
});

Alert.displayName = "Alert";

export default Alert;
