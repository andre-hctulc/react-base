import type { PropsOf } from "@react-client/util";
import Button from "../button";
import ArrowUpRightIcon from "@react-client/components/icons/collection/arrow-up-right";

export default function ShowButton(props: PropsOf<typeof Button>) {
    return (
        <Button endIcon={<ArrowUpRightIcon />} {...props}>
            {props.children || "Anzeigen"}
        </Button>
    );
}
