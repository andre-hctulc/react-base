"use client";

import type { PropsOf } from "../../types/index.js";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Fade } from "../transitions/fade.js";
import { InfoCircleIcon } from "../icons/info-circle.js";
import { CheckCircleIcon } from "../icons/check-circle.js";
import { ExclamationMarkIcon } from "../icons/exclamation-mark.js";
import { QuestionCircleIcon } from "../icons/question-circle.js";
import { useIsHydrated } from "../../hooks/others/use-is-hydrated.js";
import { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from "react";
import { Alert } from "../data-display/alert.js";

const DEFAULT_DURATION: number = 3000;

export type NotificationPosition = "top_left" | "top_center" | "top_right" | "bottom_right" | "bottom_left";

export interface Notification {
    message: ReactNode;
    title?: ReactNode;
    severity?: "info" | "success" | "warning" | "error";
    id: string;
    /**
     * @default "top_center"
     */
    position?: NotificationPosition;
    /**
     * Milliseconds. Use `Infinity` or `0` to keep the notification until manually removed.
     * @default 5000
     */
    duration?: number;
    icon?: React.ReactNode;
    /**
     * Class name for the alert
     */
    className?: string;
    closable?: boolean;
}

export type NotificationInput = Omit<Notification, "id"> & { id?: string };

interface NotificationsContext {
    notify: (notification: NotificationInput) => string;
    removeNotification: (notificationId: string) => void;
}

const NotificationsContext = createContext<NotificationsContext | null>(null);

export function useNotifications() {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("`useNotifications` must be used within a `NotificationsProvider`");
    }
    return context;
}

interface NotificationsProviderProps {
    children?: ReactNode;
}

export const NotificationsProvider: FC<NotificationsProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const isMounted = useIsHydrated();
    const { top_center, top_right, bottom_left, bottom_right, top_left } = useMemo(() => {
        const result = {
            top_center: [] as Notification[],
            top_right: [] as Notification[],
            bottom_left: [] as Notification[],
            bottom_right: [] as Notification[],
            top_left: [] as Notification[],
        };

        notifications.forEach((notification) => {
            if (!notification.position || !(notification.position in result)) {
                result.top_center.push(notification);
            } else {
                result[notification.position].push(notification);
            }
        });

        return result;
    }, [notifications]);

    const removeNotification = useCallback((notificationId: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }, []);

    const notify = useCallback((notification: NotificationInput) => {
        // insert id if not provided
        if (notification.id === undefined) notification.id = Date.now() + "";
        const notificationWithId: Notification = notification as Notification;

        setNotifications((prev) => [
            ...prev.filter((not) => not.id !== notificationWithId.id),
            notificationWithId,
        ]);

        const duration = notification.duration || DEFAULT_DURATION;

        if (duration > 0 && duration !== Infinity) {
            setTimeout(() => {
                removeNotification(notificationWithId.id);
            }, duration);
        }

        return notificationWithId.id;
    }, []);

    const listProps: PropsOf<"ol"> = {
        className: clsx(
            "fixed max-w-full w-[350px] max-h-[600px] overflow-auto pointer-events-none z-50",
            "p-4 box-border",
            "flex flex-col gap-3"
        ),
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
    };

    if (!isMounted) return null;

    return (
        <NotificationsContext.Provider value={{ notify, removeNotification }}>
            {/* top_left */}
            {createPortal(
                <ol {...listProps} className={clsx("fixed top-0 left-0", listProps.className)}>
                    {top_left.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </ol>,
                document.body
            )}
            {/* top_center */}
            {createPortal(
                <NotificationsBox
                    className={clsx("top-0 left-[50%] translate-x-[-50%]", listProps.className)}
                >
                    {top_center.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* top_right */}
            {createPortal(
                <NotificationsBox className={clsx("fixed top-0 right-0", listProps.className)}>
                    {top_right.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* bottom_right */}
            {createPortal(
                <NotificationsBox className={clsx("fixed bottom-0 right-0", listProps.className)}>
                    {bottom_right.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* bottom_left */}
            {createPortal(
                <NotificationsBox className={clsx("fixed bottom-0 left-0", listProps.className)}>
                    {bottom_left.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {children}
        </NotificationsContext.Provider>
    );
};

const NotificationsBox: React.FC<PropsOf<"ol">> = ({ className, ...props }) => {
    return (
        <ol
            {...props}
            className={clsx(
                "fixed max-w-full w-[350px] max-h-[600px] overflow-auto pointer-events-none z-50",
                "p-4 box-border",
                "flex flex-col gap-3",
                className
            )}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            {...props}
        />
    );
};

interface NotificationItemProps {
    notification: Notification;
    className?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ className, notification }) => {
    const getIcon = () => {
        if (notification.icon) return notification.icon;
        else if (!notification.severity || notification.severity === "info") return <InfoCircleIcon />;
        else if (notification.severity === "success") return <CheckCircleIcon />;
        else if (notification.severity === "error") return <ExclamationMarkIcon />;
        else if (notification.severity === "warning") return <QuestionCircleIcon />;
        return <QuestionCircleIcon />;
    };

    return (
        <Fade show unmount>
            <li className={clsx("bg-paper pointer-events-auto rounded", className)}>
                <Alert
                    icon={getIcon()}
                    title={notification.title}
                    type={notification.severity}
                    className={notification.className}
                    closable={notification.closable}
                >
                    {notification.message}
                </Alert>
            </li>
        </Fade>
    );
};
