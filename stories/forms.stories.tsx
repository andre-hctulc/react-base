import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { FieldFilter } from "../src/components/field-filter.js";
import { FieldTemplate } from "../src/components/field-template.js";
import { InputList } from "../src/components/input-list.js";
import { JsonForm } from "../src/components/json-form.js";
import { RadioGroupFactory } from "../src/components/radio-group-factory.js";
import { SelectFactory } from "../src/components/select-factory.js";
import { TextInputList } from "../src/components/text-input-list.js";
import { TextInputMap } from "../src/components/text-input-map.js";
import { Input } from "../src/components/ui/input.js";

const meta = {
    title: "Components/Forms",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function InputListExample() {
    return (
        <InputList
            defaultValue={["platform@example.com"]}
            unique
            className="max-w-md space-y-3"
            renderInput={({ inputProps: { onChange, ...inputProps } }) => (
                <Input
                    {...inputProps}
                    value={inputProps.value ?? ""}
                    onChange={(event) => onChange({ value: event.target.value })}
                    placeholder="Add email"
                />
            )}
        />
    );
}

export const Lists: Story = {
    render: () => (
        <div className="grid max-w-2xl gap-8 md:grid-cols-2">
            <InputListExample />
            <TextInputList defaultValue={["Monthly review"]} placeholder="Add task" unique />
        </div>
    ),
};

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

export const SelectionFactories: Story = {
    render: () => (
        <div className="grid max-w-xl gap-8">
            <SelectFactory
                items={{
                    Administration: [{ label: "Administrator", value: "admin" }],
                    Members: [
                        { label: "Editor", value: "editor" },
                        { label: "Viewer", value: "viewer" },
                    ],
                }}
                defaultValue="editor"
            />
            <RadioGroupFactory
                variant="cards"
                options={[
                    { title: "Personal", value: "personal", description: "Only you can access it." },
                    { title: "Team", value: "team", description: "Share with your workspace." },
                ]}
                defaultValue="team"
            />
        </div>
    ),
};

export const FilteringAndFieldTemplate: Story = {
    render: () => (
        <div className="flex max-w-xl items-start gap-4">
            <FieldFilter label="Created at" type="date" showTypeSelector />
            <FieldTemplate
                params={{
                    name: "project",
                    label: "Project name",
                    description: "Shown to workspace members.",
                }}
            >
                <Input defaultValue="FDC Platform" />
            </FieldTemplate>
        </div>
    ),
};

export const SchemaForm: Story = {
    render: () => (
        <JsonForm
            className="max-w-lg"
            submitButton
            defaultValue={{ name: "FDC Platform", notifications: true }}
            schema={{
                type: "object",
                required: ["name"],
                properties: {
                    name: { type: "string", title: "Workspace name" },
                    notifications: { type: "boolean", title: "Email notifications" },
                },
            }}
        />
    ),
};
