import type { PropsOf } from "@react-client/util";
import Button from "../button";
import PlusIcon from "@react-client/components/icons/collection/plus";

export default function CreateButton(props: PropsOf<typeof Button>) {
    return (
        <Button variant="outlined" endIcon={<PlusIcon />} {...props}>
            {props.children}
        </Button>
    );
}
