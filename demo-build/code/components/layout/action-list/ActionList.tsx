import React from "react";
import Card from "../cards/Card";
import clsx from "clsx";
import Loading from "../../data-display/feedback/Loading";
import Button from "../../input/buttons/Button";
import LinkContainer from "../../navigation/links/LinkContainer";
import Subtitle from "../../text/Subtitle";

interface ActionListProps {
    className?: string;
    children?: React.ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
    title?: string;
    titleIcon?: React.ReactElement;
}

export default function ActionList(props: ActionListProps) {
    const mappedChildren: React.ReactNode[] = [];
    const childrenArr = React.Children.toArray(props.children);
    const classes = clsx("flex flex-col min-h-0 flex-shrink-0 overflow-x-hidden", props.loading && "h-40", props.className);

    childrenArr.forEach((child, i) => {
        if (React.isValidElement(child)) {
            if (child.type === Button && child.props.href)
                mappedChildren.push(
                    <LinkContainer key={i} href={child.props.href}>
                        <Button {...child.props} href={undefined} sx={{ ...child.props.sx, justifyContent: "flex-start", width: 1 }} />
                    </LinkContainer>
                );
            else return mappedChildren.push(child);
        }
    });

    return (
        <div className={classes}>
            {props.title && (
                <Subtitle className="!mb-1" variant="subtitle2" icon={props.titleIcon}>
                    {props.title}
                </Subtitle>
            )}
            <Card tag="ol" style={props.style} variant="contained" className="unstyled-list">
                {props.loading ? <Loading tag={"li"} /> : mappedChildren}
            </Card>
        </div>
    );
}