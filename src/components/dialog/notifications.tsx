"use client";

import type { PropsOf } from "../../types/index.js";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Fade } from "../transitions/fade.js";
import { useIsHydrated } from "../../hooks/others/use-is-hydrated.js";
import { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from "react";
import { Alert } from "../data-display/alert.js";
import { createId } from "../../util/system.js";

const DEFAULT_DURATION: number = 3500;

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
    icon?: ReactNode;
    /**
     * Class name for the alert
     */
    className?: string;
    closable?: boolean;
    onClose?: (notificationId: string) => void;
    alertProps?: PropsOf<typeof Alert>;
}

export type NotificationInput = Omit<Notification, "id"> & { id?: string };

interface NotificationsContext {
    notify: (notification: NotificationInput) => string;
    close: (notificationId: string) => void;
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

    const close = useCallback((notificationId: string) => {
        setNotifications((prev) => {
            const index = prev.findIndex((n) => n.id === notificationId);

            if (index === -1) return prev;

            const notification = prev[index];
            notification.onClose?.(notificationId);

            return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });
    }, []);

    const notify = useCallback((notification: NotificationInput) => {
        // insert id if not provided
        if (notification.id === undefined) {
            notification.id = createId(10);
        }

        const notificationWithId: Notification = notification as Notification;

        setNotifications((prev) => [
            ...prev.filter((not) => not.id !== notificationWithId.id),
            notificationWithId,
        ]);

        const duration = notification.duration || DEFAULT_DURATION;

        if (duration > 0 && duration !== Infinity) {
            setTimeout(() => {
                close(notificationWithId.id);
                notification.onClose?.(notificationWithId.id);
            }, duration);
        }

        return notificationWithId.id;
    }, []);

    if (!isMounted) return null;

    return (
        <NotificationsContext.Provider value={{ notify, close }}>
            {/* top_left */}
            {!!top_left.length &&
                createPortal(
                    <NotificationsBox className={"fixed top-0 left-0"}>
                        {top_left.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </NotificationsBox>,
                    document.body
                )}
            {/* top_center */}
            {!!top_center.length &&
                createPortal(
                    <NotificationsBox className={"top-0 left-[50%] translate-x-[-50%]"}>
                        {top_center.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </NotificationsBox>,
                    document.body
                )}
            {/* top_right */}
            {!!top_right.length &&
                createPortal(
                    <NotificationsBox className={"fixed top-0 right-0"}>
                        {top_right.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </NotificationsBox>,
                    document.body
                )}
            {/* bottom_right */}
            {!!bottom_right.length &&
                createPortal(
                    <NotificationsBox className={"fixed bottom-0 right-0"}>
                        {bottom_right.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </NotificationsBox>,
                    document.body
                )}
            {/* bottom_left */}
            {!!bottom_left.length &&
                createPortal(
                    <NotificationsBox className={"fixed bottom-0 left-0"}>
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

const NotificationItem: FC<NotificationItemProps> = ({ className, notification }) => {
    return (
        <Fade show unmount>
            <li className={clsx("bg-paper pointer-events-auto rounded-md", className)}>
                <Alert
                    defaultIcon
                    severity={notification.severity}
                    closable={notification.closable}
                    title={notification.title as any}
                    titleProps={{ size: "md" }}
                    shadow="md"
                    outlined={false}
                    {...notification.alertProps}
                    className={clsx(notification.className, notification.alertProps?.className)}
                >
                    {notification.message}
                </Alert>
            </li>
        </Fade>
    );
};
