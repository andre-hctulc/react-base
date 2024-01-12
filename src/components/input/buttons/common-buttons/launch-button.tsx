import type { PropsOf } from "@react-client/util";
import Button from "../button";
import LaunchIcon from "@react-client/components/icons/collection/launch";

export default function LaunchButton(props: PropsOf<typeof Button>) {
    return (
        <Button variant="outlined" endIcon={<LaunchIcon />} {...props}>
            {props.children}
        </Button>
    );
}
