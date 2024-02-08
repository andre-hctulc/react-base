"use client";

import React from "react";
import { TransitionGroup } from "react-transition-group";
import { randomId } from "u/src/strings";
import Fade from "../components/transitions/Fade";
import Alert from "../components/data-display/alerts/Alert";
import AlertTitle from "../components/data-display/alerts/AlertTitle";
import { useDev } from "./DevProvider";

const AlertContext = React.createContext<AlertContext | null>(null);

export interface AlertOptions {
    title?: string;
    duration?: number | Promise<any>;
    /** @default true */
    closable?: boolean;
}

type Severity = "warning" | "info" | "error" | "success";

interface AlertContext {
    success: (message: React.ReactNode, options?: AlertOptions) => void;
    info: (message: React.ReactNode, options?: AlertOptions) => void;
    warn: (message: React.ReactNode, options?: AlertOptions) => void;
    /** In den `options` kann mit `err` ein Error angegeben werden, wodurch deiser im dev mode mit dargestellt wird.  */
    error: (message: React.ReactNode, options?: AlertOptions & { err?: Error | null }) => void;
    alert: (severity: Severity, message: React.ReactNode, options?: AlertOptions) => void;
}

interface AlertContextProviderProps {
    children?: React.ReactNode;
}

export function useAlerts() {
    const alertsContext = React.useContext(AlertContext);
    if (!alertsContext) throw new Error("`AlertsProvider` required");
    return alertsContext;
}

const width = 500;

/** Die Alert-Box hat einen z-Index von 2. */
export default function AlertsProvider(props: AlertContextProviderProps) {
    const [alerts, setAlerts] = React.useState<Record<string, ({ message: React.ReactNode; severity: Severity } & AlertOptions) | undefined>>({});
    const currentAlerts = React.useRef<Record<string, ({ message: React.ReactNode; severity: Severity } & AlertOptions) | undefined>>({});
    const hasAlerts = React.useMemo(() => !!Object.keys(alerts).length, [alerts]);
    const { devMode } = useDev();

    currentAlerts.current = alerts;

    function close(id: string) {
        const newAlerts = { ...currentAlerts.current };
        delete newAlerts[id];
        currentAlerts.current = newAlerts;
        setAlerts(newAlerts);
    }

    function alert(severity: Severity, message: React.ReactNode, options?: AlertOptions) {
        const id = randomId();
        setAlerts((currentAlerts.current = { ...alerts, [id]: { ...options, severity, message } }));

        if (options?.duration instanceof Promise) options.duration.then(() => close(id));
        else setTimeout(() => close(id), options?.duration || 4000);
    }

    function success(message: React.ReactNode, options?: AlertOptions) {
        alert("success", message, options);
    }

    function warn(message: React.ReactNode, options?: AlertOptions) {
        alert("warning", message, options);
    }

    function error(message: React.ReactNode, options?: AlertOptions & { err?: Error | null }) {
        let msg = message;
        if (devMode && options?.err && typeof message === "string") msg = `${message} -DEV- ${options.err.stack}`;
        alert("error", msg, options);
    }

    function info(message: React.ReactNode, options?: AlertOptions) {
        alert("info", message, options);
    }

    return (
        <>
            <AlertContext.Provider value={{ success, warn, alert, error, info }}>{props.children}</AlertContext.Provider>
            {hasAlerts && (
                <div
                    className="space-y-4 fixed items-end z-20 bottom-0 right-0 max-w-full max-h-full !m-0 pr-6 pb-4"
                    style={{
                        width,
                        zIndex: 60,
                    }}
                >
                    {/* <Alert sx={{width: 300, boxShadow: 1}} severity={"success"}>Das ist ein Test</Alert> */}
                    {/* @ts-ignore */}
                    <TransitionGroup component={null}>
                        {Object.keys(alerts).map(id => {
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
