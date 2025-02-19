"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
import { useIsHydrated } from "../../hooks";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Fade } from "../transitions/fade";
import { InfoCircleIcon } from "../icons/info-circle";
import { CheckCircleIcon } from "../icons/check-cirlce";
import { ExclamationMarkIcon } from "../icons/exclamation-mark";
import { QuestionCircleIcon } from "../icons/question-circle";
const DEFAULT_DURATION = 3000;
const NotificationsContext = React.createContext(null);
export function useNotifications() {
    const context = React.useContext(NotificationsContext);
    if (!context) {
        throw new Error("`useNotifications` must be used within a `NotificationsProvider`");
    }
    return context;
}
export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = React.useState([]);
    const isMounted = useIsHydrated();
    const { top_center, top_right, bottom_left, bottom_right, top_left } = React.useMemo(() => {
        const result = {
            top_center: [],
            top_right: [],
            bottom_left: [],
            bottom_right: [],
            top_left: [],
        };
        notifications.forEach((notification) => {
            if (!notification.position || !(notification.position in result)) {
                result.top_center.push(notification);
            }
            else {
                result[notification.position].push(notification);
            }
        });
        return result;
    }, [notifications]);
    const removeNotification = React.useCallback((notificationId) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }, []);
    const notify = React.useCallback((notification) => {
        // insert id if not provided
        if (notification.id === undefined)
            notification.id = Date.now() + "";
        const notificationWithId = notification;
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
    const listProps = {
        className: clsx("fixed max-w-full w-[350px] max-h-[600px] overflow-auto pointer-events-none z-50", "p-4 box-border", "flex flex-col gap-3"),
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
    };
    if (!isMounted)
        return null;
    return (_jsxs(NotificationsContext.Provider, { value: { notify, removeNotification }, children: [createPortal(_jsx("ol", { ...listProps, className: clsx("fixed top-0 left-0", listProps.className), children: top_left.map((notification) => (_jsx(NotificationItem, { notification: notification }, notification.id))) }), document.body), createPortal(_jsx(NotificationsBox, { className: clsx("top-0 left-[50%] translate-x-[-50%]", listProps.className), children: top_center.map((notification) => (_jsx(NotificationItem, { notification: notification }, notification.id))) }), document.body), createPortal(_jsx(NotificationsBox, { className: clsx("fixed top-0 right-0", listProps.className), children: top_right.map((notification) => (_jsx(NotificationItem, { notification: notification }, notification.id))) }), document.body), createPortal(_jsx(NotificationsBox, { className: clsx("fixed bottom-0 right-0", listProps.className), children: bottom_right.map((notification) => (_jsx(NotificationItem, { notification: notification }, notification.id))) }), document.body), createPortal(_jsx(NotificationsBox, { className: clsx("fixed bottom-0 left-0", listProps.className), children: bottom_left.map((notification) => (_jsx(NotificationItem, { notification: notification }, notification.id))) }), document.body), children] }));
};
const NotificationsBox = ({ className, ...props }) => {
    return (_jsx("ol", { ...props, className: clsx("fixed max-w-full w-[350px] max-h-[600px] overflow-auto pointer-events-none z-50", "p-4 box-border", "flex flex-col gap-3", className), style: { scrollbarWidth: "none", msOverflowStyle: "none" }, ...props }));
};
const notificationBox = tv({
    base: "box-border flex w-full max-w-full pointer-events-auto px-3 py-2 rounded-sm overflow-hidden bg-opacity-15 shadow-sm",
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
const NotificationItem = ({ className, notification, ...props }) => {
    const icon = React.useMemo(() => {
        if (notification.icon)
            return notification.icon;
        else if (!notification.severity || notification.severity === "info")
            return _jsx(InfoCircleIcon, {});
        else if (notification.severity === "success")
            return _jsx(CheckCircleIcon, {});
        else if (notification.severity === "error")
            return _jsx(ExclamationMarkIcon, {});
        else if (notification.severity === "warning")
            return _jsx(QuestionCircleIcon, {});
        return _jsx(QuestionCircleIcon, {});
    }, [notification.severity]);
    return (_jsx(Fade, { show: true, unmount: true, children: _jsx("li", { ...props, className: clsx("bg-paper", className), children: _jsxs("div", { className: notificationBox({ className, severity: notification.severity }), children: [_jsx("span", { className: "text-base mr-3 mt-1", children: icon }), _jsx("div", { className: "grow", children: notification.message })] }) }) }));
};
