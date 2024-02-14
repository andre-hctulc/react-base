import { StyleProps } from "@react-base/src/types";
import Select from "@react-base/src/components/input/base/Select";
import Input from "@react-base/src/components/input/base/Input";
import Slider from "@react-base/src/components/input/base/Slider";
import CheckBox from "@react-base/src/components/input/base/CheckBox";
import { PropDef } from "src/types";

interface PropProps extends StyleProps {
    desc: PropDef;
}

export default function Prop({ desc, ...props }: PropProps) {
    const inpProps = {
        name: desc.propName,
        helperText: desc.helperText,
        defaultValue: desc.defaultValue,
        label: desc.propName,
        style: props.style,
        className: props.className,
    };

    let inp: React.ReactElement;

    switch (desc.type) {
        case "string":
            if (desc.listValues) inp = <Select {...inpProps} options={desc.listValues.map(listValue => ({ label: listValue, value: listValue }))} />;
            else inp = <Input {...inpProps} type="text" />;
            break;
        case "boolean":
            inp = <CheckBox vertical {...inpProps} />;
            break;
        case "array":
            inp = <Input {...inpProps} helperText="Werte mit Komma getrennt" />;
            break;
        case "number":
            if (desc.range) inp = <Slider min={desc.range[0]} max={desc.range[1]}></Slider>;
            else inp = <Input {...inpProps} type="number" />;
            break;
        default:
            return null;
    }

    return inp;
}
