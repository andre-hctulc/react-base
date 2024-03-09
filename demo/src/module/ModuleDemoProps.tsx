import clsx from "clsx";
import { JSForm, Typography } from "@react-base/src/components";
import { StyleProps } from "@react-base/src/types";
import Prop from "./ModuleDemoProp";
import { PropDef } from "src/types";

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
            className={clsx("overflow-y-auto p-2", props.className)}
            style={{ maxHeight: 200 }}
            flexWrap
            flex="row"
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
