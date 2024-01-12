import type { PropsOf } from "@react-client/util";
import Button from "../button";
import ArrowRightIcon from "@react-client/components/icons/collection/arrow-right";

export default function NextButton(props: PropsOf<typeof Button>) {
    return (
        <Button endIcon={<ArrowRightIcon />} {...props}>
            {props.children}
        </Button>
    );
}
