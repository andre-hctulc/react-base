import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectFactory } from "../src/components/select-factory.js";

const meta = { title: "Components/SelectFactory" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SelectFactory items={{
        Administration: [{ label: "Administrator", value: "admin" }],
        Members: [{ label: "Editor", value: "editor" }, { label: "Viewer", value: "viewer" }],
    }} defaultValue="editor" />,
};
