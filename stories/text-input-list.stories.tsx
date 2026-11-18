import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "@storybook/test";
import { TextInputList } from "../src/components/text-input-list.js";

const meta = { title: "Components/TextInputList" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlledListExample() {
    const [value, setValue] = useState(["Repeated", "Repeated"]);

    return (
        <TextInputList
            name="tasks"
            value={value}
            onChange={({ value }) => setValue(value)}
            placeholder="New task"
        />
    );
}

export const Default: Story = {
    render: () => <TextInputList defaultValue={["Monthly review"]} placeholder="Add task" unique />,
};

export const DraftInputPlacement: Story = {
    render: () => (
        <div className="grid max-w-xl gap-4">
            {[undefined, false].map((reverse) => (
                <TextInputList key={String(reverse)} aria-label={`List ${reverse === false ? "top" : "bottom"}`}
                    role="group" reverse={reverse} defaultValue={["Existing item"]} placeholder="New item" />
            ))}
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        for (const position of ["top", "bottom"]) {
            const group = within(canvas.getByRole("group", { name: `List ${position}` }));
            const existing = group.getByRole("textbox", { name: "Item 1" });
            const draft = group.getByRole("textbox", { name: "New item" });
            const [first, second] = position === "bottom" ? [existing, draft] : [draft, existing];
            await expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            await userEvent.type(draft, "Added{Enter}");
            await expect(group.getAllByRole("listitem")).toHaveLength(2);
            await expect(group.getByRole("textbox", { name: "Item 2" })).toHaveValue("Added");
            const nextDraft = group.getByRole("textbox", { name: "New item" });
            await expect(nextDraft).toHaveValue("");
            await expect(nextDraft).toHaveFocus();
        }
    },
};

export const ListControls: Story = {
    render: () => <ControlledListExample />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole("button", { name: "Remove item 1" }));
        await expect(canvas.getAllByRole("listitem")).toHaveLength(1);
        await expect(canvas.getByRole("textbox", { name: "Item 1" })).toHaveValue("Repeated");
        await userEvent.clear(canvas.getByRole("textbox", { name: "Item 1" }));
        await userEvent.type(canvas.getByRole("textbox", { name: "Item 1" }), "Edited");
        await expect(canvas.getByRole("textbox", { name: "Item 1" })).toHaveValue("Edited");
        await userEvent.type(canvas.getByRole("textbox", { name: "New task" }), "Added{Enter}");
        await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
        await expect(canvas.getByRole("textbox", { name: "Item 2" })).toHaveValue("Added");
        await expect(canvas.getByRole("textbox", { name: "New task" })).toHaveValue("");
        await expect(canvas.getByRole("textbox", { name: "New task" })).toHaveFocus();
    },
};
