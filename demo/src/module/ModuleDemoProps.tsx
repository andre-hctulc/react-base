import clsx from "clsx";
import JSForm from "@/src/components/input/form/JSForm";
import { StyleProps } from "@/src/types";
import Prop from "./ModuleDemoProp";
import { PropDef } from "src/types";
import Typography from "@/src/components/text/Typography";

interface PropsProps extends StyleProps {
    propDefs: PropDef[];
    onChange?: (props: Record<string, any>) => void;
}

export default function Props(props: PropsProps) {
    return (
        <JSForm
            onChange={({ data }) => {
                props.onChange?.(data);
            }}
            className={clsx("flex flex-wrap overflow-y-auto p-2", props.className)}
            style={{ maxHeight: 200 }}
            flex="wrap"
            gap="medium"
        >
            <Typography disabled truncate className="w-full">
                Presented Props
            </Typography>
            {props.propDefs.map(def => (
                <Prop className="max-w-full" style={{ width: 220 }} desc={def} key={def.propName} />
            ))}
        </JSForm>
    );
}
