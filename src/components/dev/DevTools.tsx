"use client";

import React from "react";
import IconButton from "../buttons/IconButton";
import XIcon from "../icons/collection/X";
import ExpandIcon from "../icons/collection/Expand";
import Toolbar from "../feedback/Toolbar";
import Tab from "../navigation/Tab";
import Tabs from "../navigation/Tabs";
import { useDev } from "./DevProvider";

type Position = "top_left" | "top_right" | "bottom_left" | "bottom_right";

interface DevToolsProps {
    tabs?: { title: string; render: React.ReactNode }[];
    position?: Position;
    height?: number;
    width?: number;
}

const height = 300;
const width = 300;

export default function DevTools(props: DevToolsProps) {
    const { devMode } = useDev();
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [position, setPosition] = React.useState<Position>(props.position || "top_right");
    const [activeTab, setActiveTab] = React.useState<string | undefined>(() => props.tabs?.[0]?.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeElement = React.useMemo(() => props.tabs?.filter(tab => tab?.title === activeTab)[0]?.render, [activeTab]);
    const positionStyle = React.useMemo<React.CSSProperties>(() => {
        switch (position) {
            case "top_left":
                return { top: 0, left: 0 };
            case "top_right":
                return { top: 0, right: 0 };
            case "bottom_left":
                return { bottom: 0, left: 0 };
            case "bottom_right":
                return { bottom: 0, right: 0 };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);
    const [open, setOpen] = React.useState(false);

    if (!devMode) return null;

    return (
        <div
            style={{
                height: open ? props.height || height : undefined,
                width: open ? props.width || width : undefined,
                zIndex: 999,
                ...positionStyle,
            }}
            className="shadow-md m-2 fixed flex flex-col bg-bg border rounded"
        >
            {open ? (
                <>
                    <Toolbar>
                        <IconButton className="ml-auto" onClick={() => setOpen(false)}>
                            <XIcon />
                        </IconButton>
                    </Toolbar>
                    <Tabs activeId={activeTab} onChange={tabId => setActiveTab(tabId as string)}>
                        {props.tabs?.map(tab => {
                            const title = tab.title;

                            if (!title) return null;

                            return (
                                <Tab key={title} id={title}>
                                    {title}
                                </Tab>
                            );
                        })}
                    </Tabs>
                    <div className="flex flex-col flex-grow overflow-y-scroll min-h-0 p-1">{activeElement}</div>
                </>
            ) : (
                <div className="p-1 text-lg cursor-pointer">
                    <IconButton onClick={() => setOpen(true)}>
                        <ExpandIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
}
