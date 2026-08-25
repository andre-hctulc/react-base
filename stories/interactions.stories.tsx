import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Broadcast } from "../src/components/broadcast.js";
import { Bubble } from "../src/components/bubble.js";
import { ClipboardIconButton } from "../src/components/clipboard-icon-button.js";
import { Delayed } from "../src/components/delayed.js";
import { Draggable } from "../src/components/draggable.js";
import { Droppable } from "../src/components/droppable.js";
import { Overlay } from "../src/components/overlay.js";
import { UploadZone } from "../src/components/upload-zone.js";
import { XScroll } from "../src/components/x-scroll.js";

const meta = {
    title: "Components/Interactions",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function DragAndDropExample() {
    const [dropped, setDropped] = useState(false);

    return (
        <div className="grid max-w-xl gap-4 md:grid-cols-2">
            <Draggable className="cursor-grab rounded-md border bg-muted p-4 active:cursor-grabbing">
                Drag this item
            </Draggable>
            <Droppable
                className="rounded-md border border-dashed p-4 text-center"
                onDrop={() => setDropped(true)}
            >
                {dropped ? "Item dropped" : "Drop area"}
            </Droppable>
        </div>
    );
}

function DelayedExample() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="space-y-3">
            <button
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                onClick={() => setVisible((current) => !current)}
            >
                Toggle delayed content
            </button>
            <Delayed
                delay={600}
                in={visible}
                renderDelay={<span className="text-muted-foreground">Waiting...</span>}
            >
                <span className="font-medium">Ready</span>
            </Delayed>
        </div>
    );
}

export const Clipboard: Story = {
    render: () => <ClipboardIconButton valueToCopy="fdc-platform" aria-label="Copy workspace name" />,
};

export const DragAndDrop: Story = {
    render: () => <DragAndDropExample />,
};

export const FileUpload: Story = {
    render: () => (
        <UploadZone
            className="max-w-lg"
            accept=".json,.yaml"
            text="Upload configuration"
            secondaryText="Drop a JSON or YAML file here"
            renderFiles={(files) => (
                <p className="mt-3 text-sm text-muted-foreground">{files.length} file(s) selected</p>
            )}
        />
    ),
};

export const DelayedContent: Story = {
    render: () => <DelayedExample />,
};

export const OverlayExample: Story = {
    render: () => (
        <div className="relative h-44 overflow-hidden rounded-md border bg-muted">
            <p className="p-4">Protected content</p>
            <Overlay variant="absolute" bg="blur" centerContent>
                <span className="rounded-md bg-background px-3 py-2 text-sm shadow">Overlay content</span>
            </Overlay>
        </div>
    ),
};

export const EventAndPropHelpers: Story = {
    render: () => (
        <div className="space-y-6">
            <Broadcast props={{ className: "rounded-md border bg-muted px-3 py-2 text-sm" }}>
                <button type="button">Broadcast props</button>
                <button type="button">to children</button>
            </Broadcast>
            <Bubble eventProp="onClick" onBubble={(event) => console.log(event.type)}>
                <button className="rounded-md border px-3 py-2 text-sm" type="button">
                    Bubble click event
                </button>
            </Bubble>
            <XScroll hideScrollbar>
                <div className="flex w-48 gap-3 overflow-x-auto rounded-md border p-3">
                    {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((item) => (
                        <span key={item} className="shrink-0 rounded bg-muted px-3 py-2 text-sm">
                            {item}
                        </span>
                    ))}
                </div>
            </XScroll>
        </div>
    ),
};
