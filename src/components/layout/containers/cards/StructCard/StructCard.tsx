// * SSR

import React from "react";
<<<<<<< HEAD:src/components/layout/containers/cards/struct-card.tsx
import Card from "./card";
import Toolbar from "../toolbar";
import Stack from "../stack";
import { PropsOf } from "@react-client/types";
=======
import Card from "../Card/Card";
import Toolbar from "../../Toolbar/Toolbar";
import Stack from "../../Stack/Stack";
import { PropsOf } from "@react-client/util";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c:src/components/layout/containers/cards/StructCard/StructCard.tsx
import clsx from "clsx";

interface StructCardProps {
    className?: string;
    style?: React.CSSProperties;
    shadow?: boolean;
    children?: React.ReactNode;
    tools?: React.ReactNode;
    heading?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    slotProps?: { header?: PropsOf<typeof Stack>; toolbar?: PropsOf<typeof Toolbar> };
    slots?: { header?: React.ReactNode; toolbar?: React.ReactNode };
}

const StructCard = React.forwardRef<Element, StructCardProps>((props, ref) => {
    return (
        <Card className={props.className} ref={ref} style={props.style} shadow={props.shadow} variant="outlined" noPadding onClick={props.onClick}>
            {props.slots?.header === undefined
                ? props.heading && (
                      <Stack
                          tag="header"
                          direction="row"
                          align="center"
                          minW0
                          {...props.slotProps?.header}
                          className={clsx("border-b-[0.5px]", props.slotProps?.header?.className)}
                      >
                          {props.heading}
                      </Stack>
                  )
                : props.slots?.header}
            <section className="flex flex-col flex-grow">{props.children}</section>
            {props.slots?.toolbar === undefined
                ? props.tools && (
                      <Toolbar tag="footer" borderTop justify="end" {...props.slotProps?.toolbar}>
                          {props.tools}
                      </Toolbar>
                  )
                : props.slots.toolbar}
        </Card>
    );
});

StructCard.displayName = "StructCard";

export default StructCard;