"use client";

import Drawer from "@react-client/components/dialogs/drawer/drawer";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "./loading/loading";
import useAsset from "@react-client/hooks/others/use-asset";
import IconButton from "@react-client/components/input/buttons/icon-button";
import QuestionMarkCircleOutlineIcon from "@react-client/components/icons/collection/question-mark-circle-outline";
import DrawerHeader from "@react-client/components/dialogs/drawer/drawer-header";

interface HelpProps {
    /** Relativer Pfad in _public/help_. Der Pfad sollte also __nicht__ mit '/' beginnen und muss die Datei-Extension enthalten. */
    path: string;
    className?: string;
    style?: React.CSSProperties;
    drawerZIndex?: number;
}

const Markdown = dynamic(() => import("@react-client/components/data-display/markdown"), { loading: () => <Loading /> });

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
