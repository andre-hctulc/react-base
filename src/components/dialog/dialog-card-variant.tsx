import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { CardHeader } from "../containers/card-header.js";
import { CardBody } from "../containers/card-body.js";
import { CardFooter } from "../containers/card-footer.js";

export const DialogHeader: FC<PropsOf<typeof CardHeader>> = (props) => {
    return <CardHeader size="lg" {...props} />;
};

export const DialogBody: FC<PropsOf<typeof CardBody>> = (props) => {
    return <CardBody size="lg" {...props} />;
};

export const DialogFooter: FC<PropsOf<typeof CardFooter>> = (props) => {
    return <CardFooter size="lg" {...props} />;
};
