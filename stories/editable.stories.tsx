import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Editable, EditEffect } from "../src/components/editable.js";
import { Input } from "../src/components/ui/input.js";

const meta = { title: "Components/Editable" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function EditableExample() {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="space-y-3">
            <button
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                onClick={() => setEditMode((value) => !value)}
            >
                Toggle edit mode
            </button>
            <Editable editMode={editMode}>
                <EditEffect
                    defaultValue="FDC Platform"
                    renderInput={({ value }) => <Input value={value} />}
                    renderValue={({ value }) => <p className="font-medium">{value}</p>}
                />
            </Editable>
        </div>
    );
}

export const Default: Story = { render: () => <EditableExample /> };
