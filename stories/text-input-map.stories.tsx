import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "@storybook/test";
import { TextInputMap } from "../src/components/text-input-map.js";

const meta = { title: "Components/TextInputMap" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlledMapExample() {
    const [value, setValue] = useState<Record<string, string>>({ language: "en" });

    return (
        <TextInputMap
            id="controlled-map"
            name="settings"
            value={value}
            onChange={({ value }) => setValue(value)}
            keyPlaceholder="Setting"
            placeholder="Value"
        />
    );
}

export const Maps: Story = {
    render: () => (
        <div className="grid max-w-3xl gap-8">
            <ControlledMapExample />
            <TextInputMap
                id="multiline-map"
                name="notes"
                textarea
                defaultValue={{ summary: "Monthly review" }}
                keyPlaceholder="Note"
                placeholder="Content"
            />
        </div>
    ),
};

export const ReadOnlyAndDisabledMaps: Story = {
    render: () => (
        <div className="grid max-w-3xl gap-8">
            <TextInputMap id="readonly-map" readOnly defaultValue={{ language: "en" }} />
            <TextInputMap id="disabled-map" disabled defaultValue={{ language: "en" }} />
        </div>
    ),
};

export const DraftInputPlacement: Story = {
    render: () => (
        <div className="grid max-w-xl gap-4">
            {[undefined, false].map((reverse) => (
                <TextInputMap key={String(reverse)} aria-label={`Map ${reverse === false ? "top" : "bottom"}`}
                    role="group" reverse={reverse} defaultValue={{ language: "en" }}
                    keyPlaceholder="New key" placeholder="New value" />
            ))}
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        for (const position of ["top", "bottom"]) {
            const group = within(canvas.getByRole("group", { name: `Map ${position}` }));
            const existing = group.getByRole("textbox", { name: "Value for language" });
            const draft = group.getByRole("textbox", { name: "New value" });
            const [first, second] = position === "bottom" ? [existing, draft] : [draft, existing];
            await expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            await userEvent.type(group.getByRole("textbox", { name: "New key" }), "timezone");
            await userEvent.type(draft, "Added{Enter}");
            await expect(group.getAllByRole("listitem")).toHaveLength(2);
            await expect(group.getByRole("textbox", { name: "Value for timezone" })).toHaveValue("Added");
            await expect(group.getByRole("textbox", { name: "New value" })).toHaveValue("");
            await expect(group.getByRole("textbox", { name: "New key" })).toHaveFocus();
        }
    },
};
