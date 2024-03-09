import React from "react";
import { AlertContext } from "../../components/alerts/AlertsProvider";

export default function useAlerts() {
    const alertsContext = React.useContext(AlertContext);
    if (!alertsContext) throw new Error("`AlertsProvider` required");
    return alertsContext;
}
