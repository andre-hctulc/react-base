import Tooltip from "@react-client/components/dialogs/Tooltip/Tooltip";
import IconButton from "../buttons/IconButton/IconButton";

export interface EditorToolProps {
    disabled?: boolean;
    children: React.ReactElement;
    tooltip?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EditorTool(props: EditorToolProps) {
    const button = (
        <IconButton onClick={props.onClick} className={props.className} style={props.style} disabled={props.disabled}>
            {props.children}
        </IconButton>
    );

    if (props.tooltip) return <Tooltip content={props.tooltip}>{button}</Tooltip>;
    else return <>{button}</>;
}
