import React from "react";
import { StyleProps } from "@react-base/src/types";
import Props from "./ModuleDemoProps";
import Toolbar from "@react-base/src/components/layout/Toolbar";
import Tabs from "@react-base/src/components/navigation/tabs/Tabs";
import Tab from "@react-base/src/components/navigation/tabs/Tab";
import { DemoDef } from "src/types";
import Code from "../Code";
import clsx from "clsx";

interface ModulePreviewProps extends StyleProps {
    demo: DemoDef;
    path: string;
}

type TabId = "preview" | "code";

function demoFile(path: string) {
    return path.replace(/\.(ts|tsx)/, (match, ext) => `.demo.${ext}`);
}

function extractDemo(content: string) {
    const demoStartComment = "// demo_start";
    const start = content.indexOf(demoStartComment);
    const end = content.indexOf("// demo_end");
    if (start === -1 || end === -1) return content;
    return content.substring(start + demoStartComment.length, end).trim();
}

export default function ModulePreview(props: ModulePreviewProps) {
    const [p, setP] = React.useState<Record<string, any>>({});
    const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
    const Demo = props.demo.render;
    const codePath = "demo/src/_modules/" + demoFile(props.path);

    return (
        <div className={clsx("border rounded", props.className)} style={props.style}>
            <Toolbar padding="none" borderBottom>
                <Tabs activeId={activeTab} onChange={tabId => setActiveTab(tabId as TabId)}>
                    <Tab id={"preview"}>Preview</Tab>
                    <Tab id={"code"}>Preview-Code</Tab>
                </Tabs>
            </Toolbar>
            <div className="flex flex-col">
                {activeTab === "preview" && (
                    <>
                        <div className="overflow-y-auto" style={{ maxHeight: 500 }}>
                            <Demo demoProps={p} />
                        </div>
                        <Props className="border-t" onChange={p => setP(p)} propDefs={props.demo.demoProps || []} />
                    </>
                )}
                {activeTab === "code" && <Code transformContent={extractDemo} style={{ maxHeight: 600 }} className="px-3 py-2" path={codePath} />}
            </div>
        </div>
    );
}
