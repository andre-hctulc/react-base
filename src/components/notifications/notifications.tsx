"use client";

import React from "react";
import { tv } from "tailwind-variants";
import type { PropsOf } from "../../types";
import { useIsHydrated } from "../../hooks";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Fade } from "../transitions/fade";

const DEFAULT_DURATION: number = 3000;

export type NotificationPosition = "top_left" | "top_center" | "top_right" | "bottom_right" | "bottom_left";

export interface Notification {
    message: React.ReactNode;
    severity?: "info" | "success" | "warning" | "error";
    id: string;
    /**
     * @default "top_center"
     */
    position?: NotificationPosition;
    /**
     * Milliseconds
     * @default 5000
     */
    duration?: number;
    icon?: React.ReactNode;
}

export type NotificationInput = Omit<Notification, "id"> & { id?: string };

interface NotificationsContext {
    notify: (notification: NotificationInput) => string;
    removeNotification: (notificationId: string) => void;
}

const NotificationsContext = React.createContext<NotificationsContext | null>(null);

export function useNotifications() {
    const context = React.useContext(NotificationsContext);
    if (!context) {
        throw new Error("`useNotifications` must be used within a `NotificationsProvider`");
    }
    return context;
}

interface NotificationIcons {
    info: React.ReactNode;
    success: React.ReactNode;
    warning: React.ReactNode;
    error: React.ReactNode;
}

interface NotificationsProviderProps {
    children?: React.ReactNode;
    Icons?: Partial<NotificationIcons>;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children, Icons: icons }) => {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const isMounted = useIsHydrated();
    const { top_center, top_right, bottom_left, bottom_right, top_left } = React.useMemo(() => {
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
    const Icons = React.useMemo<NotificationIcons>(
        () => ({
            info: icons?.info || "ℹ",
            success: icons?.success || "✔️",
            warning: icons?.warning || "⚠️",
            error: icons?.error || "X",
        }),
        [icons]
    );

    const removeNotification = React.useCallback((notificationId: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }, []);

    const notify = React.useCallback((notification: NotificationInput) => {
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
                        <NotificationItem key={notification.id} notification={notification} Icons={Icons} />
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
                        <NotificationItem key={notification.id} notification={notification} Icons={Icons} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* top_right */}
            {createPortal(
                <NotificationsBox className={clsx("fixed top-0 right-0", listProps.className)}>
                    {top_right.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} Icons={Icons} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* bottom_right */}
            {createPortal(
                <NotificationsBox className={clsx("fixed bottom-0 right-0", listProps.className)}>
                    {bottom_right.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} Icons={Icons} />
                    ))}
                </NotificationsBox>,
                document.body
            )}
            {/* bottom_left */}
            {createPortal(
                <NotificationsBox className={clsx("fixed bottom-0 left-0", listProps.className)}>
                    {bottom_left.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} Icons={Icons} />
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

const notificationBox = tv({
    base: "box-border flex w-full max-w-full pointer-events-auto px-3 py-2 rounded overflow-hidden bg-opacity-15 shadow",
    variants: {
        severity: {
            info: "bg-info text-info",
            success: "bg-success text-success",
            warning: "bg-warning text-warning",
            error: "bg-error text-error",
        },
    },
    defaultVariants: {
        severity: "info",
    },
});

interface NotificationItemProps extends PropsOf<"li"> {
    notification: Notification;
    Icons: NotificationIcons;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ className, notification, Icons, ...props }) => {
    const icon = React.useMemo(() => {
        if (notification.icon) return notification.icon;
        return Icons[notification.severity || "info"];
    }, [notification.severity]);

    return (
        <Fade show unmount>
            <li {...props} className={clsx("bg", className)}>
                <div className={notificationBox({ className, severity: notification.severity })}>
                    <span className="text-base mr-3 mt-1">{icon}</span>
                    <div className="flex-grow">{notification.message}</div>
                </div>
            </li>
        </Fade>
    );
};
