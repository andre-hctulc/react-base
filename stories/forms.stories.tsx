import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FieldFilter } from "../src/components/field-filter.js";
import { FieldTemplate } from "../src/components/field-template.js";
import { InputList } from "../src/components/input-list.js";
import { JsonForm } from "../src/components/json-form.js";
import { RadioGroupFactory } from "../src/components/radio-group-factory.js";
import { SelectFactory } from "../src/components/select-factory.js";
import { TextInputList } from "../src/components/text-input-list.js";
import { Input } from "../src/components/ui/input.js";

const meta = {
    title: "Components/Forms",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function InputListExample() {
    const [candidate, setCandidate] = useState("");

    return (
        <InputList
            defaultValue={["platform@example.com"]}
            unique
            className="max-w-md space-y-3"
            renderInput={({ add }) => (
                <div className="flex gap-2">
                    <input
                        className="h-9 grow rounded-md border bg-background px-3 text-sm"
                        value={candidate}
                        onChange={(event) => setCandidate(event.target.value)}
                        placeholder="Add email"
                    />
                    <button
                        className="rounded-md bg-primary px-3 text-sm text-primary-foreground"
                        type="button"
                        onClick={() => {
                            add(candidate);
                            setCandidate("");
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
            renderValues={({ values, remove }) => (
                <ul className="space-y-2">
                    {values.map((value) => (
                        <li
                            key={value}
                            className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                        >
                            {value}
                            <button className="text-destructive" type="button" onClick={() => remove(value)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
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
