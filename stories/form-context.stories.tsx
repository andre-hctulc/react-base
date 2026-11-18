import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FC } from "react";
import { Input } from "../src/components/ui/input.js";
import { expect, userEvent, within } from "@storybook/test";
import { FieldTemplateCtx, FormContextProvider, useField } from "../src/components/form-context.js";
import { FieldTemplate } from "../src/components/field-template.js";

const meta = { title: "Components/FormContext" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ContextFieldInfo: FC = () => {
    const { params } = useField("project");
    return <output aria-label="Context field">{JSON.stringify(params)}</output>;
};

const ContextFieldsExample: FC = () => {
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
                <FieldTemplateCtx params={{ name: "project", label: "Explicit value", value: "Override" }}>
                    <Input readOnly />
                </FieldTemplateCtx>
                <FieldTemplateCtx params={{ name: "hidden", label: "Hidden field" }}>
                    <Input />
                </FieldTemplateCtx>
            </FormContextProvider>
            <FieldTemplate params={{ name: "template", label: "Standalone input" }}>
                <Input name="standalone" />
            </FieldTemplate>
        </div>
    );
};

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
        await expect(canvas.getByRole("textbox", { name: "Unmodified input" })).toHaveAttribute(
            "name",
            "custom",
        );
        await expect(canvas.getByRole("textbox", { name: "Unmodified input" })).toHaveValue("Child");
        await expect(canvas.getByRole("textbox", { name: "Standalone input" })).toHaveAttribute(
            "name",
            "standalone",
        );
    },
};
