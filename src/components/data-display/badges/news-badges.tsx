import type { PropsOf } from "@react-client/types";
import Badge from "./badge";
import StaticBadge from "./static-badge";

export function NewsBadge(props: Omit<PropsOf<typeof Badge>, "color">) {
    return (
        <Badge {...props} color="new">
            {props.children}
        </Badge>
    );
}

export function StaticNewsBadge(props: Omit<PropsOf<typeof StaticBadge>, "color">) {
    return (
        <StaticBadge {...props} color="new">
            {props.children}
        </StaticBadge>
    );
}
