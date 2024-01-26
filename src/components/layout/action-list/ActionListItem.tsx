// * SSR

import LinkContainer from "@react-client/components/navigation/links/LinkContainer/LinkContainer";
import React from "react";
import Styled from "@react-client/components/others/Styled";
import Typography from "@react-client/components/text/Typography/Typography";
import ShortText from "@react-client/components/text/ShortText/ShortText";

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
                <ShortText className="text-primary flex-grow flex">{props.children}</ShortText>
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
