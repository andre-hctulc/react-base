"use client";

import React from "react";
import Loading from "../../data-display/feedback/Loading";
import useAsset from "../../../hooks/others/useAssets";
import QuestionMarkCircleOutlineIcon from "../../icons/collection/QuestionMarkCircleOutline";
import IconButton from "../../input/buttons/IconButton";
import Drawer from "./Drawer";
import DrawerHeader from "./DrawerHeader";
import Markdown from "../../data-display/Markdown";

interface HelpProps {
    /** Relativer Pfad in _public/help_. Der Pfad sollte also __nicht__ mit '/' beginnen und muss die Datei-Extension enthalten. */
    path: string;
    className?: string;
    style?: React.CSSProperties;
    drawerZIndex?: number;
}

export default function Help(props: HelpProps) {
    const [open, setOpen] = React.useState(false);
    const { data: md, isLoading, error } = useAsset(`/help/${props.path}`, { enabled: open });

    return (
        <div className={props.className} style={props.style}>
            <IconButton iconSize={20} onClick={() => setOpen(true)}>
                <QuestionMarkCircleOutlineIcon color="text_secondary" />
            </IconButton>
            <Drawer zIndex={props.drawerZIndex} open={open} onClose={() => setOpen(false)}>
                <DrawerHeader icon={<QuestionMarkCircleOutlineIcon />} />
                {isLoading && <Loading />}
                {open && md && !isLoading && <Markdown>{md}</Markdown>}
            </Drawer>
        </div>
    );
}
