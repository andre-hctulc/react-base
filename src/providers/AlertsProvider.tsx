"use client";

import React from "react";
import { TransitionGroup } from "react-transition-group";
import { randomId } from "../util/system";
import Fade from "../components/transitions/Fade";
import Alert from "../components/alerts/Alert";
import AlertTitle from "../components/alerts/AlertTitle";
import { useDev } from "./DevProvider";

export const AlertContext = React.createContext<AlertContext | null>(null);

export interface AlertOptions {
    title?: string;
    duration?: number | Promise<unknown>;
    /** @default true */
    closable?: boolean;
}

type Severity = "warning" | "info" | "error" | "success";

type ErrorAlertOptions = AlertOptions & {
    /** This error will be displayed (only) in dev mode  */
    error?: Error | (Error[] | readonly Error[]) | null;
};

interface AlertContext {
    success: (message: React.ReactNode, options?: AlertOptions) => void;
    info: (message: React.ReactNode, options?: AlertOptions) => void;
    warn: (message: React.ReactNode, options?: AlertOptions) => void;
    /** In den `options` kann mit `err` ein Error angegeben werden, wodurch deiser im dev mode mit dargestellt wird.  */
    error: (message: React.ReactNode, options?: ErrorAlertOptions) => void;
    alert: (severity: Severity, message: React.ReactNode, options?: AlertOptions) => void;
}

interface AlertContextProviderProps {
    children?: React.ReactNode;
}

const width = 500;

/** Die Alert-Box hat einen z-Index von 2. */
export default function AlertsProvider(props: AlertContextProviderProps) {
    const [alerts, setAlerts] = React.useState<
        Record<string, ({ message: React.ReactNode; severity: Severity } & AlertOptions) | undefined>
    >({});
    const currentAlerts = React.useRef<
        Record<string, ({ message: React.ReactNode; severity: Severity } & AlertOptions) | undefined>
    >({});
    const hasAlerts = React.useMemo(() => !!Object.keys(alerts).length, [alerts]);
    const { devMode } = useDev();

    currentAlerts.current = alerts;

    function close(id: string) {
        const newAlerts = { ...currentAlerts.current };
        delete newAlerts[id];
        currentAlerts.current = newAlerts;
        setAlerts(newAlerts);
    }

    const alert = React.useCallback(
        (severity: Severity, message: React.ReactNode, options?: AlertOptions) => {
            const id = randomId();
            setAlerts((currentAlerts.current = { ...alerts, [id]: { ...options, severity, message } }));

            if (options?.duration instanceof Promise) options.duration.then(() => close(id));
            else setTimeout(() => close(id), options?.duration || 4000);
        },
        [alerts]
    );

    const success = React.useCallback(
        (message: React.ReactNode, options?: AlertOptions) => {
            alert("success", message, options);
        },
        [alert]
    );

    const warn = React.useCallback(
        (message: React.ReactNode, options?: AlertOptions) => {
            alert("warning", message, options);
        },
        [alert]
    );

    const error = React.useCallback(
        (message: React.ReactNode, options?: ErrorAlertOptions) => {
            let msg = message;
            if (devMode && options?.error && typeof message === "string")
                msg = `${message} - Errors (dev): ${[options.error]
                    .flat()
                    .map((e) => e.message)
                    .join(", ")}`;
            alert("error", msg, options);
        },
        [alert, devMode]
    );

    const info = React.useCallback(
        (message: React.ReactNode, options?: AlertOptions) => {
            alert("info", message, options);
        },
        [alert]
    );

    return (
        <>
            <AlertContext.Provider value={{ success, warn, alert, error, info }}>
                {props.children}
            </AlertContext.Provider>
            {hasAlerts && (
                <div
                    className="space-y-4 fixed items-end z-20 bottom-0 right-0 max-w-full max-h-full !m-0 pr-6 pb-4"
                    style={{
                        width,
                        zIndex: 60,
                    }}
                >
                    {/* <Alert sx={{width: 300, boxShadow: 1}} severity={"success"}>Das ist ein Test</Alert> */}
                    <TransitionGroup component={null}>
                        {Object.keys(alerts).map((id) => {
                            const options = alerts[id];

                            if (!options) return null;

                            return (
                                <Fade key={id}>
                                    <Alert
                                        className="max-w-full shadow-sm"
                                        style={{
                                            minWidth: 290,
                                        }}
                                        severity={options.severity}
                                        onClose={options.closable === false ? undefined : () => close(id)}
                                    >
                                        {options.title && <AlertTitle>{options.title}</AlertTitle>}
                                        {options.message}
                                    </Alert>
                                </Fade>
                            );
                        })}
                    </TransitionGroup>
                </div>
            )}
        </>
    );
}
