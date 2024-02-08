import React from "react";
import LinkContainer from "../../navigation/links/LinkContainer";
import Styled from "../../others/Styled";
import Typography from "../../text/Typography";

interface ActionListOtemProps {
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    children: string;
    endElement?: React.ReactNode;
    endIcon?: React.ReactElement;
}

const ActionListItem = React.forwardRef<HTMLLIElement, ActionListOtemProps>((props, ref) => {
    return (
        <li ref={ref} className="w-full min-w-0 hover:bg-primary/10">
            <LinkContainer className="flex flex-grow min-w-0 items-center px-2 py-1.5" href={props.href} onClick={props.onClick}>
                <Typography truncate className="text-primary flex-grow flex">{props.children}</Typography>
                {props.endElement}
                {props.endIcon && (
                    <Styled className="ml-2" color="primary">
                        {props.endIcon}
                    </Styled>
                )}
            </LinkContainer>
        </li>
    );
});

ActionListItem.displayName = "ActionListItem";

export default ActionListItem;
