import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { FieldFilter } from "../src/components/field-filter.js";
import { FieldTemplateCtx, FormContextProvider, useField } from "../src/components/form-context.js";
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

export const HorizontalFieldTemplate: Story = {
    render: () => (
        <FieldTemplate
            className="max-w-xl"
            orientation="horizontal"
            params={{
                name: "email",
                label: "Email",
                description: "Used for account notifications.",
                error: "Enter a valid email address.",
            }}
        >
            <Input type="email" />
        </FieldTemplate>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const label = canvas.getByText("Email");
        const input = canvas.getByRole("textbox", { name: "Email" });
        const field = input.closest('[data-slot="field"]')!;
        const content = field.querySelector('[data-slot="field-content"]')!;

        await expect(field).toHaveAttribute("data-orientation", "horizontal");
        await expect(label.parentElement).toBe(field);
        await expect(content).toContainElement(input);
        await expect(content).toHaveTextContent("Used for account notifications.");
        await expect(content).toHaveTextContent("Enter a valid email address.");
    },
};

function ContextFieldInfo() {
    const { params } = useField("project");
    return <output aria-label="Context field">{JSON.stringify(params)}</output>;
}

function ContextFieldsExample() {
    const [updated, setUpdated] = useState(false);
    const namePrefix = updated ? "team." : "workspace.";
    return (
        <div className="grid max-w-xl gap-4">
            <button onClick={() => setUpdated(true)}>Update context</button>
            <FormContextProvider
                options={{ namePrefix, omit: updated ? ["hidden"] : [], plain: updated }}
                formValues={{ [`${namePrefix}project`]: updated ? "Updated" : "Initial" }}
                defaultFormValues={{ [`${namePrefix}project`]: updated ? "New default" : "Default" }}
            >
                <ContextFieldInfo />
                <FieldTemplateCtx
                    params={{
                        name: "project",
                        label: "Context project",
                        description: "Project description",
                    }}
                >
                    <Input name="project" readOnly />
                </FieldTemplateCtx>
                <FieldTemplateCtx params={{ name: "project", label: "Rendered project" }}>
                    {({ name, value }) => (
                        <input aria-label="Rendered project" name={name} value={value} readOnly />
                    )}
                </FieldTemplateCtx>
                <FieldTemplateCtx
                    params={{ name: "project", label: "Explicit value", value: "Override" }}
                >
                    <Input readOnly />
                </FieldTemplateCtx>
                <FieldTemplateCtx params={{ name: "hidden", label: "Hidden field" }}>
                    <Input />
                </FieldTemplateCtx>
                <FieldTemplateCtx params={{ name: "project" }} injectInputProps={false}>
                    <Input aria-label="Unmodified input" name="custom" defaultValue="Child" />
                </FieldTemplateCtx>
            </FormContextProvider>
            <FieldTemplate params={{ name: "template", label: "Standalone input" }}>
                <Input name="standalone" />
            </FieldTemplate>
        </div>
    );
}

export const ContextFields: Story = {
    render: () => <ContextFieldsExample />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkContext = async (prefix: string, value: string, defaultValue: string) => {
            await expect(canvas.getByLabelText("Context field")).toHaveTextContent(
                JSON.stringify({ name: `${prefix}project`, value, defaultValue }),
            );
            for (const label of ["Context project", "Rendered project", "Explicit value"]) {
                await expect(canvas.getByRole("textbox", { name: label })).toHaveAttribute(
                    "name",
                    `${prefix}project`,
                );
            }
            await expect(canvas.getByRole("textbox", { name: "Context project" })).toHaveValue(value);
            await expect(canvas.getByRole("textbox", { name: "Rendered project" })).toHaveValue(value);
            await expect(canvas.getByRole("textbox", { name: "Explicit value" })).toHaveValue("Override");
        };
        await checkContext("workspace.", "Initial", "Default");
        await expect(canvas.getByRole("textbox", { name: "Hidden field" })).toBeInTheDocument();
        await expect(canvas.getByText("Project description")).toBeInTheDocument();
        await userEvent.click(canvas.getByRole("button", { name: "Update context" }));
        await checkContext("team.", "Updated", "New default");
        await expect(canvas.queryByRole("textbox", { name: "Hidden field" })).not.toBeInTheDocument();
        await expect(canvas.queryByText("Project description")).not.toBeInTheDocument();
        await expect(canvas.getByRole("textbox", { name: "Unmodified input" })).toHaveAttribute("name", "custom");
        await expect(canvas.getByRole("textbox", { name: "Unmodified input" })).toHaveValue("Child");
        await expect(canvas.getByRole("textbox", { name: "Standalone input" })).toHaveAttribute("name", "standalone");
    },
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
