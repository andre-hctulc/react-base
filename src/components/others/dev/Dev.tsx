import { devMode } from "@client-util/const";

interface DevProps {
    children?: React.ReactNode;
    hidden?: boolean;
    highlight?: boolean;
}

/** Wird nur im _Dev Mode_ gerendert  */
export default function Dev(props: DevProps) {
    if (!devMode || props.hidden) return null;
    else {
        if (props.highlight) return <span className={typeof props.children === "string" ? "text-common-violet" : "bg-common-yellow/50"}>{props.children}</span>;
        else return <>{props.children}</>;
    }
}
