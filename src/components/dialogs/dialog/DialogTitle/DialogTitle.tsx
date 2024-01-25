// * SSR

import ShortText from "@react-client/components/text/short-text";

interface DialogTitleProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function DialogTitle(props: DialogTitleProps) {
    return (
        <ShortText tag={typeof props.children === "string" ? "h4" : "div"} className={props.className} alignCenter bold="medium" style={props.style}>
            {props.children}
        </ShortText>
    );
}
