import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FC } from "react";
import { Draggable } from "../src/components/draggable.js";
import { Droppable } from "../src/components/droppable.js";

const meta = { title: "Components/Draggable" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DragAndDropExample: FC = () => {
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
};

export const DragAndDrop: Story = {
    render: () => <DragAndDropExample />,
};
