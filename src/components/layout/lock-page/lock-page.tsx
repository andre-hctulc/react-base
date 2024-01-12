// * SSR

import VHCenter from "@react-client/components/layout/containers/vh-center";
import Styled from "@react-client/components/others/styled";
import Card from "../containers/cards/card";
import Typography from "@react-client/components/text/typography";
import clsx from "clsx";
import Alert from "@react-client/components/data-display/alerts/alert";
import { PropsOf } from "@react-client/util";
import Stack from "../containers/stack";

export default function LockPage(props: {
    title?: string;
    children?: React.ReactNode;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactElement;
    errorMessage?: string | boolean;
    bouncingIcon?: boolean;
    slotProps?: { card?: PropsOf<typeof Card> };
}) {
    const cardClasses = clsx("w-[450px] max-w-[450px] bg-bg", props.loading ? "border-0" : "border-1", props.slotProps?.card?.className);

    return (
        <VHCenter className="flex-grow h-full">
            <Card variant="outlined" {...props.slotProps?.card} className={cardClasses}>
                {props.icon && (
                    <Stack align="center">
                        <Styled disabled size="large" className={props.bouncingIcon === false ? undefined : "animate-bounce"}>
                            {props.icon}
                        </Styled>
                    </Stack>
                )}
                {props.title && (
                    <Typography className="text.center font-normal mb-5 mt-5" variant="h5">
                        {props.title}
                    </Typography>
                )}
                {props.errorMessage ? (
                    <Alert severity="error" className={"mt-5"}>
                        {props.errorMessage === true ? "Ein unerwarteter Fehler ist aufgetreten. Bitte lade die Seite neu." : props.errorMessage}
                    </Alert>
                ) : (
                    props.children
                )}
            </Card>
        </VHCenter>
    );
}
