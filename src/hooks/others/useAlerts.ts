import React from "react";
import { AlertContext } from "../../providers/AlertsProvider";

export default function useAlerts() {
    const alertsContext = React.useContext(AlertContext);
    if (!alertsContext) throw new Error("`AlertsProvider` required");
    return alertsContext;
}
