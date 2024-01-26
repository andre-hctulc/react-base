import React from "react";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import Popover from "@react-client/components/dialogs/popover/Popover/Popover";
import Typography from "@react-client/components/text/Typography/Typography";
import IconButton from "../buttons/IconButton/IconButton";
import ChevronDownIcon from "@react-client/components/icons/collection/chevron-down";
import clsx from "clsx";

function parseFontSize(value: any): string {
    if (value === "px") return "px";
    if (typeof value === "string") value = parseInt(value);
    if (!Number.isInteger(value)) value = 18;
    return value + "px";
}

interface FontSizeSelectProps {
    style?: React.CSSProperties;
    onChange?: (newFontSize: number) => void;
    small?: boolean;
    className?: string;
}

export type SchriftGröße = {
    size: number;
    name: string;
};

const schriftgrößen: SchriftGröße[] = [
    { size: 2, name: "klein" },
    { size: 3, name: "standard" },
    { size: 5, name: "groß" },
    { size: 7, name: "sehr groß" },
];

export default function FontSizeSelect(props: FontSizeSelectProps) {
    const root = React.useRef<HTMLDivElement>();
    //const [fontSize, setFontSize] = React.useState(3);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const classes = clsx("border-b", props.className);

    // React.useEffect(() => {
    //     props.onChange?.(fontSize);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [fontSize]);

    return (
        <Stack style={props.style} ref={root as any} className={classes}>
            <Stack direction="row" align="center">
                {/* <input
                    className="w-10 p-0 border-0 text-sm focus:outline-unset"
                    onChange={e => setFontSize(parseInt(e.target.value))}
                    value={parseFontSize(fontSize)}
                    onBlur={e => {
                        if (e.target.value === "px") setFontSize(18);
                    }}
                /> */}
                <Typography>Größe</Typography>
                <IconButton
                    size="small"
                    onClick={e => {
                        e.preventDefault();

                        setPopoverOpen(true);
                    }}
                >
                    <ChevronDownIcon />
                </IconButton>
            </Stack>
            <Popover slotProps={{ card: { className: "!p-0" } }} open={popoverOpen} anchor={root.current} onClose={() => setPopoverOpen(false)}>
                <Stack className="overflow-y-auto" style={{ maxHeight: 200 }}>
                    {schriftgrößen.map(eintrag => (
                        <button
                            className="hover:bg-action-hover cursor-pointer text-center"
                            key={eintrag.size}
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();

                                props.onChange?.(eintrag.size);

                                //setFontSize(eintrag.size);
                                setPopoverOpen(false);
                            }}
                            style={{ fontSize: eintrag.size * 6, paddingLeft: "4px", paddingRight: "4px" }}
                        >
                            {eintrag.name}
                        </button>
                    ))}
                </Stack>
            </Popover>
        </Stack>
    );
}
