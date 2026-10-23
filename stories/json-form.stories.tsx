import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { JsonForm, type JsonFormProps } from "../src/components/json-form.js";
import { workspaceProfileSchema } from "./json-form.schema.js";

const meta = {
    title: "Components/JsonForm",
    component: JsonForm,
    args: {
        className: "max-w-xl",
        schema: {
            type: "object",
            properties: {
                name: { type: "string", title: "Name" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "JSON Schema forms with optional field help, editable additional-property keys, array controls, validation, and controlled or initial values.",
            },
        },
    },
} satisfies Meta<typeof JsonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NestedFields: Story = {
    args: {
        className: "max-w-2xl",
        schema: workspaceProfileSchema,
        defaultValue: {
            workspaceName: "Platform",
            owner: {
                name: "Ada Lovelace",
                email: "ada@example.com",
                address: {
                    street: "12 Example Street",
                    city: "London",
                    postalCode: "SW1A 1AA",
                },
            },
            office: {
                city: "London",
                country: "United Kingdom",
            },
            teamMembers: [
                { name: "Grace Hopper", email: "grace@example.com" },
                { name: "Katherine Johnson", email: "katherine@example.com" },
            ],
            notificationsEnabled: true,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole("textbox", { name: /^Workspace name/ })).toHaveValue("Platform");
        await expect(canvas.getByRole("textbox", { name: "Full name" })).toHaveValue("Ada Lovelace");
        for (const city of canvas.getAllByRole("textbox", { name: "City" })) {
            await expect(city).toHaveValue("London");
        }
        for (const email of canvas.getAllByRole("textbox", { name: "Email" })) {
            await expect(email).toHaveAttribute("type", "email");
            await expect(email).toHaveAttribute("data-slot", "input");
        }
        for (const id of ["root_owner", "root_owner_address"]) {
            const nestedObject = canvasElement.querySelector(`#${id}`)!;
            await expect(nestedObject).toHaveClass("border-l", "pl-3");
            const style = getComputedStyle(nestedObject);
            await expect(style.borderLeftWidth).toBe("1px");
            await expect(style.borderRightWidth).toBe("0px");
            await expect(style.paddingLeft).toBe("12px");
            await expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
        }
        await expect(canvas.queryByRole("heading", { name: "Team members-1 *" })).not.toBeInTheDocument();
        await expect(canvas.queryByRole("heading", { name: "Team members-2 *" })).not.toBeInTheDocument();
        const memberNames = canvas.getAllByRole("textbox", { name: "Name" });
        await expect(memberNames).toHaveLength(2);
        await expect(memberNames[0]).toHaveValue("Grace Hopper");
        await expect(memberNames[1]).toHaveValue("Katherine Johnson");
        const memberItems = canvasElement.querySelectorAll(
            "#root_teamMembers > .array-item-list > .rjsf-array-item",
        );
        await expect(getComputedStyle(memberItems[0]).borderTopWidth).toBe("0px");
        const secondMemberStyle = getComputedStyle(memberItems[1]);
        await expect(secondMemberStyle.borderTopWidth).toBe("1px");
        await expect(secondMemberStyle.paddingTop).toBe("16px");
        await expect(secondMemberStyle.marginTop).toBe("8px");
        await expect(canvas.getByRole("checkbox", { name: "Enable email notifications" })).toBeChecked();
    },
};

function StatefulForm(props: JsonFormProps) {
    const [value, setValue] = useState(props.defaultValue);
    return (
        <div className="max-w-xl space-y-4">
            <JsonForm {...props} value={value} onChange={({ formData }) => setValue(formData)} />
            <pre className="overflow-x-auto">
                <output aria-label="Form data">{JSON.stringify(value)}</output>
            </pre>
        </div>
    );
}

export const NoHelp: Story = {
    args: { defaultValue: { name: "Ada" } },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole("textbox", { name: "Name" })).toHaveValue("Ada");
        await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
        await expect(canvas.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();
        await expect(canvasElement.querySelector("[data-slot=field-description]")).toBeNull();
        await expect(canvasElement.querySelector("[data-slot=field-error]")).toBeNull();
    },
};

export const FieldHelp: Story = {
    args: {
        schema: {
            type: "object",
            properties: {
                name: { type: "string", title: "Name", description: "Your display name." },
                notes: { type: "string", title: "Notes" },
                empty: { type: "string", title: "Empty help" },
                markdown: { type: "string", title: "Markdown help" },
            },
        },
        uiSchema: {
            name: { "ui:help": "Visible to your team." },
            notes: { "ui:help": <span>Keep notes <strong>brief</strong>.</span> },
            empty: { "ui:help": "   " },
            markdown: {
                "ui:help": "Use **Markdown** for help.",
                "ui:options": { enableMarkdownInHelp: true },
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText("Your display name.")).toBeVisible();
        await expect(canvas.getByText("Your display name.").closest(".field-description"))
            .toHaveClass("text-sm", "text-muted-foreground");
        await expect(canvas.getAllByRole("alert")).toHaveLength(3);
        await expect(canvas.getByText("Visible to your team.")).toBeVisible();
        await expect(canvas.getByText("brief")).toBeVisible();
        await expect(canvas.getByText("Markdown", { selector: "strong" })).toBeVisible();
        for (const alert of canvas.getAllByRole("alert")) {
            const icon = alert.querySelector("svg")!;
            const description = alert.querySelector("[data-slot=alert-description]")!;
            await expect(getComputedStyle(icon).color).toBe(getComputedStyle(description).color);
        }
    },
};

export const AdditionalProperties: Story = {
    args: {
        schema: {
            type: "object",
            title: "Settings",
            properties: { name: { type: "string", title: "Name" } },
            additionalProperties: { type: "string" },
        },
        defaultValue: { name: "Workspace", language: "en" },
    },
    render: (args) => <StatefulForm {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const languageKey = canvas.getByRole("textbox", { name: "language Key" });
        const languageValue = canvas.getByRole("textbox", { name: "language" });
        await expect(languageKey).toHaveValue("language");
        await expect(languageKey).toHaveAttribute("placeholder", "Property name");
        await expect(languageKey.labels?.[0]).toHaveClass("sr-only");
        await expect(languageValue).toHaveAttribute("placeholder", "Value");
        const page = within(canvasElement.ownerDocument.body);
        for (const name of ["Remove item", "Add item"]) {
            const button = canvas.getByRole("button", { name });
            await userEvent.hover(button);
            await expect(await page.findByRole("tooltip")).toHaveTextContent(name);
            await userEvent.unhover(button);
        }
        await userEvent.click(canvas.getByRole("button", { name: "Add item" }));
        const key = canvas.getByRole("textbox", { name: "newKey Key" });
        await userEvent.clear(key);
        await userEvent.type(key, "timezone");
        await userEvent.tab();
        const value = await canvas.findByRole("textbox", { name: "timezone" });
        await userEvent.clear(value);
        await userEvent.type(value, "UTC");
        await expect(canvas.getByRole("status", { name: "Form data" })).toHaveTextContent(
            '"timezone":"UTC"',
        );
        await expect(canvas.getByRole("status", { name: "Form data" })).not.toHaveTextContent("newKey");
        await userEvent.click(canvas.getAllByRole("button", { name: "Remove item" })[1]);
        await expect(canvas.queryByRole("textbox", { name: "timezone Key" })).not.toBeInTheDocument();
        await expect(canvas.getByRole("textbox", { name: "Name" })).toHaveValue("Workspace");
    },
};

export const ObjectSpacing: Story = {
    args: {
        schema: {
            type: "object",
            title: "Object spacing",
            properties: {
                name: { type: "string", title: "Name" },
                email: { type: "string", title: "Email" },
                details: {
                    type: "object",
                    title: "Nested object",
                    properties: {
                        city: { type: "string", title: "City" },
                        country: { type: "string", title: "Country" },
                    },
                },
                tasks: {
                    type: "array",
                    title: "Array for comparison",
                    items: { type: "string" },
                },
            },
            additionalProperties: { type: "string" },
        },
        defaultValue: {
            name: "Ada",
            email: "ada@example.com",
            details: { city: "London", country: "UK" },
            tasks: ["First", "Second"],
            language: "en",
            timezone: "UTC",
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const field = (name: string) =>
            canvas.getByRole("textbox", { name }).closest('[data-slot="field"]')!;
        const object = canvasElement.querySelector(".rjsf-field-object fieldset")!;
        const objectGap = parseFloat(getComputedStyle(object).rowGap);
        const array = canvasElement.querySelector(".rjsf-field-array fieldset")!;
        const arrayGap = parseFloat(getComputedStyle(array).rowGap);
        await expect(objectGap).toBeGreaterThan(0);
        await expect(arrayGap).toBeGreaterThan(0);
        const arrayItems = array.querySelector(".array-item-list")!;
        await expect(parseFloat(getComputedStyle(arrayItems).rowGap)).toBe(8);
        for (const [first, second] of [
            [field("Name"), field("Email")],
            [field("City"), field("Country")],
            [field("language Key").parentElement!, field("timezone Key").parentElement!],
        ]) {
            const actualGap = second.getBoundingClientRect().top - first.getBoundingClientRect().bottom;
            await expect(actualGap).toBeCloseTo(objectGap, 1);
        }
        const propertyAdd = canvasElement.querySelector(".rjsf-object-property-expand")!;
        const arrayAdd = within(array).getByRole("button", { name: "Add item" });
        await expect(field("Name").compareDocumentPosition(propertyAdd) & Node.DOCUMENT_POSITION_FOLLOWING)
            .toBeTruthy();
        for (const [button, last, expectedGap] of [
            [propertyAdd, field("timezone Key").parentElement!, objectGap],
            [arrayAdd, arrayAdd.previousElementSibling!, arrayGap],
        ]) {
            await expect(last.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING)
                .toBeTruthy();
            await expect(button.getBoundingClientRect().top - last.getBoundingClientRect().bottom)
                .toBeCloseTo(expectedGap, 1);
            await expect(getComputedStyle(button).marginTop).toBe("0px");
        }
    },
};

const arraySchema: JsonFormProps["schema"] = {
    type: "object",
    properties: {
        tasks: {
            type: "array",
            title: "Tasks",
            description: "Ordered tasks for this workspace.",
            items: { type: "string" },
        },
    },
};

export const ArrayControls: Story = {
    args: {
        schema: arraySchema,
        defaultValue: { tasks: ["First", "Second"] },
        uiSchema: { tasks: { "ui:options": { copyable: true } } },
    },
    render: (args) => <StatefulForm {...args} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const page = within(canvasElement.ownerDocument.body);
        const runItemAction = async (name: string) => {
            await userEvent.click(canvas.getAllByRole("button", { name: "Item actions" })[0]);
            const menuItem = await page.findByRole("menuitem", { name });
            menuItem.focus();
            await userEvent.keyboard("{Enter}");
        };
        await expect(canvas.getByText("Tasks", { selector: "h3" })).toBeVisible();
        await expect(canvas.getByText("Ordered tasks for this workspace.")).toBeVisible();
        await expect(canvas.getByText("Ordered tasks for this workspace.").closest(".field-description"))
            .toHaveClass("text-sm", "text-muted-foreground");
        const itemLabels = canvasElement.querySelectorAll(
            ".rjsf-array-item [data-slot=field-label]",
        );
        await expect(itemLabels).toHaveLength(2);
        for (const label of itemLabels) {
            await expect(label).toHaveClass("sr-only");
        }
        const actions = canvas.getAllByRole("button", { name: "Item actions" })[0];
        await userEvent.hover(actions);
        await expect(await page.findByRole("tooltip")).toHaveTextContent("Item actions");
        await userEvent.unhover(actions);
        await runItemAction("Copy item");
        await expect(canvas.getByRole("status", { name: "Form data" })).toHaveTextContent(
            '["First","First","Second"]',
        );
        await runItemAction("Remove item");
        await expect(canvas.getByRole("status", { name: "Form data" })).toHaveTextContent(
            '["First","Second"]',
        );
        await runItemAction("Move item down");
        await expect(canvas.getByRole("status", { name: "Form data" })).toHaveTextContent(
            '["Second","First"]',
        );
        await userEvent.click(canvas.getByRole("button", { name: "Add item" }));
        await expect(canvas.getAllByRole("textbox")).toHaveLength(3);
        for (const input of canvas.getAllByRole("textbox")) {
            await expect(input).toHaveAttribute("placeholder", "Enter item");
        }
    },
};

export const ReadOnly: Story = {
    args: {
        schema: {
            ...arraySchema,
            additionalProperties: { type: "string" },
        },
        defaultValue: { tasks: ["First", "Second"], language: "en" },
        uiSchema: { tasks: { "ui:options": { copyable: true } } },
        readOnly: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        for (const button of canvas.queryAllByRole("button")) {
            await expect(button).toBeDisabled();
        }
        for (const input of canvas.getAllByRole("textbox")) {
            await expect(input).toHaveAttribute("readonly");
        }
    },
};

export const Disabled: Story = {
    args: { ...ReadOnly.args, readOnly: false, disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        for (const control of [
            ...canvas.queryAllByRole("button"),
            ...canvas.getAllByRole("textbox"),
        ]) {
            await expect(control).toBeDisabled();
        }
    },
};

export const ValidationAndSubmit: Story = {
    args: {
        schema: {
            type: "object",
            required: ["name"],
            properties: { name: { type: "string", title: "Name", minLength: 3 } },
        },
        submitButton: true,
        noHtml5Validate: true,
        onSubmit: fn(),
        onError: fn(),
        uiSchema: { "ui:submitButtonOptions": { submitText: "Save" } },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole("button", { name: "Save" }));
        await expect(args.onError).toHaveBeenCalled();
        await expect(args.onSubmit).not.toHaveBeenCalled();
        await expect(canvasElement.querySelector("[data-slot=field-error]")).toBeVisible();
        await userEvent.type(canvas.getByRole("textbox", { name: /^Name/ }), "Ada");
        await userEvent.click(canvas.getByRole("button", { name: "Save" }));
        await expect(args.onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ formData: { name: "Ada" } }),
            expect.anything(),
        );
    },
};

export const Widgets: Story = {
    args: {
        schema: {
            type: "object",
            required: ["notifications"],
            properties: {
                notes: { type: "string", title: "Notes" },
                notifications: {
                    type: "boolean",
                    title: "Email notifications",
                    description: "Receive workspace updates.",
                },
                secret: { type: "string" },
            },
        },
        defaultValue: { notes: "Initial notes", notifications: false, secret: "hidden" },
        uiSchema: {
            notes: { "ui:widget": "textarea" },
            secret: { "ui:widget": "hidden" },
        },
        submitButton: true,
        onSubmit: fn(),
    },
    render: (args) => <StatefulForm {...args} />,
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox", { name: "Email notifications" });
        await expect(checkbox).not.toBeChecked();
        await expect(canvas.getByText("Receive workspace updates.")).toBeVisible();
        await expect(canvas.getAllByRole("textbox")).toHaveLength(1);
        await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
        await expect(args.onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ formData: expect.objectContaining({ notifications: false }) }),
            expect.anything(),
        );
        await userEvent.click(checkbox);
        await expect(checkbox).toBeChecked();
        await userEvent.clear(canvas.getByRole("textbox", { name: "Notes" }));
        await userEvent.type(canvas.getByRole("textbox", { name: "Notes" }), "Updated notes");
        await expect(canvas.getByRole("status", { name: "Form data" })).toHaveTextContent(
            '"notes":"Updated notes","notifications":true',
        );
    },
};
