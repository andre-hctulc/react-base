import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../src/components/ui/input.js";
import { expect, within } from "@storybook/test";
import { FieldTemplate } from "../src/components/field-template.js";

const meta = { title: "Components/FieldTemplate" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <FieldTemplate params={{ name: "project", label: "Project name", description: "Shown to workspace members." }}>
            <Input defaultValue="FDC Platform" />
        </FieldTemplate>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};

const HorizontalFieldTemplateExample: FC = () => {
    return (
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
    );
};

export const HorizontalFieldTemplate: Story = {
    render: () => <HorizontalFieldTemplateExample />,
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
